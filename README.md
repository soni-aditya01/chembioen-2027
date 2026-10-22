# ChemBioEN 2027

A responsive React/Vite conference website with a separate Express/Mongoose authentication API.

The conference content is based on the supplied `Brochure_Chembioen 2027..pdf`. The brochure is included in `frontend/public/Brochure_Chembioen_2027.pdf` for visitors. Conference dates, invited speakers, sponsors, workshop details, and conference contact email are not stated in the brochure and remain explicitly unannounced on the site.

The landing page includes the brochure's hybrid format, host department/institute, conference objectives, topic areas, committee, abstract and paper guidance, registration fees, and the location information provided in the brochure.

## Requirements

- Node.js 20 or newer
- npm
- MongoDB running locally or a MongoDB connection URI

## Configure and run

1. Copy `backend/.env.example` to `backend/.env` and set a private `MONGODB_URI` and a random `JWT_SECRET` of at least 32 characters.
2. Install both applications in separate terminals:

   ```sh
   cd backend
   npm install
   npm run dev
   ```

   ```sh
   cd frontend
   npm install
   npm run dev
   ```

3. Open the URL printed by Vite (by default `http://localhost:5173`).

The frontend proxies `/api` requests to `http://127.0.0.1:4000`. Set the backend `PORT` and frontend `VITE_API_PROXY_TARGET` together if you change the API port. The backend's `FRONTEND_ORIGIN` must exactly match the browser origin. The default origin is `http://127.0.0.1:5173`.

Run the backend validation and authentication API tests with `npm test` from `backend/`. These HTTP-level tests use an in-memory user-model test double; they do not replace a deployment check against a real MongoDB instance.

## Authentication and security

Registration and login issue a short-lived JWT in an `HttpOnly`, `SameSite=Strict` cookie; the JWT is never returned in JSON or stored in browser storage. Authenticated requests use that cookie. Mutating auth requests require the exact configured `Origin` and an `X-Requested-With` header, in addition to credentialed CORS. Production cookies are marked `Secure` when `NODE_ENV=production`; serve the app over HTTPS in production.

Passwords are hashed with bcryptjs and are never logged or returned. Email addresses are normalized and unique in MongoDB. API request bodies are size-limited, schema-validated, and auth endpoints are rate-limited. Do not commit `backend/.env`; it is ignored by Git.

The forgot-password link is deliberately a placeholder; password recovery and email verification are not implemented.

## Production notes

Build the frontend with `npm run build` from `frontend/` and deploy its `dist/` directory to a static host. Run the backend separately with `npm start` from `backend/`. Configure `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_ORIGIN`, `PORT`, `HOST`, and `NODE_ENV=production` in the backend deployment environment. Use a same-site frontend/backend deployment so browser cookie restrictions are compatible.

## Main files

- `frontend/src/App.jsx` — landing page, navigation and auth pages.
- `frontend/src/styles.css` — responsive conference and form styling.
- `frontend/src/api.js` — credentialed API requests and safe error handling.
- `backend/src/server.js` — Express, security middleware, routes and database startup.
- `backend/src/routes/auth.js` — registration, login, logout and current-user endpoints.
- `backend/src/models/User.js` — MongoDB user schema and password hashing.
- `backend/src/middleware/auth.js` — JWT cookie authentication.
