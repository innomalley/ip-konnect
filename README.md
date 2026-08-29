# ipkonnect — Student & Teacher Portal (Frontend)

React frontend for the Student and Teacher Management System. Decoupled from the
backend: it talks to a Python REST API over HTTP and expects an independently
managed PostgreSQL database behind that API.

This first slice implements **login and registration** for two user types
(students and teachers) plus a starter portal for each, running on **mock
data/auth** so the UI can be built before the API exists.

## Stack

- React 18 + Vite
- React Router 6
- Goober (CSS-in-JS)
- lucide-react (icons)
- Google Fonts (Sora + Inter)

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

## Demo accounts (mock mode)

| Role    | Email              | Password    |
| ------- | ------------------ | ----------- |
| Student | student@ipk.test   | password123 |
| Teacher | teacher@ipk.test   | password123 |

Newly registered accounts are persisted to `localStorage` (`ipk.mock.db`).

## Architecture / backend integration

The app is written so switching from mock to the real API is a config change:

```
src/
  api/
    config.js      # API_BASE_URL, USE_MOCK flag, storage keys (reads .env)
    http.js        # fetch wrapper: base URL, bearer token, error handling
    endpoints.js   # REST path contract with the Python API
  services/
    authService.js     # login / register / me / logout
    portalService.js   # materials, assigned students, marks
  mocks/           # in-memory DB + mock API — delete once the API is live
  context/AuthContext.jsx   # session state, token in localStorage
```

Each service method already contains the real `request(endpoints.…)` call behind
`if (USE_MOCK)`. To go live:

1. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL`.
2. Set `VITE_USE_MOCK=false`.
3. Align `src/api/endpoints.js` and the response shapes (`{ token, user }` for
   auth) with the Python API, then delete `src/mocks/`.
