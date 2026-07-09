import config from '../site.config.mjs';

// Site identity — edit these in site.config.mjs, not here.
export const SITE_TITLE = config.name;
export const SITE_DESCRIPTION = config.description;

// Prefix a path with the configured base (e.g. '/archive-www') so assets and
// links resolve correctly when served from a GitHub Pages subpath. Joins with a
// single slash regardless of whether BASE_URL has a trailing slash.
export const withBase = (path = '') => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return clean ? `${base}/${clean}` : `${base}/`;
};
