import { html } from "@popeindustries/lit-html-server";
import { HTMLTemplateData } from "./html";

/**
 * Takes given html template data and puts it in a common layout with a header and footer
 */
export function basicLayout(htmlTemplateData: HTMLTemplateData): HTMLTemplateData {
    const newHeaders = html`
        <link rel="stylesheet" href="/static/app.css">
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png">
        ${htmlTemplateData.head}`

    const bodyInLayout = html`
        <header>
            <h1>{{ project-name }}</h1>
        </header>
        <nav>
        <ul>
            <li><a href="/">Home</a></li>
        </ul>
        </nav>
        ${htmlTemplateData.body}
        <footer>
            <p>
            <a href="/">{{ project-name }}</a>
            | <a href="https://sunderjs.com/docs">Sunder Documentation</a>
            | <a href="https://github.com/gzuidhof/sunder-worker-template">Template readme</a></p>
        </footer>`

    return {...htmlTemplateData,
        head: newHeaders,
        body: bodyInLayout,
    }
}
