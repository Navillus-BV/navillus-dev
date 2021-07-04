import fs from "fs";
import fetch from "node-fetch";
import unionBy from "lodash/unionBy";
import site from "../data/site.json";

const { domain } = site;

// Define Cache Location and API Endpoint
const CACHE_FILE_PATH = "_cache/webmentions.json";
const API = "https://webmention.io/api";
const TOKEN = process.env.WEBMENTION_IO_TOKEN || "j98Q_feckGryLPxpSXceoQ";

async function fetchWebmentions(since, perPage = 1000) {
  console.log(domain);

  // If we don't have a domain name or token, abort
  if (!domain || !TOKEN) {
    console.warn(">>> unable to fetch webmentions: missing domain or token");
    return false;
  }
  let url = `${API}/mentions.jf2?domain=${domain}&token=${TOKEN}&per-page=${perPage}`;
  if (since) url += `&since=${since}`; // only fetch new mentions
  const response = await fetch(url);
  if (response.ok) {
    const feed = await response.json();
    console.log(
      `>>> ${feed.children.length} new webmentions fetched from ${API}`
    );
    return feed;
  }
  return null;
}

// Merge fresh webmentions with cached entries, unique per id
function mergeWebmentions(a, b) {
  return unionBy(a.children, b.children, "wm-id");
}

// save combined webmentions in cache file
function writeToCache(data) {
  const dir = "_cache";
  const fileContent = JSON.stringify(data, null, 2);
  // create cache folder if it doesn't exist already
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  // write data to cache json file
  fs.writeFile(CACHE_FILE_PATH, fileContent, (err) => {
    if (err) throw err;
    console.log(`>>> webmentions cached to ${CACHE_FILE_PATH}`);
  });
}

// get cache contents from json file
function readFromCache() {
  if (fs.existsSync(CACHE_FILE_PATH)) {
    const cacheFile = fs.readFileSync(CACHE_FILE_PATH);
    return JSON.parse(cacheFile);
  }
  // no cache found.
  return {
    lastFetched: null,
    children: [],
  };
}

let mentionedLoaded = false;
export async function getAllMentions() {
  const cache = readFromCache();
  if (mentionedLoaded) {
    return cache;
  }
  console.log(">>> Reading webmentions from cache...");
  if (cache.children.length) {
    console.log(`>>> ${cache.children.length} webmentions loaded from cache`);
  }
  // Only fetch new mentions in production
  if (process.env.NODE_ENV === "production") {
    console.log(">>> Checking for new webmentions...");
    const feed = await fetchWebmentions(cache.lastFetched);
    if (feed) {
      const webmentions = {
        lastFetched: new Date().toISOString(),
        children: mergeWebmentions(cache, feed),
      };
      writeToCache(webmentions);
      mentionedLoaded = true;
      return webmentions;
    }
  }
  mentionedLoaded = true;
  return cache;
}

function compareUrls(a, b) {
  return a.replace(/(\/#|\/|#)$/, "") === b.replace(/(\/#|\/|#)$/, "");
}

export function isForUrl(url) {
  return function (webmention) {
    return compareUrls(webmention["wm-target"], url);
  };
}

export function isMentionType(type) {
  return function (webmention) {
    return !!webmention[type];
  };
}