//import fetch from "node-fetch";   // For Node.js < 18; Node.js 18+ has global fetch
import * as cheerio from "cheerio";
import fs from "fs";
import { categories } from "../docs/store/categories.js";

// Utility function: fetch a site and try to extract its manifest URL
async function getManifestUrl(siteUrl, timeout = 3000) {
  try {
    const res = await fetch(siteUrl, { signal: AbortSignal.timeout(timeout) });
    if (!res.ok) return null;

    const html = await res.text();
    const $ = cheerio.load(html);
    const href = $('link[rel="manifest"]').attr('href');
    if (!href)
      return null;

    // Resolve relative path against siteUrl
    return new URL(href, siteUrl).href;
  } catch (error) {
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      console.error('Request timed out');
    }
    return null;
  }
}

// Fetch a manifest file and return its "id" property, with timeout protection
async function getManifestId(manifestUrl, timeout = 3000) {
  // Create an AbortController to enforce timeout
    try {

    // Fetch the manifest JSON file with timeout signal
    const res = await fetch(manifestUrl, { signal: AbortSignal.timeout(timeout) });
    if (!res.ok) return null;

    // Parse JSON content locally
    const manifest = await res.json();

    // Return the "id" property if present
    return manifest.id || null;
  } catch (err) {
    // Handle timeout or other fetch errors
    if (err.name === 'AbortError') {
      console.error('Manifest request timed out');
    }
    return null;
  }
}

async function processCategories(forceUpdate = false, skipNetwork = false) {
  const newCategories = [];

  for (const cat of categories) {
    const newCat = { ...cat, apps: [] };
    console.log(`Category: ${cat.name}`);

    for (const app of cat.apps) {
      let manifestUrl = null;
      let manifestId = null;
      let manifestUrl2 = null;
      let manifestId2 = null;

      // Handle apptype
      if (app.apptype === "wrapper") {
        if (!forceUpdate && (app.manifestUrl || app.manifestId)) {
          console.log(`  ⏩ Skipped wrapper ${app.name}, manifest already set`);
        } else {
          manifestUrl = `${app.url}/manifest.json`;
          manifestId = app.url;
          console.log(`  📦 Wrapper ${app.name} manifestUrl: ${manifestUrl}, manifestId: ${manifestId}`);
        }
      } else if (app.apptype === "wechatmini" || app.apptype === "native") {
        console.log(`  ⏩ Skipped ${app.name} (${app.apptype})`);
      } else {
        if (!forceUpdate && (app.manifestUrl || app.manifestId)) {
          console.log(`  ⏩ Skipped ${app.name}, manifest already set`);
        } else if (!skipNetwork) {
          manifestUrl = await getManifestUrl(app.url);
          if (manifestUrl) {
            manifestId = await getManifestId(manifestUrl);
            if (manifestId) {
              console.log(`  ✅ ${app.name} manifest: ${manifestUrl}, id: ${manifestId}`);
            } else {
              console.log(`  ⚠️ ${app.name} manifest found but no id`);
            }
          } else {
            console.log(`  ❌ ${app.name} has no manifest`);
          }
        } else {
          console.log(`  ⏩ Skipped network check for ${app.name}`);
        }
      }

      // Handle apptype2 if present
      if (app.apptype2) {
        if (app.apptype2 === "wrapper") {
          if (!forceUpdate && (app.manifestUrl2 || app.manifestId2)) {
            // Skip if manifest already set and not forcing update
            console.log(`  ⏩ Skipped wrapper ${app.name} (apptype2), manifest already set`);
          } else {
            // For wrapper type2, derive manifest directly from url2
            manifestUrl2 = `${app.url2}/manifest.json`;
            manifestId2 = app.url2;
            console.log(`  📦 Wrapper ${app.name} (apptype2) manifestUrl2: ${manifestUrl2}, manifestId2: ${manifestId2}`);
          }
        } else if (app.apptype2 === "wechatmini" || app.apptype2 === "native") {
          // Skip WeChat mini and native type2
          console.log(`  ⏩ Skipped ${app.name} (${app.apptype2})`);
        } else {
          if (!forceUpdate && (app.manifestUrl2 || app.manifestId2)) {
            console.log(`  ⏩ Skipped ${app.name} (apptype2), manifest already set`);
          } else if (!skipNetwork) {
            // For normal type2, fetch manifest from url2
            manifestUrl2 = await getManifestUrl(app.url2);
            if (manifestUrl2) {
              manifestId2 = await getManifestId(manifestUrl2);
              if (manifestId2) {
                console.log(`  ✅ ${app.name} (apptype2) manifest: ${manifestUrl2}, id: ${manifestId2}`);
              } else {
                console.log(`  ⚠️ ${app.name} (apptype2) manifest found but no id`);
              }
            } else {
              console.log(`  ❌ ${app.name} (apptype2) has no manifest`);
            }
          } else {
            console.log(`  ⏩ Skipped network check for ${app.name} (apptype2)`);
          }
        }
      }


      // Build new app entry
      const appEntry = { ...app };
      if (manifestUrl !== null) appEntry.manifestUrl = manifestUrl;
      if (manifestId !== null) appEntry.manifestId = manifestId;
      if (manifestUrl2 !== null) appEntry.manifestUrl2 = manifestUrl2;
      if (manifestId2 !== null) appEntry.manifestId2 = manifestId2;

      newCat.apps.push(appEntry);
    }

    newCategories.push(newCat);
  }

  fs.writeFileSync(
    "categories_with_manifest.js",
    "export const categories = " + JSON.stringify(newCategories, null, 2)
  );
}

processCategories(false);