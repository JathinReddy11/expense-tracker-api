# Expense Tracker API

A RESTful backend application for managing personal expenses.  
Built with Node.js and Express, the API supports user authentication, secure expense management, and clean data handling.

The project follows a structured backend architecture with proper validation, centralized error handling, and scalable design practices.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Custom request validators
- **Testing:** Jest, Supertest
- **Architecture:** Layered structure (controllers, routes, middlewares)
- **Error Handling:** Centralized error handling middleware
- **Linting & Formatting:** ESLint, Prettier
- **Tools:** Nodemon, dotenv

---

## Features

- User registration and authentication using JWT
- Secure authorization (users can access only their own data)
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

## Setup and Run

### Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL
- npm

---

### Clone the repository

```bash
git clone <your-repo-url>
cd expense-tracker/server
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

## Available Scripts

```bash
npm run dev      # Start development server
npm run lint     # Run ESLint checks
npm run format   # Format code using Prettier
npm test         # Run test suite
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
POST    auth/register   → Register a new user
POST    auth/login      → Login user
PATCH   auth/update     → Update user
DELETE  auth/delete     → delete user
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

All protected routes require a JWT token in the header:

```
Authorization: Bearer <token>
```
