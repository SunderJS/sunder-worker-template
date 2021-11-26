import manifestJSON from '__STATIC_CONTENT_MANIFEST';
import { getAssetFromKV, Options } from "@cloudflare/kv-asset-handler";
import { Context, MiddlewareNextFunction } from "sunder";
import { Env } from '@/bindings';

export function serveStaticAssetsFromKV(options: Partial<Options> = {}) {
    const manifest = JSON.parse(manifestJSON);
    options.ASSET_MANIFEST = manifest;
        
    return async function (ctx: Context<Env, { assetPath: string }>, next: MiddlewareNextFunction) {
        options.ASSET_NAMESPACE = ctx.env.__STATIC_CONTENT;
        try {
            const resp = await getAssetFromKV(
                (ctx as any).event,
                {
                    mapRequestToAsset: (req: Request) => new Request(ctx.url.origin + "/" + ctx.params.assetPath, req),
                    ...options
                }
            );
            ctx.response.overwrite(resp, {mergeHeaders: true});
        } catch (e) {
            let pathname = ctx.url.pathname;
            ctx.throw(404, `${pathname} not found`);
        }
        await next();
    }
}
