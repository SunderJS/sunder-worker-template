import { Context } from "sunder";
import { html, renderToString } from "@popeindustries/lit-html-server";

import { htmlDocumentTemplate, HTMLTemplateData } from "../templates/html";
import { basicLayout } from "../templates/layout";

export async function homeHandler(ctx: Context) {
    const pageData: HTMLTemplateData = {
        title: "Sunder Starter App",
        body: html`
            <p>Welcome to the <strong>Sunder</strong> Starter template.</p>

            <blockquote>
                <p>
                    Edit this template in <code>src/handlers/home.ts</code>
                </p>
            </blockquote>
        `,
    };
    const templateResult = htmlDocumentTemplate(basicLayout(pageData));
    ctx.response.body = await renderToString(templateResult);
}
