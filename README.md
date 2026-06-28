# Student Result Management API

Backend API built with Node.js, Express, and MongoDB.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file from `.env.example` and update the MongoDB connection if needed.

3. Start the server:

   ```bash
   npm start
   ```

The API runs on `http://localhost:5000` by default.

## Routes

- `GET /` - Health check
- `POST /api/students/add` - Add a student result
- `GET /api/students` - Get all student results
- `GET /api/students/:rollNo` - Get one student by roll number
- `POST /api/auth/login` - Save a login action
- `POST /api/auth/signup` - Save a signup action
- `GET /api/auth/stats` - Get login/signup counts
