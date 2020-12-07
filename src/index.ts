import { createApp } from "./app";

declare let DEBUG: boolean;
// DEBUG = true;

const app = createApp();

addEventListener('fetch', (event) => {
    const fetchEvent = event as FetchEvent;
    const response = app.handle(fetchEvent);

    fetchEvent.respondWith(response);
});
