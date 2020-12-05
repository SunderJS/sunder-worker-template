import { createApp } from "./app";

const app = createApp();

addEventListener('fetch', (event) => {
    const fetchEvent = event as FetchEvent;
    const response = app.handle(fetchEvent);

    fetchEvent.respondWith(response);
});
