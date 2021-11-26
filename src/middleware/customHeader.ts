import { Context } from "sunder";

/**
 * Example middleware that adds a custom header
 */
export async function customHeader(ctx: Context, next: Function) {
    ctx.response.set('X-My-Custom-Header', `Sunder`);
    await next();
}