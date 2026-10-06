# Abbey Full-Stack Challenge

## Overview

This project is a simple full-stack social/account application built around the core requirements of the Abbey challenge:

- User authentication and session handling
- User accounts and profile management
- Relationships between users
- React web frontend
- Node.js/Express backend
- Automated API tests
- Postman API collection
- Optional React Native mobile client

The application intentionally keeps the architecture straightforward. The goal is to demonstrate a clear understanding of the requirements, separation of responsibilities, API design, authentication, and frontend/backend communication without introducing unnecessary complexity.

For this implementation, application data is stored in memory rather than a database. This keeps the setup simple and allows the application to be run immediately without additional database configuration.

> **Important:** Because the application uses in-memory storage, restarting the backend resets the application data.

---

# 1. Getting Started

To run the project, the following are required:

- VS Code
- Node.js 20 LTS or newer
- A modern web browser such as Chrome, Edge, or Firefox

From the VS Code terminal, verify that Node.js and npm are available:

```bash
node --version
npm --version
```

Once the project has been opened in VS Code, install the dependencies from the project root:

```bash
npm.cmd run install:all
```

After installation, start the application:

```bash
npm.cmd run dev
```

This starts both the backend API and the React frontend.

The application will normally be available at:

```text
Frontend:
http://localhost:5173

Backend:
http://localhost:4000
```

If the frontend port is already being used by another application, Vite may automatically select another port, such as:

```text
http://localhost:5174
```

The terminal will show the actual frontend address.

---

# 2. Exploring the Application

Once the application is running, open the frontend address displayed by Vite in the browser.

The easiest way to explore the application is to start with authentication and then move through the account and relationship functionality.

## Login

The application contains seeded accounts that can be used immediately.

### Account 1

```text
Email: abbeyuser1@example.com
Password: Password123!
```

### Account 2

```text
Email: abbeyuser2@example.com
Password: Password123!
```

### Account 3

```text
Email: abbeyuser3@example.com
Password: Password123!
```

These accounts are recreated whenever the backend starts.

The first two users are initially connected so that the relationship functionality can be demonstrated immediately.

---

# 3. Authentication Flow

Start by logging in with one of the demo accounts.

The login request is handled by the Express backend. When authentication succeeds, the backend creates the user's authenticated session using a signed JWT stored in an HTTP-only cookie.

The frontend does not need to manually store or manage the token.

After logging in, the application can retrieve the currently authenticated user through:

```text
GET /api/me
```

To demonstrate the complete authentication flow:

1. Log in.
2. Open the account/profile section.
3. Confirm that the authenticated user's information is displayed.
4. Log out.
5. Attempt to access an authenticated feature.
6. Log in again.

This demonstrates login, authenticated requests, session handling, and logout.

---

# 4. Account/Profile Functionality

After logging in, open the account section.

The application allows the authenticated user to:

- View their account information
- View their display name
- View their email address
- View their bio
- Update their profile information

For example, change the display name or bio and save the changes.

The frontend sends the update to:

```text
PATCH /api/me
```

The backend validates the request and updates the authenticated user's information.

The account functionality demonstrates that users can store and retrieve information belonging specifically to their own account.

---

# 5. Relationships

The Connections section demonstrates the relationship requirement of the challenge.

From the Connections screen, a user can:

- Search for other users
- Send connection requests
- View incoming requests
- Accept requests
- Reject requests
- View existing connections
- Remove an existing connection
- View outgoing pending requests

For example:

1. Log in as `abbeyuser1@example.com`.
2. Open **Connections**.
3. Search for `abbeyuser3`.
4. Send a connection request.
5. Log out.
6. Log in as `abbeyuser3@example.com`.
7. Open **Connections**.
8. View the incoming request.
9. Accept the request.
10. Confirm that the connection now appears as an accepted relationship.

This provides a complete demonstration of the relationship lifecycle.

---

# 6. API Endpoints

The backend exposes a small REST API.

| Method | Endpoint | Authentication | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Authenticate a user |
| POST | `/api/auth/logout` | Yes | End the current session |
| GET | `/api/me` | Yes | Retrieve the authenticated user |
| PATCH | `/api/me` | Yes | Update the authenticated user's profile |
| GET | `/api/users?search=...` | Yes | Search for other users |
| GET | `/api/relationships` | Yes | Retrieve relationships and requests |
| POST | `/api/relationships/requests/:userId` | Yes | Send a connection request |
| PATCH | `/api/relationships/requests/:userId` | Yes | Accept or reject a request |
| DELETE | `/api/relationships/:userId` | Yes | Remove a connection |
| GET | `/api/health` | No | Check API availability |

The health endpoint can be used first to confirm that the backend is running:

```text
http://localhost:4000/api/health
```

---

# 7. Testing the Backend with Postman

The repository contains a Postman collection under:

```text
postman/Abbey-Challenge.postman_collection.json
```

Import this collection into Postman.

The collection uses:

```text
baseUrl = http://localhost:4000/api
```

The recommended order for exploring the API is:

### Step 1 — Login

Use the login endpoint with one of the demo accounts.

Postman will receive the authentication cookie from the backend.

### Step 2 — Get the current user

Call:

```text
GET /me
```

This verifies that the authentication session is working.

### Step 3 — Update the account

Call:

```text
PATCH /me
```

with the updated profile information.

### Step 4 — Search for users

Call:

```text
GET /users?search=abbeyuser3
```

### Step 5 — Create a relationship

Use:

```text
POST /relationships/requests/:userId
```

### Step 6 — View relationships

Call:

```text
GET /relationships
```

This makes it possible to inspect the relationship state directly from the API.

---

# 8. Project Structure

The project is separated into frontend, backend, mobile, tests, and supporting documentation.

```text
abbey-fullstack-challenge/
│
├── backend/
│   ├── src/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── tests/
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── lib/
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
│
├── mobile/
│   ├── App.js
│   ├── app.json
│   ├── package.json
│   └── README.md
│
├── postman/
│   └── Abbey-Challenge.postman_collection.json
│
├── README.md
├── VIDEO_DEMO_SCRIPT.md
├── package.json
└── .gitignore
```

The backend follows a simple separation of responsibilities:

```text
Routes
   ↓
Services
   ↓
Repository / Store
   ↓
Application Data
```

This keeps HTTP handling separate from application logic and data storage.

---

# 9. Storage Approach

For this challenge, the application uses an in-memory repository.

This was chosen to keep the setup simple and avoid requiring the reviewer to install or configure a database before running the project.

The repository is separated from the rest of the application, so the API does not directly depend on how the data is stored.

Conceptually:

```text
React Frontend
       |
       | HTTP / JSON
       ↓
Express API
       |
       ↓
Application Services
       |
       ↓
Repository
       |
       ↓
In-Memory Store
```

The repository layer could later be replaced with PostgreSQL, MSSQL, or another persistent database without requiring major changes to the frontend.

The trade-off is that data does not survive a backend restart. For the purposes of this challenge, this keeps the setup lightweight while still demonstrating the required functionality.

---

# 10. Security Considerations

Several basic security practices have been included:

### Password hashing

Passwords are hashed using `bcryptjs` rather than being stored as plain text.

### HTTP-only authentication cookie

The JWT is stored in an HTTP-only cookie so that frontend JavaScript cannot directly access the authentication token.

### Request validation

Incoming request data is validated using Zod before it reaches the application logic.

### CORS

The backend restricts cross-origin requests to the configured frontend origin.

### Helmet

Helmet is used to add commonly recommended HTTP security headers.

### Environment configuration

Sensitive configuration such as the JWT secret is supplied through environment variables rather than being hard-coded into the application.

For a production deployment, additional measures would be appropriate, including HTTPS, rate limiting, centralized logging, monitoring, stronger session management, CSRF protection where applicable, and secure secret management.

---

# 11. Automated Tests

The backend contains automated tests using Vitest and Supertest.

Run the test suite from the project root:

```bash
npm test
```

The tests cover important application flows including:

- User registration
- User authentication
- Session authentication
- Profile updates
- Relationship creation

The tests are intended to provide a quick way of verifying that the main backend functionality remains intact while the application is being changed.

---

# 12. Optional Mobile Client

The repository also contains a small React Native/Expo client under:

```text
mobile/
```

The mobile client communicates with the same backend API as the browser application.

For an Android emulator, the API address is different from the browser.

Use:

```text
http://10.0.2.2:4000/api
```

`10.0.2.2` is the Android emulator's special address for reaching the development machine.

For the browser application, use:

```text
http://localhost:4000/api
```

The mobile client is optional, but it demonstrates that the backend API is independent of the browser frontend.

---

# 13. Suggested Walkthrough

A complete demonstration can be done in approximately 5 minutes.

### 0:00 – 0:30 — Introduction

Briefly explain:

- What the application does
- The frontend/backend technologies
- Why the implementation uses in-memory storage
- The main architectural structure

### 0:30 – 2:30 — Browser Application

Demonstrate:

1. Login
2. Account information
3. Profile update
4. User search
5. Connection request
6. Logout
7. Login as the second user
8. Accept the connection request

### 2:30 – 4:00 — API

Open Postman and demonstrate:

1. Login
2. `/me`
3. Account update
4. User search
5. Relationships
6. Connection request/response

### 4:00 – 5:00 — Code

Briefly show:

- Backend routes
- Services
- Repository/store
- Authentication middleware
- React pages/components
- Tests

The main point is to show how the different parts communicate rather than going through every file.

---

# 14. Running the Application During Review

The quickest way to start the application is:

```bash
npm.cmd run install:all
npm.cmd run dev
```

If the dependencies have already been installed, simply use:

```bash
npm.cmd run dev
```

The terminal will display the addresses of the running services.

The browser frontend should be opened using the frontend URL shown by Vite.

The backend can be checked independently using:

```text
http://localhost:4000/api/health
```

---

# 15. GitHub Submission

The project can be pushed to a public GitHub repository.

From the project root:

```bash
git init
git add .
git commit -m "Initial Abbey full-stack challenge submission"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/abbey-fullstack-challenge.git
git push -u origin main
```

Before pushing, check the repository status:

```bash
git status
```

Make sure environment files containing secrets and dependency folders such as `node_modules` are not committed.

The provided `.gitignore` handles the common cases.

---

# 16. Design Decisions

The implementation intentionally favors simplicity over unnecessary abstraction.

The main decisions are:

**React + TypeScript**

Used for a structured frontend with type safety and a straightforward component model.

**Express + TypeScript**

Provides a lightweight REST API with clear routing and middleware.

**In-memory storage**

Removes database setup from the review process while still allowing the required account and relationship flows to be demonstrated.

**Repository separation**

Keeps data access separate from the API and makes it possible to introduce a persistent database later.

**Cookie-based authentication**

Allows the browser to maintain the authenticated session without exposing the authentication token directly to frontend JavaScript.

**Simple UI**

The interface focuses on the required functionality rather than adding unnecessary features.

---

# 17. Challenge Requirements Covered

The implementation addresses the main requirements as follows:

| Requirement | Implementation |
|---|---|
| Authentication | Register, login, logout and authenticated sessions |
| Accounts | View and update authenticated user's profile |
| Relationships | Search, request, accept, reject and remove connections |
| Frontend | React + TypeScript + Vite |
| Backend | Node.js + Express + TypeScript |
| API | REST endpoints |
| API testing | Postman collection |
| Automated testing | Vitest + Supertest |
| Mobile | Optional React Native/Expo client |
| Architecture | Routes → Services → Repository |
| Data storage | In-memory repository |
| Security | Password hashing, HTTP-only cookie, validation, CORS and Helmet |

The application is intentionally small enough to understand and demonstrate during a technical review, while keeping the major responsibilities separated so the implementation can be extended later.
