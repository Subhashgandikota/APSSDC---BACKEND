# ApexGrade Cloud (Monorepo)

This is a unified monorepo containing both the **ApexGrade Cloud Next.js Frontend** and **Node.js Express Backend**.

## Structure

- `/backend`: Node.js, Express, and Mongoose (MongoDB) REST API.
- `/frontend`: Next.js (App Router), Tailwind CSS client portal.

## Prerequisites

- **Node.js**: v18.x or higher
- **MongoDB**: A running instance (local or remote)

## Installation & Setup

1. **Install all dependencies** (root, backend, and frontend) in one go:
   ```bash
   npm run install:all
   ```

2. **Configure Environment Variables**:
   Go to the `backend/` directory, copy `.env.example` to `.env`, and update the configuration if necessary:
   ```bash
   cd backend
   cp .env.example .env
   ```
   By default, the backend expects:
   - `PORT=5000`
   - `MONGO_URI=mongodb://127.0.0.1:27017/student_result_db`

## Running the Application

To run **both** the backend API and the frontend client concurrently, run the following command in the root folder:

```bash
npm run dev
```

- **Frontend Client**: Runs on [http://localhost:3000](http://localhost:3000)
- **Backend API**: Runs on [http://localhost:5000](http://localhost:5000)

## API endpoints

- `POST /api/auth/login` - Authenticate users (Admin, Faculty, Students).
- `GET /api/students` - Retrieve student directory entries.
- `POST /api/students/add` - Add a new student record and automatically compute their grade.
- `GET /api/auth/stats` - Display login metrics for the Admin system dashboard.
