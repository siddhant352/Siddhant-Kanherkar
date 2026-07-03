# Netlify Deployment Guide

This project is configured to be deployed on Netlify as a full-stack application.

## How it works

- **Frontend (React + Vite)**: Configured in `netlify.toml` to build to the `dist` directory and redirect all non-API paths to `index.html` (SPA routing).
- **Backend (Express)**: Configured via Netlify Functions in `netlify/functions/api.ts`.
- **API Routing**: The `netlify.toml` automatically rewrites any request to `/api/*` into `/.netlify/functions/api/*`, making your Express backend work seamlessly on Netlify without any frontend changes.

## Deployment Steps

1. Push your code to a GitHub repository.
2. Go to [Netlify](https://app.netlify.com/) and create a new site from your GitHub repository.
3. Netlify will automatically detect the build settings from `netlify.toml`.
4. (Important) Go to your Site Settings > Environment variables in Netlify, and add any environment variables your app needs (such as your Postgres URL `SQL_HOST`, `SQL_USER`, etc., or your `SUPABASE_URL` and `SUPABASE_ANON_KEY` if you intend to configure them securely via environment variables instead of hardcoding).
5. Deploy the site!

That's it! Your full-stack Express + React application will be hosted gracefully on Netlify.
