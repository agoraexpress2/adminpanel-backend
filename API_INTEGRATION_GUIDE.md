# API Integration Guide for Agora Win Admin

This guide explains how to integrate the frontend with the backend API.

## Overview

The Agora Win Admin frontend has been updated to fetch data from the backend API instead of using hardcoded data. This makes the application dynamic and allows for real-time updates.

## Changes Made

### 1. API Client Setup

We've created a centralized API client using Axios:

```typescript
// src/api/index.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
```

### 2. API Service Modules

We've created separate API service modules for each feature:

- `src/api/auth.ts` - Authentication API calls
- `src/api/customers.ts` - Customer management API calls
- `src/api/stampCards.ts` - Stamp card management API calls
- `src/api/giftCards.ts` - Gift card management API calls
- `src/api/settings.ts` - Settings and policy pages API calls

### 3. Component Updates

All components have been updated to use these API services instead of hardcoded data:

- Login form now calls the authentication API
- Customer list fetches data from the customers API
- Customer actions (add, edit, toggle status) call the appropriate API endpoints
- Similar updates for stamp cards, gift cards, and settings

### 4. Error Handling and Loading States

Components now include:
- Loading indicators while data is being fetched
- Error messages when API calls fail
- Fallback to demo data when the backend is not available

## Backend API Routes

The backend has been updated with the following API routes:

- `/auth` - Authentication endpoints
- `/customers` - Customer management endpoints
- `/stamp-cards` - Stamp card management endpoints
- `/gift-cards` - Gift card management endpoints
- `/policy-pages` - Policy page management endpoints
- `/settings` - Application settings endpoints

## How to Test

1. Start the backend server:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   npm install
   npm run dev
   ```

3. Login with the demo credentials:
   - Email: admin@example.com
   - Password: admin123

## Fallback Mechanism

If the backend server is not available, the frontend will fall back to using demo data. This ensures that the application can still be demonstrated even without a running backend.

## Next Steps

1. Implement more robust error handling
2. Add pagination for large data sets
3. Implement real-time updates using WebSockets
4. Add more comprehensive data validation
