import { html, renderToString } from "@popeindustries/lit-html-server";
import { Context, MiddlewareNextFunction } from "sunder";
import { htmlDocumentTemplate } from "../templates/html";
import { basicLayout } from "../templates/layout";

/**
 * Rewrites JSON errors as a HTML page if the request Accept header contains HTML.
 * 
 * This must be placed before the `renderErrorsAsJSON` middleware. Perhaps that's counter-intuitive, but errors get caught in reverse order.
 */
export async function renderErrorsAsHTML(ctx: Context<{ assetPath: string }>, next: MiddlewareNextFunction) {
    try {
        await next();
    } catch (e) {
        if (!ctx.request.has("accept") || ctx.request.get("accept")!.indexOf("html") === -1) {
            throw e; // "html" is not present in the accept header, pass the error on.
        }

        // The JSON error middleware before sets body to a JSON object with a message field
        if (!ctx.response.body || (ctx.response.body as {message: string}).message === undefined) {
            console.error("Could not render error as HTML, is the middleware registered before the JSON error middleware?");
            throw e;
        }
        const msg = (ctx.response.body as {message: string}).message;
        const errorHtml = html`
            <h1>${ctx.response.status}${ctx.response.statusText ? " " + ctx.response.statusText : ""}</h1>
            <p>
                ${msg}
            </p>`

        ctx.response.body = await renderToString(htmlDocumentTemplate(basicLayout({body: errorHtml})));
        ctx.response.set("content-type", "text/html;charset=utf-8");
        throw e;
    }
}

