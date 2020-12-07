import { getAssetFromKV, Options } from "@cloudflare/kv-asset-handler";
import { Context, MiddlewareNextFunction } from "sunder";

export function serveStaticAssetsFromKV(options: Partial<Options> = {}) {
    return async function (ctx: Context<{ assetPath: string }>, next: MiddlewareNextFunction) {
        try {
            const resp = await getAssetFromKV(
                (ctx as any).event,
                {
                    mapRequestToAsset: req => new Request(ctx.url.origin + "/" + ctx.params.assetPath, req),
                    ...options
                }
            );
            if (resp.body !== null) {
                ctx.response.body = resp.body;
            };
            ctx.response.headers = resp.headers;
            ctx.response.status = resp.status;
            ctx.response.statusText = resp.statusText;
        } catch (e) {
            let pathname = ctx.url.pathname;
            ctx.throw(404, `${pathname} not found`);
        }
        await next();
    }
}
