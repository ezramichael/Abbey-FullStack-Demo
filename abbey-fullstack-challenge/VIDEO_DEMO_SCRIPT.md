# Abbey Challenge Video Demo Script

## Opening

"This is my Abbey full-stack challenge submission. I built a small social/account application using React and TypeScript on the frontend, and Node.js, Express and TypeScript on the backend. I chose in-memory storage to keep the project easy to run and focus on the architecture and functionality."

## Browser demo

1. Show the login page.
2. Login with `abbeyuser1@example.com` / `Password123!`.
3. Show the dashboard and current account information.
4. Edit the display name or bio and save.
5. Open Connections and search for Abbey3.
6. Send Abbey3 a request.
7. Logout.
8. Login as Abbey3.
9. Accept Abbey's request.
10. Show the connection.

## Postman demo

1. Open the collection.
2. Call login.
3. Call `GET /me`.
4. Call `PATCH /me`.
5. Call `GET /users?search=abbey`.
6. Call relationship endpoints.
7. Call logout.
8. Call `GET /me` again and show that authentication is rejected.

## Architecture

"The backend is separated into routes, middleware, services and a repository. Authentication is handled through an HTTP-only cookie containing a signed JWT. The repository is in-memory, but its interface means a real database can be introduced later without changing the API contract."

## Closing

"The goal was not to over-engineer the solution. I focused on readable code, a consistent UI, clear separation of responsibilities, validation, authentication, and an end-to-end working flow."
