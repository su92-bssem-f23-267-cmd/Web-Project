# Deploying Book Valley to Vercel with Neon Database

Complete guide to deploy your Book Valley project to Vercel and connect it to Neon PostgreSQL.

## Prerequisites

- Neon account ([console.neon.tech](https://console.neon.tech))
- Vercel account ([vercel.com](https://vercel.com))
- GitHub account with your project repository

## Step 1: Push Your Project to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Book Valley with Neon setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/book-valley.git
git push -u origin main
```

## Step 2: Set Up Neon Database

1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project:
   - Project name: `book-valley-prod`
   - Select your region
   - Click "Create Project"

3. Get your connection string:
   - Click "Connection string"
   - Select "Node.js"
   - Copy the full URL (e.g., `postgresql://user:password@ep-xxxxx.us-east-1.aws.neon.tech/dbname?sslmode=require`)

## Step 3: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and log in
2. Click "Add New" → "Project"
3. Import your GitHub repository:
   - Search for `book-valley`
   - Click "Import"
4. Configure the project:
   - **Project Name**: book-valley
   - **Framework**: Next.js
   - **Root Directory**: ./ (leave as default)
5. Set Environment Variables:
   - Click "Environment Variables"
   - Add the following variables:
   
   | Key | Value |
   |-----|-------|
   | `DATABASE_URL` | Your Neon connection string |
   | `JWT_SECRET` | Your random JWT secret |
   | `JWT_EXPIRE` | `7d` |
   | `NEXTAUTH_SECRET` | Random string for NextAuth |
   | `NEXTAUTH_URL` | `https://your-project.vercel.app` |

6. Click "Deploy"
7. Wait for deployment to complete

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts and add environment variables when asked
```

## Step 4: Initialize Database on Vercel

After deployment, run Prisma migrations:

```bash
# Create a .env file with your Neon DATABASE_URL
# Then run:
npx prisma db push

# Seed database with initial data (optional):
npx prisma db seed
```

## Step 5: Verify Deployment

1. Go to your Vercel project dashboard
2. Click the deployment URL
3. Your Book Valley site should be live!
4. Check that database operations work (login, adding to cart, etc.)

## Environment Variables for Vercel

```
# Database
DATABASE_URL=postgresql://user:password@ep-xxxxx.us-east-1.aws.neon.tech/dbname?sslmode=require

# Authentication
JWT_SECRET=your-super-secret-key-minimum-32-characters
JWT_EXPIRE=7d
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=https://your-project.vercel.app

# Optional: OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret

# Optional: Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

## Monitoring Your Deployed Site

### View Logs in Vercel
```bash
vercel logs
```

### Monitor Database in Neon
1. Go to [Neon Console](https://console.neon.tech)
2. Select your project
3. View "Monitoring" tab for:
   - Database connections
   - Query performance
   - Storage usage

### Check Performance
- Vercel Analytics: Dashboard → Analytics
- Neon Monitoring: Console → Monitoring

## Troubleshooting

### Database Connection Error
- ❌ Connection refused
  - Check DATABASE_URL in Vercel environment variables
  - Verify Neon project is active
  
- ❌ SSL error
  - Ensure `?sslmode=require` is in connection string

### Build Failed
- Check build logs in Vercel
- Ensure all environment variables are set
- Run `npm run build` locally to test

### Deployment Stuck
- Check Vercel deployment status
- Clear build cache: Dashboard → Settings → Build Cache

## Auto-Deploy on GitHub Push

Vercel automatically deploys whenever you push to `main` branch:

```bash
# Make changes locally
git add .
git commit -m "Update: New feature"
git push origin main

# Vercel automatically deploys! ✓
```

## Performance Tips

1. **Database Optimization**
   - Add indexes in Prisma schema
   - Use database connection pooling

2. **Edge Functions**
   - Use Vercel Edge Functions for API routes
   - Reduce server response time

3. **Caching**
   - Enable Vercel caching
   - Use Next.js ISR (Incremental Static Regeneration)

## Domain Setup

1. Go to Vercel Project Settings → Domains
2. Add your custom domain
3. Update DNS records (follow Vercel instructions)
4. Update `NEXTAUTH_URL` in environment variables

## Need Help?

- [Vercel Deployment Docs](https://vercel.com/docs/deployments/overview)
- [Neon Documentation](https://neon.tech/docs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/orm/more/deployment)
- [Next.js Production Checklist](https://nextjs.org/learn/production/deployment)

---

**Your Book Valley is now live! 🎉**

Share your site: `https://your-project.vercel.app`
