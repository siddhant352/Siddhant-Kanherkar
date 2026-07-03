# Vercel Deployment Guide

This project is configured to be seamlessly deployed on Vercel. 

## Framework
- **Frontend**: React + Vite
- **Backend**: Express (Deployed natively via Vercel Serverless Functions)

## How it works

1. **Vite Frontend**: When Vercel detects this repository, it will automatically recognize it as a Vite project and run `npm run build` to build the optimized React frontend.
2. **Express Backend**: The `api/index.ts` file acts as the single Serverless Function entrypoint. It wraps the entire Express application defined in `serverApp.js`.
3. **Routing**: The `vercel.json` file ensures that any request to `/api/*` is handled by the Express Serverless Function, and all other requests serve the Vite React single-page application (SPA).

## Deployment Steps

1. Push your code to a GitHub repository.
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New > Project**.
3. Import your GitHub repository.
4. **Environment Variables**: During the setup, make sure to add the required environment variables:
   - `SQL_HOST`, `SQL_USER`, `SQL_PASSWORD`, `SQL_DB_NAME` (For Postgres/Neon/Supabase Database)
   - `SUPABASE_URL`, `SUPABASE_ANON_KEY` (If needed)
   - `VITE_FIREBASE_API_KEY` (etc., for Firebase configuration)
5. Click **Deploy**. Vercel will handle the rest automatically!
