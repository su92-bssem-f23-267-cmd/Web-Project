# Quick Start Checklist - Neon Database Setup

Complete this checklist to get your Book Valley live with Neon database.

## ✅ Local Development Setup

- [ ] Clone/have your project ready
- [ ] Run `npm install` to install dependencies
- [ ] Create `.env.local` file:
  ```bash
  cp .env.local.example .env.local
  ```

## ✅ Set Up Neon Database

- [ ] Go to [console.neon.tech](https://console.neon.tech)
- [ ] Create account (Email or GitHub)
- [ ] Create new project:
  - Name: `book-valley-dev` (for development)
  - Select region close to you
  - Click "Create Project"
- [ ] Copy your connection string (Node.js format)
- [ ] Update `DATABASE_URL` in `.env.local`

## ✅ Initialize Database Locally

```bash
# Push your Prisma schema to Neon
npx prisma db push

# (Optional) Seed with sample data
npx prisma db seed

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

## ✅ Test Locally

- [ ] Run `npm run dev`
- [ ] Open [http://localhost:3001](http://localhost:3001)
- [ ] Test features:
  - [ ] Home page loads
  - [ ] Navigation works
  - [ ] Can access different book categories
  - [ ] Mobile menu works on smaller screens

## ✅ Production Setup (For Live Website)

- [ ] Set up GitHub repository
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/YOUR_USERNAME/book-valley.git
  git push -u origin main
  ```

- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Create account (GitHub recommended)
- [ ] Import your GitHub repository
- [ ] Set environment variables in Vercel:
  - `DATABASE_URL` (your Neon production connection string)
  - `JWT_SECRET` (generate random string)
  - `NEXTAUTH_SECRET` (generate random string)
  - `NEXTAUTH_URL` (your Vercel domain)

- [ ] Deploy to Vercel
- [ ] Run migrations on production:
  ```bash
  npx prisma db push --skip-generate
  ```

## ✅ Verify Live Deployment

- [ ] Visit your Vercel URL
- [ ] Test key features work
- [ ] Check logs for errors: `vercel logs`
- [ ] Monitor database: Neon Console → Monitoring

## 🚀 Common Commands

```bash
# Development
npm run dev              # Start dev server

# Database
npx prisma db push      # Push schema changes
npx prisma studio      # Open data viewer
npx prisma db seed     # Seed initial data
npx prisma generate    # Generate Prisma client

# Deployment
git push origin main    # Deploy to Vercel
vercel logs            # View deployment logs
```

## 📝 Important URLs

| Service | URL |
|---------|-----|
| Neon Console | https://console.neon.tech |
| Vercel Dashboard | https://vercel.com |
| Local Dev | http://localhost:3001 |
| Your Live Site | https://book-valley.vercel.app |
| GitHub | https://github.com/YOUR_USERNAME/book-valley |

## 🆘 Need Help?

### Connection Issues
- Check DATABASE_URL format
- Verify Neon project is active
- Ensure `?sslmode=require` is in URL

### Deployment Issues
- Check Vercel build logs
- Verify environment variables are set
- Run `npm run build` locally to test

### Data Issues
- Use Prisma Studio: `npx prisma studio`
- Check Neon Console for query logs
- Review database schema

## 📚 Useful Documentation

- [Neon Setup Guide](./NEON_SETUP_GUIDE.md)
- [Vercel Deployment Guide](./VERCEL_DEPLOYMENT_GUIDE.md)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Next.js Docs](https://nextjs.org/docs)

---

**Status**: 🟡 In Progress / 🟢 Ready / 🔴 Stuck

Last Updated: December 14, 2025
