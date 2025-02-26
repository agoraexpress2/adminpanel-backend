# Agora Win Admin Installation Guide

## Prerequisites

1. WAMP Server (for Windows)
2. Node.js (v14 or higher)
3. npm (comes with Node.js)

## Installation Steps

### 1. Database Setup

1. Start WAMP Server
2. Open phpMyAdmin (usually at http://localhost/phpmyadmin)
3. Create a new database:
   - Click "New" in the left sidebar
   - Enter "agorawin" as the database name
   - Click "Create"
4. Import the database schema:
   - Select the "agorawin" database
   - Click "Import" in the top menu
   - Choose the `backend/database.sql` file
   - Click "Go" to import

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the database credentials:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=
     DB_NAME=agorawin
     ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup

1. Navigate to the project root directory

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Access the application:
   - Open your browser and go to http://localhost:5173
   - Default login credentials:
     - Email: admin@example.com
     - Password: admin123

## Troubleshooting

1. If you can't connect to the database:
   - Check if WAMP is running (icon should be green)
   - Verify database credentials in `.env`
   - Make sure MySQL service is running

2. If npm install fails:
   - Delete node_modules folder
   - Delete package-lock.json
   - Run `npm install` again

3. If the frontend can't connect to the backend:
   - Check if backend is running (should see "Server running on port 5000")
   - Verify API URL in frontend environment variables

## Additional Notes

- The application uses port 5000 for the backend and 5173 for the frontend
- Make sure these ports are available or update them in the configuration
- For production deployment, update the environment variables accordingly
