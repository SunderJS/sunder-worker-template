import { Router, Sunder } from "sunder";
import { customHeader } from "./middleware/customHeader";
import { renderErrorsAsJSON } from "sunder/middleware/render";
import { registerRoutes } from "./routes";
import { renderErrorsAsHTML } from "./middleware/htmlErrors";
import { Env } from "./bindings";

export function createApp() {
    const app = new Sunder<Env>();
    const router = new Router<Env>();
    registerRoutes(router);

    app.use(customHeader);
    
    app.use(renderErrorsAsHTML);
    app.use(renderErrorsAsJSON);

    app.use(router.middleware);

    return app;
}