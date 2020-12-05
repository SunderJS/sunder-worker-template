// The tests run in Node, so we do our best to mock the Cloudflare Workers environment as best we can.
import { makeCloudflareWorkerEnv } from "cloudflare-worker-mock";

import fetch from "node-fetch";
import FormData from "formdata-node";

declare var global: any;

Object.assign(global, {
  // This puts all the expected global values for Cloudflare workers
  ...makeCloudflareWorkerEnv(),

  // Use this if you have KVs you want to be available in tests
  // ...makeCloudflareWorkerKVEnv("my-kv-namespace");

  fetch: fetch,
  FormData: FormData,
  ReadableStream: class MockClass{},
  crypto: {}
});

if (!process.env.LISTENING_TO_UNHANDLED_REJECTIONS) {
  process.on("unhandledRejection", (reason) => {
    console.error("Unhandled rejection!", reason);
  });
  // Avoid memory leak by adding too many listeners
  (process.env as any).LISTENING_TO_UNHANDLED_REJECTIONS = true;
}
