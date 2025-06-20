/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/vanillajs" />
/// <reference types="vite-plugin-pwa/pwa-assets" />

import type { CollectionEntry, ContentEntryMap } from "astro:content";

declare global {
  interface Window {
    Alpine: import("alpinejs").Alpine;
  }

  interface HeaderSettings {
    logo: {
      title?: string;
      imagePath?: string;
    };
    pages: {
      title: string;
      link: string;
    }[];
    actions: {
      title: string;
      link: string;
      style: string;
    }[];
  }

  interface FooterSettings {
    title: string;
    copyright: string;
    buttons: {
      text: string;
      url: string;
    }[];
  }

  interface ContactSettings {
    phone: string;
    mail?: string;
    address?: string;
    socials?: {
      title: string;
      link: string;
      icon: string;
    }[];
  }

  interface MinimalSeo {
    title: string;
    description: string;
    author?: string;
  }

  interface StyleSettings {
    theme: {
      colors: {
        primary: string;
        secondary: string;
        tileColor: string;
      };
    };
  }

  interface WidgetSettings {
    enabled: boolean;
    icon: string;
    link: string;
  }

  interface LocalizedSettings {
    header: HeaderSettings;
    footer: FooterSettings;
    contacts: ContactSettings;
    seo: MinimalSeo;
    style: StyleSettings;
    widget: WidgetSettings;
  }

  interface CollectionProps<CollectionName extends keyof ContentEntryMap> {
    data: CollectionEntry<CollectionName>;
  }

  interface PathParams<CollectionName extends keyof ContentEntryMap> {
    params: {
      lang: string;
      slug: string | undefined;
    };
    props: CollectionProps<CollectionName>;
  }
}
