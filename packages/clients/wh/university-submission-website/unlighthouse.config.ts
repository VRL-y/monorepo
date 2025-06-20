import { siteUrl } from "./site.config";

/*
 * https://unlighthouse.dev/api/config
 */
export default {
  site: siteUrl,
  scanner: {
    exclude: [/^\/cdn-cgi\//],
    dynamicSampling: 2,
  },
  ci: {
    budget: 50,
    buildStatic: true,
  },
  debug: true,
  cache: false,
};
