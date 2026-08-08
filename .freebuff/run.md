# Run doc — Dr. Higor Azevedo (Vite + React SPA)

## Reproduce the uncommitted artifacts a fresh checkout needs

1. **Install dependencies:** `npm ci` (uses `package-lock.json`).
   - npm blocks esbuild's postinstall by default. Approve it with
     `npm install-scripts approve esbuild`, or run
     `node node_modules/esbuild/install.js` manually. Without it Vite fails to
     start.
2. **Convex generated API:** `src/convex/_generated/` is git-ignored. Checked-in
   stubs (`api.ts`, `server.d.ts`, `dataModel.d.ts`) keep the app buildable and
   runnable in "public mode". To regenerate the real typed API, run
   `npx convex dev` (requires a Convex deployment / login).
3. **Environment:** there is no `.env.local` by default. Optionally copy
   `.env.example` → `.env.local` and set `VITE_CONVEX_URL` to a deployment URL
   (obtainable via `npx convex dev`). Without it, the landing page and public
   content work; the admin/auth routes (`/auth`, `/dashboard`) stay in a
   loading state because no backend is configured.

## Run the server

- Dev: `npm run dev` (default port 5173). If busy, pick a free port:
  `npm run dev -- --port 5199`.
- Verify: `curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/` → 200.
- Build: `npm run build` (runs `tsc -b` typecheck, then `vite build` into
  `dist/`).
- Lint: `npm run lint`. Format: `npm run format`.
