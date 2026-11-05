# Store data

Two representations of one catalogue, both generated from `docs/store/categories.js`:

| file | size | used by |
|---|---|---|
| `docs/store/categories.js` | 316.6 KB (`export const categories = [...]`) | today's `content.js`, and the source of truth |
| `docs/store/store.bin` | 210.3 KB (gzip 66.0 KB) | the packed engine |

```sh
node scripts/gen_store_bin.js      # categories.js -> store.bin, round trip verified
```

Adding an app means editing `categories.js` and running that one command. Nothing
in the C++/wasm side changes: the engine only knows the record layout, not the
catalogue, so a new app never needs a rebuild.

## Why a binary

`categories.js` is 316 KB of JavaScript. The browser has to parse it, and the
resulting object graph costs ~0.56 MB of heap before the first card can be drawn
(measured: 4.3-5.3 MB page heap, of which 0.56 MB is the catalogue and 0.19 MB a
derived `__searchText` index). The packed form needs no parse at all: it is one
`ArrayBuffer`, every string is an `(offset, length)` pair into one contiguous
UTF-8 blob, and the engine reads it in place.

## Layout

Little endian, no padding beyond what is listed; record layout is documented at
the top of `scripts/gen_store_bin.js`, which is the only writer and which
verifies a full round trip against `categories.js` before it exits.

- 32 byte header: `"PWST"`, version, category/app counts, section offsets.
- UTF-8 string blob, deduplicated (6,954 unique strings, 128.4 KB).
- 24 byte category records (1.3 KB for 56).
- 70 byte app records (80.5 KB for 1,288): ten `(offset, length)` pairs plus flags.

## No numbers, no floating point

The catalogue is text only - `gen_store_bin.js` *throws* if a field is ever not a
string, so a future numeric field cannot be silently dropped. Two consequences:

- the packed reader needs no number parsing at all;
- if the catalogue is ever fed to `fast_io.json`, it must be parsed with
  `json_policy::none` (the FPU-free policy): the module test asserts that this
  policy accepts the whole catalogue with exactly the same node and member counts
  as the default policy, i.e. there is no real number anywhere in the data.

## The engine

`cpp/store.cpp` -> `cpp/store.wasm` (`cpp/build.sh`), 1.9 KB, and it imports
nothing: no libc, no allocation, no floating point. The JS side fetches
`store.bin`, copies it into the exported buffer, and from then on only asks
questions.

| export | meaning |
|---|---|
| `pwa_store_bin_ptr` / `_capacity` | where the fetched bytes go (2 MiB) |
| `pwa_store_load(len)` | validate header + every section boundary once |
| `pwa_store_counts()` | `app_count << 32 \| category_count` |
| `pwa_store_query_ptr` / `_capacity` / `_query(len)` | filter, returns match count |
| `pwa_store_match(i)` | app index of match `i`, `-1` past the end |
| `pwa_store_field(app, field)` | field view: pointer `<< 32 \| length`, straight into the blob |
| `pwa_store_app_flags(app)` | bit 0 nsfw, bit 1 hide |
| `pwa_store_app_category(app)`, `pwa_store_category_name/ flags/ span` | category legend |

Field views are `(pointer, length)` pairs into wasm memory, so a card is drawn
by slicing the already-mapped bytes - no per-field copy through the boundary.

`cpp/test.js` loads the module in node, drops the real catalogue in, and checks
counts, field values, search behaviour, flag bits, distinct match indices, that
every field view stays inside memory, and that out-of-range access is safe
rather than fatal. Measured: **2.5 us per keystroke** over 1288 apps, against
0.09 ms for the current JS index - and 210 KB of bytes instead of 0.56 MB of
object graph.

There is deliberately **no JS reader**: if the module fails to load there is no
second implementation to drift out of sync with the format.
