import { Router, Sunder } from "sunder";
import { responseTime } from "./middleware/responseTime";
import { renderErrorsAsJSON } from "sunder/middleware/render";
import { registerRoutes } from "./routes";
import { renderErrorsAsHTML } from "./middleware/htmlErrors";

export function createApp() {
    const app = new Sunder();
    const router = new Router();
    registerRoutes(router);

    app.use(responseTime);
    
    app.use(renderErrorsAsHTML);
    app.use(renderErrorsAsJSON);

    app.use(router.middleware);

    return app;
}