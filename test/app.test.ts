import { createApp } from "../src/app";

function createEvent(request: Request) {
    return new FetchEvent("fetch", { request });
}

describe("App integration tests", () => {

    test("Returns 404 with JSON for an unknown route", async () => {
        const app = createApp();
        app.silent = true; // We expect an error and it would be logged otherwise
        const evt = createEvent(new Request("/doesnt-exist"));
        const resp = await app.handle(evt);

        expect(resp.status).toEqual(404);
        expect(await resp.json()).toHaveProperty("message");
    });

    test("Renders a homepage with a title", async () => {
        const app = createApp();
        const resp = await app.handle(createEvent(new Request("/")));

        expect(resp.status).toEqual(200);
        expect(await resp.text()).toMatch(/<title>.*<\/title>/);
    });

});
