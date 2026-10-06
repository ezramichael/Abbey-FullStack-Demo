# Abbey Full-Stack Challenge

A simple full-stack social/account application built to demonstrate the challenge requirements:

- Authentication: register/login/logout and cookie-based session handling
- Accounts: view and update the signed-in user's profile
- Relationships: search users, send connection requests, accept/reject requests, remove connections
- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + TypeScript
- Storage: in-memory only (no database required)
- API demo: Postman collection included
- Automated tests: Vitest + Supertest

> This is intentionally simple. Restarting the backend resets the in-memory data.

## 1. Prerequisites

You only need:

1. VS Code
2. Node.js 20 LTS or newer
3. A browser (Chrome/Edge/Firefox)

Check Node from the VS Code terminal:

```bash
node --version
npm --version
```

If `node` is not recognized, install Node.js from the official Node.js website.

## 2. Run the application

Open this project folder in VS Code, then run:

```bash
npm run install:all
npm run dev
```

The frontend will normally be at `http://localhost:5173` and the API at `http://localhost:4000`.

You can also run them separately:

```bash
npm --prefix backend run dev
npm --prefix frontend run dev
```

## 3. Demo accounts

The backend seeds these accounts every time it starts:

- `abbeyuser1@example.com` / `Password123!`
- `abbeyuser2@example.com` / `Password123!`
- `abbeyuser3@example.com` / `Password123!`

Abbey and Abbey2 start connected so the relationship screen has something to demonstrate immediately.

## 4. What to demonstrate

### Browser/frontend

1. Open the frontend.
2. Login as Abbey.
3. View your profile/account details.
4. Edit your display name and bio.
5. Open Connections.
6. Search for Abbey3.
7. Send Abbey3 a connection request.
8. Logout.
9. Login as Abbey3 and accept Abbey's request.
10. Show that both users now have a connection.

### Mobile/emulator (optional client)

The repository also includes `mobile/`, a small React Native/Expo client that uses the same API. For an Android emulator, run the backend, then follow `mobile/README.md`.

### Postman/backend

Import `postman/Abbey-Challenge.postman_collection.json`.

Set the collection variable:

- `baseUrl = http://localhost:4000/api`

The login request stores the auth cookie automatically when Postman cookie handling is enabled. Then call `GET /me`, account update, user search, and relationship endpoints.

### Suggested video flow

Record a 4–6 minute screen recording:

- 0:00–0:30: explain the architecture
- 0:30–2:30: browser login, account update and relationships
- 2:30–4:00: Postman API calls
- 4:00–5:00: briefly show the folder structure and tests
- 5:00–6:00: explain the main design decisions and trade-offs

A ready-made talking script is in `VIDEO_DEMO_SCRIPT.md`.

## 5. API overview

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Login and set HTTP-only cookie |
| POST | `/api/auth/logout` | Yes | Clear session cookie |
| GET | `/api/me` | Yes | Current user |
| PATCH | `/api/me` | Yes | Update account/profile |
| GET | `/api/users?search=...` | Yes | Find other users |
| GET | `/api/relationships` | Yes | Get connections and requests |
| POST | `/api/relationships/requests/:userId` | Yes | Send request |
| PATCH | `/api/relationships/requests/:userId` | Yes | Accept/reject request |
| DELETE | `/api/relationships/:userId` | Yes | Remove connection |
| GET | `/api/health` | No | Health check |

## 6. Architecture in simple terms

```text
React browser
    |
    | HTTP + JSON + HTTP-only cookie
    v
Express API
    |
    +--> Auth service / session token
    +--> Account service
    +--> Relationship service
    |
    v
In-memory repository
```

The repository is deliberately behind a small interface. That means the controllers do not need to know whether data comes from memory, PostgreSQL, MSSQL, or another store. For this challenge we use memory so setup is zero-database.

## 7. Security choices

- Passwords are hashed with `bcryptjs`.
- Authentication uses a signed JWT in an HTTP-only cookie.
- The browser cannot read the auth token directly with JavaScript.
- CORS only allows the configured frontend origin.
- Request bodies are validated with Zod.
- Helmet adds common HTTP security headers.
- The JWT secret comes from an environment variable.

For a real production system, replace the in-memory repository with a persistent database, use a production session/token strategy, add rate limiting, centralized logging, CSRF strategy where applicable, HTTPS, secret management and monitoring.

## 8. Tests

Run:

```bash
npm test
```

The tests exercise registration, login/session authentication, profile update and relationship creation.

## 9. GitHub

Create an empty public repository on GitHub, for example `abbey-fullstack-challenge`.

Then from this project's root in the VS Code terminal:

```bash
git init
git add .
git commit -m "Initial Abbey full-stack challenge submission"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/abbey-fullstack-challenge.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

Before pushing, verify that `.env` and `node_modules` are ignored:

```bash
git status
```

Do not commit real secrets.

## 10. Deployment

The challenge allows any hosting provider. A simple submission can run locally for the demo, but public hosting is stronger. The frontend can be deployed to a static hosting provider and the backend to a Node hosting provider. Update the frontend API URL and backend CORS origin before deployment.

The application is intentionally structured so the in-memory store can later be replaced with PostgreSQL/MSSQL without rewriting the React UI.
