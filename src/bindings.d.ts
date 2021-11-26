export interface Env {
    // Added by Cloudflare Sites
    __STATIC_CONTENT: KVNamespace

    /** Add your bindings (Durable Objects, KV, etc. here) */
    // MY_DURABLE_OBJECT: DurableObjectNamespace
}

declare module '__STATIC_CONTENT_MANIFEST' {
  const manifest: string
  export default manifest
}
