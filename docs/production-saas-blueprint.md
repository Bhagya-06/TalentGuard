# Production SaaS blueprint

This project is designed as a lightweight HR retention SaaS blueprint with a clean separation between the UI, services, and API layer.

## Architecture

- Client app: React + Vite dashboard for HR teams
- Data layer: IBM HR dataset transformed into review-ready watchlists
- Review service: local persistence layer for status updates and workflow changes
- API abstraction: service module that mirrors how a real backend API would be consumed
- Business logic: retention scoring, action planning, and workflow orchestration

## Core modules

### 1. Authentication
- Browser session with environment-based credentials for demo use
- Production replacement: OAuth, SSO, or secure token-based auth

### 2. Employee review workflow
- Review status can be updated from `Waiting for follow-up` to `Resolved`
- Status is persisted in browser storage and can be replaced by a real database table later

### 3. Retention intelligence
- Risk score generation from CSV data
- Watchlist prioritization and action guidance
- What-if simulation for workforce planning

### 4. API service layer
- `frontend/src/services/reviewApi.js` exposes a contract for review operations
- Replace the mock implementation with REST or GraphQL services in production

## Suggested backend contract

### GET /api/reviews
Returns all review statuses for employees.

### PATCH /api/reviews/:employeeId
Updates review state for one employee.

Example payload:

```json
{
  "status": "In review"
}
```

### POST /api/reviews/export
Exports the current queue to CSV or PDF.

## Suggested production stack

- Frontend: React + Vite
- Backend: Node.js / NestJS or FastAPI
- Database: PostgreSQL
- Auth: Auth0 / Clerk / Azure AD
- Storage: object storage for exports and file attachments
- Analytics: warehouse for risk trends and intervention outcomes
- Monitoring: Sentry, Grafana, and application logs

## Recommended next steps

1. Move review persistence to a real API-backed database.
2. Add RBAC for HR managers, managers, and admins.
3. Add audit history for each employee review action.
4. Connect the watchlist to live HRIS data instead of a static CSV export.
5. Add an ML pipeline for model versioning and retraining.

This gives the app the shape of a reusable SaaS product while keeping the current prototype simple to run locally.
