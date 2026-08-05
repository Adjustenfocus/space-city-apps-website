# Space City Apps website

Static public website for Space City Apps and HealthStix.

## Local preview

Run any static HTTP server against the public directory, for example:

```sh
npx serve public
```

The site intentionally has no build step, external JavaScript dependency, tracking SDK, or cookie-based analytics. Cloudflare Workers Static Assets deploys the `public` directory using `wrangler.jsonc`; no Worker script executes for requests.
