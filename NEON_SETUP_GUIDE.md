# Neon Database Setup Guide for Book Valley

This guide will help you connect your Book Valley project to a Neon PostgreSQL database.

## Step 1: Create a Neon Project

1. Go to [Neon Console](https://console.neon.tech)
2. Sign up with your email or GitHub account
3. Create a new project:
   - Click "New Project"
   - Enter project name: `book-valley`
   - Choose region closest to you
   - Click "Create Project"

## Step 2: Get Your Connection String

1. In the Neon Console, go to your project
2. Click on "Connection string" tab
3. Select "Node.js" from the dropdown
4. Copy the connection string (it will look like):
   ```
   postgresql://username:password@ep-xxxxx.us-east-1.aws.neon.tech/dbname?sslmode=require
   ```

## Step 3: Set Up Environment Variables

1. Create a `.env.local` file in your project root:
   ```bash
   cp env.example.txt .env.local
   ```

2. Open `.env.local` and replace the `DATABASE_URL` with your Neon connection string:
   ```
   DATABASE_URL="postgresql://user:password@ep-xxxxx.us-east-1.aws.neon.tech/book_valley?sslmode=require"
   ```

3. Add other required variables:
   ```
   JWT_SECRET="your-super-secret-jwt-key-change-this"
   JWT_EXPIRE="7d"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="https://your-deployed-url.com"
   ```

## Step 4: Push Prisma Schema to Neon

Run the following command to create all tables in your Neon database:

```bash
npx prisma db push
```

This will:
- Create all tables defined in `prisma/schema.prisma`
- Set up indexes and relationships
- Ready your database for use

## Step 5: (Optional) Seed Your Database

If you want to add initial data:

```bash
npx prisma db seed
```

This will run the seed script in `prisma/seed.js`

## Step 6: Verify Connection

Run this to check if everything is working:

```bash
npx prisma studio
```

This opens Prisma Studio where you can view and manage your data.

## Deployment to Vercel

When deploying to Vercel:

1. Go to your Vercel project settings
2. Add environment variables:
   - `DATABASE_URL`: Your Neon connection string
   - `JWT_SECRET`: Your JWT secret
   - `NEXTAUTH_SECRET`: Your auth secret
   - Any other required variables

3. Deploy your project - it will automatically use the Neon database

## Useful Neon Commands

### View Database Metrics
- Open Neon Console to see database performance and usage

### Backup Database
- Neon automatically backs up your data
- You can also use Neon's built-in backup features

### Reset Database (if needed)
```bash
npx prisma db push --force-reset
```

⚠️ **Warning**: This will delete all data and recreate tables!

## Troubleshooting

**Connection refused error:**
- Make sure your Neon project is active
- Check that your connection string is correct
- Verify IP whitelisting (Neon allows all IPs by default)

**SSL error:**
- Ensure `?sslmode=require` is in your connection string
- This is required for Neon

**Tables not created:**
- Run: `npx prisma db push`
- Check Prisma schema for errors

## Need Help?

- [Neon Documentation](https://neon.tech/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Vercel Deployment Guide](https://vercel.com/docs)
