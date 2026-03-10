# Expense Tracker (Full Stack)

A full stack expense tracking application for managing personal finances, built with a scalable backend architecture and a defensive, production style React frontend.

The backend is built with Node.js and Express and provides a RESTful API with JWT based authentication.  
The frontend is built using React (Vite) and integrates with the backend using a centralized API communication layer.

The application supports secure user authentication, persistent login sessions, protected routes, and automatic session invalidation using interceptor based token handling.

---

## Tech Stack

**Backend**

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Jest & Supertest
- Custom validation middleware

**Frontend**

- React (Vite)
- React Router
- Axios
- Centralized API Layer
- JWT Request Interceptor
- Global 401 Response Interceptor

---

## Features

**Frontend Architecture**

- The React frontend communicates with the backend using a centralized Axios instance.
- All HTTP communication is handled through a single API client.
- JWT tokens are automatically attached to protected requests using a request interceptor.
- Token expiry and invalid sessions are handled globally using a response interceptor.
- Service layer modules abstract backend endpoints from UI components.
- UI components never interact with Axios directly.
- Reusable form components handle both creation and editing flows to avoid duplicated logic.
- Confirmation dialogs prevent accidental destructive actions.
- Delete operations include loading states to prevent duplicate API requests.
- Expense lists automatically refetch after mutations to ensure UI consistency with backend data.
- Defensive UI patterns ensure stable behavior during API failures.

**Backend Architecture**

- User registration and authentication using JWT
- Secure authorization ensuring users can access only their own resources.
- CRUD operations for expenses and categories
- Pagination and filtering for expense records
- Monthly and yearly expense summaries
- Export expenses as CSV
- Input validation for all requests
- Proper HTTP status codes for all API responses
- Centralized error handling
- RESTful API design
- Automated testing using Jest and Supertest
- Scalable and maintainable backend architecture
- Enforced consistent code style using ESLint and Prettier

---

## UX Safety and Data Integrity

The application implements defensive UI patterns to prevent accidental data loss and inconsistent state.

- Destructive actions require explicit user confirmation.
- Delete operations use loading states to prevent duplicate API requests.
- UI disables actions while requests are in progress.
- Expense lists automatically refetch after mutations to ensure frontend and backend data remain synchronized.
- Error handling ensures UI remains stable even when API requests fail.

### Frontend User Features

The React frontend provides a complete interface for managing personal expenses.

Users can:

- Register and login securely
- Create new expenses using a reusable form component
- Edit existing expenses
- Delete expenses with confirmation dialogs to prevent accidental removal
- View expenses with pagination and filtering
- Select categories using a dropdown populated from the backend
- Automatically refresh expense lists after mutations
- Maintain authenticated sessions using JWT tokens
- Automatically logout when token expires

## Setup and Run

### Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL
- npm

---

### Clone the repository

```bash
git clone <your-repo-url>
cd expense-tracker
cd server
```

---

### Install dependencies

```bash
npm install
```

---

### Environment Variables

This project uses separate environment files for development and testing.

#### `.env` (Development)

```env
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
```

#### `.env.test` (Testing)

```env
DATABASE_URL=your_test_database_url
JWT_SECRET=your_test_jwt_secret
```

---

## Database Setup

This project uses PostgreSQL.

### Steps:

1. Create a database:

```bash
createdb expense_tracker
```

2. Run the schema file:

```bash
psql -U postgres -d expense_tracker -f database/schema.sql
```

3. Configure environment variables in `.env`:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/expense_tracker
JWT_SECRET=your_secret_key
```

---

### API Base URL

```
http://localhost:5000
```

---

## API Endpoints

### Auth

```
POST    /auth/register   → Register a new user
POST    /auth/login      → Login user
PATCH   /auth/update     → Update user
DELETE  /auth/delete     → delete user
```

### Categories

```
POST    /category/categories               → Create category
GET     /category/categories               → Get all categories
PATCH   /category/categories/:category_id  → Update category
DELETE  /category/categories/:category_id  → Delete category
```

### Expenses

```
POST   /expense/expenses                → Create expense
GET    /expense/expenses                → Get expenses (pagination, filters)
PATCH  /expense/expenses/:expense_id    → Update expense
DELETE /expense/expenses/:expense_id    → Delete expense
GET    /expense/expenses/export         → Export expenses as CSV
```

### Reports

```
GET /reports/monthly              → Monthly expense summary
GET /reports/yearly               → Yearly expense summary
GET /reports/category-summary     → Category-wide summary

```

---

### Authentication

- User registers using the Register page.
- User logs in using valid credentials.
- Backend returns JWT token.
- Token is stored in browser localStorage.
- ProtectedRoute allows access to private routes based on token existence.
- Axios request interceptor attaches JWT automatically to protected requests.
- If backend returns 401 Unauthorized:
- Token is removed automatically.
- User is redirected to login.
- Protected routes become inaccessible.
- Persistent login is supported across page refreshes.

```
Authorization: Bearer <token>
```
