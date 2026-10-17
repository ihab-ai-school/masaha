# masaha

مساحة: an Arabic voice companion for venting and clearing your head. UI only for now (no voice yet).

Plain static site: `index.html`, `styles.css`, `app.js`. No build step.

## Run locally

```sh
python3 -m http.server 8787
```

Then open http://localhost:8787

## Deploy to Cloudflare Pages

Connect the repo in Cloudflare Pages with no build command and `/` as the output directory,
or run `npx wrangler pages deploy .`.

## Hooking up voice later

The chat screen currently cycles through demo states. Replace `runDemo()` in `app.js` and drive the UI with:

- `masaha.setState('connecting' | 'listening' | 'thinking' | 'speaking')`
- `masaha.setMuted(true | false)`
