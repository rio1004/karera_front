# Karera frontend

React and TypeScript frontend running directly with Node.js and Vite.

## Run locally

Use Node.js 22.12+ or 24 LTS. From this directory:

```powershell
npm install
Copy-Item .env.sample .env
npm start
```

If you already have a `.env` file, update its values instead of replacing it.
Open http://localhost:3000. `npm run dev` starts the same development server.
Stop the server with Ctrl+C.

Run the backend services separately. The sample environment connects to the API
at `127.0.0.1:8000` and the archive service at `127.0.0.1:8001`. Update `.env`
if your services use different addresses. Docker is not required.

## Build and preview

```powershell
npm run build
npm run preview
```

The build is written to `dist`. The preview command serves that build locally;
API proxying is configured for the development server. Production hosting must
route `/api` and `/archive` to the corresponding backend services.
