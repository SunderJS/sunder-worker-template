import { Context } from "sunder";

/**
 * Middleware that adds a X-Response-Time header to requests
 */
export async function responseTime(ctx: Context, next: Function) {
    const start = Date.now();
    await next();

    const ms = Date.now() - start;
    ctx.response.set('X-Response-Time', `${ms}ms`);
}