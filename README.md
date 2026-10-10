# IBM HR Retention Monitor

This project is a front-end dashboard for HR and people leaders to review retention risk, simulate what-if scenarios, and prepare follow-up actions using the IBM HR attrition dataset.

## What is included
- React + Vite dashboard in [frontend](frontend)
- Retention dataset in [frontend/src/data/retentionData.json](frontend/src/data/retentionData.json)
- Protected sign-in flow for secure access
- Persistent review workflow storage so status updates remain saved after refresh
- SaaS-style API and service blueprint in [docs/production-saas-blueprint.md](docs/production-saas-blueprint.md)
- Vercel deployment config in [vercel.json](vercel.json)

## Local development
```bash
cd frontend
npm install
npm run dev
```

## Sign in
The app reads login values from environment variables. Add your own values in a local .env file before signing in.

```bash
cp frontend/.env.example frontend/.env
```

Example values in [frontend/.env.example](frontend/.env.example):
```env
VITE_APP_NAME=IBM HR Retention Monitor
VITE_AUTH_EMAIL=
VITE_AUTH_PASSWORD=
```

## Dynamic review storage
Review updates are saved in the browser local storage so that status changes remain available even after a refresh. This is the client-side seed for a production backend service, and the service contract is defined in [frontend/src/services/reviewApi.js](frontend/src/services/reviewApi.js).

## SaaS blueprint
The product is structured as a blueprint for a production SaaS workflow with a clear separation between:
- UI screens and workflow actions
- service layer for business logic
- API abstraction for future backend integration
- persistence layer for review state

See [docs/production-saas-blueprint.md](docs/production-saas-blueprint.md) for the architecture and suggested production path.

## Deploy to Vercel
1. Push the repo to GitHub.
2. Import the repo into Vercel.
3. Keep the project root as the repo root.
4. Add the same environment variables in Vercel project settings.
5. Vercel will use the config in [vercel.json](vercel.json).

Build configuration:
- Install: `npm install --prefix frontend`
- Build: `npm run build --prefix frontend`
- Output folder: `frontend/dist`

## Production notes
- The app is structured for a static frontend deployment.
- Login is protected by a session saved in the browser.
- Review workflow state is persisted locally for now and can be swapped to a real database-backed API.
- Sensitive auth values should be moved to a real backend or auth provider before production use in a real business environment.
