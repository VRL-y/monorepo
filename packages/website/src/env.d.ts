/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type ENV = {
  SESSION: KVNamespace;
};

type Runtime = import("@astrojs/cloudflare").Runtime<ENV>;
declare namespace App {
  interface Locals extends Runtime {}
}
