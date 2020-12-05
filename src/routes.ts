import { Router } from "sunder";
import { homeHandler } from "./handlers/home";

export function registerRoutes(router: Router) {
    router.get("/", homeHandler);

    // Example inline route with a named parameter
    router.get("/hello/:name", ({ response, params }) => {
        response.body = `Hello ${params.name}`;
    });

    router.get("/robots.txt", (ctx) => {
        // This disallows all scrapers
        ctx.response.body = `Agent: *\nDisallow: /`
    });
}
