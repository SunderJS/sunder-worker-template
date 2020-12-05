import { Context } from "sunder";
import { html, renderToString } from "@popeindustries/lit-html-server";

import { htmlTemplate, HTMLTemplateData } from "../templates/html";

export async function homeHandler(ctx: Context) {
    const pageData: HTMLTemplateData = {
        title: "Sunder Worker Template",
        body: html`
            <h1>Sunder Worker Template</h1>
            Hello!
        `,
    }

    ctx.response.body = await renderToString(htmlTemplate(pageData));
}
