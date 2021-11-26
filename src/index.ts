import { createApp } from "./app";

const app = createApp();


export default {
  async fetch(request: Request, env: any, ctx: any) {
    return app.fetch(request, env, ctx)
  }
}