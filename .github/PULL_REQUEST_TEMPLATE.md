## What is being added or changed

<!-- App name, URL, category. For a change to an existing entry, say what and why. -->

## Checklist

- [ ] I visited the site and confirmed it is the legitimate service, not a lookalike.
- [ ] I checked the live manifest: HTTP 200, no redirect, JSON MIME type, `name`/`short_name`, icons, and a same-origin `start_url`.
- [ ] I checked the page's scripts for credential/wallet harvesting, obfuscated loaders or unexpected third-party endpoints.
- [ ] Logo is a 256×256 WebP (or a square SVG for a native PWA), generated with `magick`.
- [ ] Both `enus.js` and `zhcn.js` have `*_name` and `*_desc` strings for the new entry.
- [ ] The entry was appended to the **end** of its category.
- [ ] `apptype` / `apptype_hide` of existing entries were not touched.
- [ ] I ran `node scripts/gen_store_bin.js` and committed the regenerated `store.bin`.
- [ ] If the manifest has no `id`, I stored the computed `manifestId`; if it declares one, I did not.

If you could not audit something (e.g. bot protection blocked the manifest), say so here — CI reports those as *unverifiable* rather than failures, and a maintainer should check manually.

## Source / evidence

<!-- Link the source repo, manifest URL, or notes from your audit. -->
