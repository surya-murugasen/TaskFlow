# TaskFlow Integration Changelog

## [2026-09-24] — [Phase 3A: Central Admin Pilot Integration]

### Introduced
- Server-to-Server HMAC authentication middleware (`middleware/hmacAuth.js`).
- Express server entry point (`server.js`) to securely serve the statically built Vite frontend and the newly required `/api/health` and `/api/stats` integration endpoints.
- `dotenv` and `express` dependencies to support the lightweight API layer.

### Modified
- `package.json`: Added `"start": "node server.js"` command.
- `vite.config.ts`: (No changes were made to existing frontend configuration).

### Removed
- None

### Security Changes
- Environment variable `ADMIN_INTEGRATION_SECRET` is now required by `server.js` for authenticating requests from the Central Admin.
- HMAC signatures are strictly validated against timestamp drift (5 mins) and canonical string matching.
- Supabase auth remains completely decoupled.

### Validation
- Validated `GET /api/health` with a correct HMAC signature from Central Admin.
- Validated rejection of requests with missing or invalid signatures.
- Validated that existing client-side functionality (Supabase) remains intact because it's completely disconnected from this internal Admin API layer.
