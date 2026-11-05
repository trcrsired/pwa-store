#!/usr/bin/env node
// Pack docs/store/categories.js into docs/store/store.bin.
//
// Why a binary instead of JSON: the catalogue is 316 KB of JavaScript that the
// browser has to parse and turn into an object graph (~0.56 MB of heap) before
// the first card can be drawn. Packed, the same data is ~218 KB of bytes, needs
// no parse at all, and the engine reads it in place. Adding an app only means
// re-running this script - nothing in C++ or wasm changes.
//
// Layout (little endian, no padding beyond what is listed):
//
//   header, 32 bytes
//     0  "PWST"                     magic
//     4  u16                        format version (1)
//     6  u16                        reserved
//     8  u32  category_count
//    12  u32  app_count
//    16  u32  string_offset         (always 32)
//    20  u32  string_bytes
//    24  u32  category_offset
//    28  u32  app_offset
//   string blob                  UTF-8, deduped, "string_bytes" long
//                                every (offset, length) pair in the records
//                                below is relative to string_offset
//   category_count x category record, 24 bytes
//     0  u32  name_offset,  u16 name_length
//     6  u32  key_offset,   u16 key_length
//    12  u8   flags (1 = nsfw), u8 reserved, u16 reserved
//    16  u32  first_app_index
//    20  u32  app_count
//   app_count x app record, 70 bytes
//     0  (u32 offset, u16 length) x FIELDS.length   - see APP_FIELDS
//     66 u32  flags (1 = nsfw, 2 = hide)
//
// The engine indexes the string blob directly, so every string is a
// (offset, length) pair into one contiguous buffer and no pointer is ever
// stored in the file.
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'docs/store/categories.js');
const OUT = path.join(ROOT, 'docs/store/store.bin');

// Field order is the record layout; the engine has the same list.
const APP_FIELDS = ['name', 'nameKey', 'icon', 'url', 'descriptionKey', 'url2',
	'apptype', 'apptype2', 'urlDisplay', 'urlDisplay2'];

const CAT_SIZE = 24;
const APP_SIZE = APP_FIELDS.length * 6 + 4;
const HEADER_SIZE = 32;
const MAGIC = 'PWST';
const VERSION = 1;

function loadCategories() {
	let src = fs.readFileSync(SRC, 'utf8');
	src = src.replace(/export\s+const\s+categories\s*/, 'const categories ');
	// The file is plain data; running it in a function scope keeps it out of
	// this script's own namespace.
	return new Function(`${src}\n;return categories;`)();
}

const strings = new Map();
const chunks = [];
let blobBytes = 0;

function addString(value, where) {
	if (value === undefined || value === null || value === '') {
		return [0, 0];
	}
	// A number here would be silently unrepresentable in the string blob, and
	// the catalogue is deliberately text only - so say so instead of dropping
	// it. This is also why the engine can run with floating point compiled out.
	if (typeof value !== 'string') {
		throw new TypeError(`${where}: expected a string, got ${typeof value} (${String(value)})`);
	}
	const seen = strings.get(value);
	if (seen) {
		return seen;
	}
	const bytes = Buffer.from(value, 'utf8');
	const offset = blobBytes;
	chunks.push(bytes);
	blobBytes += bytes.length;
	const entry = [offset, bytes.length];
	strings.set(value, entry);
	return entry;
}

function pack() {
	const categories = loadCategories();
	const categoryRecords = [];
	const appRecords = [];

	for (const category of categories) {
		const first = appRecords.length;
		for (const app of category.apps) {
			appRecords.push({
				fields: APP_FIELDS.map((key) => addString(app[key], `${category.name}/${app.name}.${key}`)),
				flags: (app.nsfw ? 1 : 0) | (app.hide ? 2 : 0),
			});
		}
		categoryRecords.push({
			name: addString(category.name, 'category.name'),
			key: addString(category.nameKey, `${category.name}.nameKey`),
			flags: category.nsfw ? 1 : 0,
			first,
			count: category.apps.length,
		});
	}

	const stringOffset = HEADER_SIZE;
	const categoryOffset = stringOffset + blobBytes;
	const appOffset = categoryOffset + categoryRecords.length * CAT_SIZE;
	const total = appOffset + appRecords.length * APP_SIZE;

	const buffer = Buffer.alloc(total);
	buffer.write(MAGIC, 0, 'latin1');
	buffer.writeUInt16LE(VERSION, 4);
	buffer.writeUInt16LE(0, 6);
	buffer.writeUInt32LE(categoryRecords.length, 8);
	buffer.writeUInt32LE(appRecords.length, 12);
	buffer.writeUInt32LE(stringOffset, 16);
	buffer.writeUInt32LE(blobBytes, 20);
	buffer.writeUInt32LE(categoryOffset, 24);
	buffer.writeUInt32LE(appOffset, 28);

	let offset = stringOffset;
	for (const chunk of chunks) {
		chunk.copy(buffer, offset);
		offset += chunk.length;
	}

	for (const category of categoryRecords) {
		buffer.writeUInt32LE(category.name[0], offset);
		buffer.writeUInt16LE(category.name[1], offset + 4);
		buffer.writeUInt32LE(category.key[0], offset + 6);
		buffer.writeUInt16LE(category.key[1], offset + 10);
		buffer.writeUInt8(category.flags, offset + 12);
		buffer.writeUInt8(0, offset + 13);
		buffer.writeUInt16LE(0, offset + 14);
		buffer.writeUInt32LE(category.first, offset + 16);
		buffer.writeUInt32LE(category.count, offset + 20);
		offset += CAT_SIZE;
	}

	for (const app of appRecords) {
		for (const [stringOffsetInBlob, length] of app.fields) {
			buffer.writeUInt32LE(stringOffsetInBlob, offset);
			buffer.writeUInt16LE(length, offset + 4);
			offset += 6;
		}
		buffer.writeUInt32LE(app.flags, offset);
		offset += 4;
	}

	if (offset !== total) {
		throw new Error(`length mismatch: wrote ${offset}, expected ${total}`);
	}
	return { buffer, categories, categoryRecords, appRecords };
}

function verify(buffer, categories) {
	const magic = buffer.toString('latin1', 0, 4);
	if (magic !== MAGIC) {
		throw new Error(`bad magic ${JSON.stringify(magic)}`);
	}
	const version = buffer.readUInt16LE(4);
	if (version !== VERSION) {
		throw new Error(`bad version ${version}`);
	}
	const categoryCount = buffer.readUInt32LE(8);
	const appCount = buffer.readUInt32LE(12);
	const stringOffset = buffer.readUInt32LE(16);
	const stringBytes = buffer.readUInt32LE(20);
	const categoryOffset = buffer.readUInt32LE(24);
	const appOffset = buffer.readUInt32LE(28);

	if (categoryCount !== categories.length) {
		throw new Error(`category count ${categoryCount} != ${categories.length}`);
	}
	if (categoryOffset !== stringOffset + stringBytes) {
		throw new Error('category section does not follow the string blob');
	}
	if (appOffset !== categoryOffset + categoryCount * CAT_SIZE) {
		throw new Error('app section does not follow the category records');
	}
	if (buffer.length !== appOffset + appCount * APP_SIZE) {
		throw new Error('file length does not match the section table');
	}

	const readString = (offset, length) => {
		if (length === 0) {
			return '';
		}
		if (stringBytes < offset + length) {
			throw new Error(`string [${offset}, ${length}] runs past the blob`);
		}
		return buffer.toString('utf8', stringOffset + offset, stringOffset + offset + length);
	};

	let flatApp = 0;
	for (let c = 0; c < categoryCount; ++c) {
		const base = categoryOffset + c * CAT_SIZE;
		const expected = categories[c];
		const name = readString(buffer.readUInt32LE(base), buffer.readUInt16LE(base + 4));
		const key = readString(buffer.readUInt32LE(base + 6), buffer.readUInt16LE(base + 10));
		const count = buffer.readUInt32LE(base + 20);
		if (name !== expected.name) {
			throw new Error(`category ${c} name: ${JSON.stringify(name)} != ${JSON.stringify(expected.name)}`);
		}
		if (key !== (expected.nameKey || '')) {
			throw new Error(`category ${c} nameKey: ${JSON.stringify(key)} != ${JSON.stringify(expected.nameKey)}`);
		}
		if (count !== expected.apps.length) {
			throw new Error(`category ${c} app count ${count} != ${expected.apps.length}`);
		}
		for (let a = 0; a < count; ++a) {
			const appBase = appOffset + flatApp * APP_SIZE;
			APP_FIELDS.forEach((field, i) => {
				const got = readString(buffer.readUInt32LE(appBase + i * 6),
					buffer.readUInt16LE(appBase + i * 6 + 4));
				const want = expected.apps[a][field] || '';
				if (got !== want) {
					throw new Error(`app ${flatApp}.${field}: ${JSON.stringify(got)} != ${JSON.stringify(want)}`);
				}
			});
			++flatApp;
		}
	}
	return { categoryCount, appCount, stringBytes };
}

function main() {
	const { buffer, categories } = pack();
	fs.writeFileSync(OUT, buffer);
	const stats = verify(buffer, categories);
	console.log(`categories ${stats.categoryCount}  apps ${stats.appCount}`);
	console.log(`strings ${strings.size}  blob ${(stats.stringBytes / 1024).toFixed(1)} KB`);
	console.log(`records ${(stats.categoryCount * CAT_SIZE / 1024).toFixed(1)} KB categories, ` +
		`${(stats.appCount * APP_SIZE / 1024).toFixed(1)} KB apps`);
	console.log(`${path.relative(ROOT, OUT)} ${(buffer.length / 1024).toFixed(1)} KB ` +
		`(source ${(fs.statSync(SRC).size / 1024).toFixed(1)} KB), round trip verified`);
}

if (require.main === module) {
	try {
		main();
	} catch (error) {
		console.error(`gen_store_bin: ${error.message}`);
		process.exit(1);
	}
}

module.exports = { APP_FIELDS, CAT_SIZE, APP_SIZE, MAGIC, VERSION };
