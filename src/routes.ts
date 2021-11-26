import { Router } from "sunder";
import { Env } from "./bindings";
import { homeHandler } from "./handlers/home";
import { serveStaticAssetsFromKV } from "./middleware/static";

export function registerRoutes(router: Router<Env>) {
    router.get("/", homeHandler);

    router.get("/static/:assetPath+", serveStaticAssetsFromKV())
    router.head("/static/:assetPath+", serveStaticAssetsFromKV())

    // Example inline route with a named parameter
    router.get("/hello/:name", ({ response, params }) => {
        response.body = `Hello ${params.name}!`;
    });

    router.get("/robots.txt", (ctx) => {
        // This disallows all bots/scrapers
        ctx.response.body = `Agent: *\nDisallow: /`;
    });
}
