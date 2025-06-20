import alpinejs from "@astrojs/alpinejs";
import cloudflare from "@astrojs/cloudflare";
import markdoc from "@astrojs/markdoc";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
import { defaultLocale, locales, siteUrl } from "./site.config";

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  output: "server",
  server: {
    host: true,
    port: 1312,
  },
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  compressHTML: true,
  i18n: {
    defaultLocale: defaultLocale,
    locales: locales,
    routing: {
      prefixDefaultLocale: false,
    },
  },
  redirects: {
    "/admin": "/keystatic",
  },
  vite: {
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
  },
  integrations: [
    alpinejs(),
    tailwind({
      // Base style is applied on the file global.css
      applyBaseStyles: false,
    }),
    sitemap(),
    icon(),
    react(),
    markdoc({
      allowHTML: true,
    }),
    robotsTxt({
      policy: [{ userAgent: "*", allow: "/" }],
    }),
  ],
});
