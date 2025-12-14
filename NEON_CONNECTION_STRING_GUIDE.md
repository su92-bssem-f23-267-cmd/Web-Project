# Neon Connection String Guide

Quick guide to get and format your Neon connection string correctly.

## Getting Your Connection String from Neon

### Step 1: Go to Neon Console
- Visit: https://console.neon.tech
- Log in with your account

### Step 2: Select Your Project
- Click on your project (e.g., "book-valley")
- If no project exists, create one first

### Step 3: Get Connection String
- Look for "Connection string" section
- Select "Node.js" from the dropdown
- Copy the connection string

### Example Neon Connection String
```
postgresql://neon_user:password123@ep-cool-darkness-123456.us-east-1.aws.neon.tech/dbname?sslmode=require
```

## Connection String Format

Breaking down the connection string:

```
postgresql://USER:PASSWORD@HOST:PORT/DBNAME?sslmode=require
           └─────┬─────┘ └─────┬─────┘ └────┬────┘ └───┬──┘ └──┬──┘
                 │             │           │         │       │
            username        password      hostname   port   database
                                                              name
```

### Example Breakdown:
```
postgresql://neon_user:abc123def456@ep-cool-darkness-123456.us-east-1.aws.neon.tech/book_valley?sslmode=require
            └────────────┬─────────────┘ └────────────────────┬────────────────────┘ └────┬────┘ └─────┬──────┘
                         │                                     │                        │           │
                    Username (neon_user)              Host (Neon endpoint)      Database name   SSL required
                    Password (abc123def456)
```

## Common Issues with Connection Strings

### ❌ Wrong: Missing sslmode
```
postgresql://user:password@host/dbname
```
**Fix**: Add `?sslmode=require`
```
postgresql://user:password@host/dbname?sslmode=require
```

### ❌ Wrong: Using localhost
```
postgresql://user:password@localhost:5432/book_valley
```
**Fix**: Use your Neon endpoint
```
postgresql://user:password@ep-xxxxx.us-east-1.aws.neon.tech/book_valley?sslmode=require
```

### ❌ Wrong: No password
```
postgresql://neon_user@ep-xxxxx.us-east-1.aws.neon.tech/book_valley?sslmode=require
```
**Fix**: Include password
```
postgresql://neon_user:password@ep-xxxxx.us-east-1.aws.neon.tech/book_valley?sslmode=require
```

### ❌ Wrong: Special characters not escaped
```
postgresql://user:p@ss%word@ep-xxxxx.us-east-1.aws.neon.tech/book_valley?sslmode=require
```
**Fix**: URL encode special characters
```
postgresql://user:p%40ss%25word@ep-xxxxx.us-east-1.aws.neon.tech/book_valley?sslmode=require
```

## How to Set It in Your Project

### Local Development (.env.local)
```bash
# Create or edit .env.local file
DATABASE_URL="postgresql://neon_user:password@ep-xxxxx.us-east-1.aws.neon.tech/book_valley?sslmode=require"
```

### Production (Vercel)
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add:
   - **Name**: DATABASE_URL
   - **Value**: Your Neon connection string
5. Click "Save"

## Testing Your Connection String

### Method 1: Using Prisma
```bash
# This will connect to your database and show the schema
npx prisma db execute --stdin < /dev/null
```

### Method 2: Using Prisma Studio
```bash
# Opens visual database explorer
npx prisma studio
```

### Method 3: Using Node
```javascript
// Create test.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error('Connection failed:', err);
  else console.log('Connected! Current time:', res.rows[0]);
  pool.end();
});
```

```bash
# Run the test
node test.js
```

## Multiple Databases (Advanced)

If you have multiple Neon projects:

### Development Database
```
postgresql://user:pass@ep-dev-xxxxx.us-east-1.aws.neon.tech/book_valley_dev?sslmode=require
```

### Production Database
```
postgresql://user:pass@ep-prod-xxxxx.us-east-1.aws.neon.tech/book_valley_prod?sslmode=require
```

### Staging Database
```
postgresql://user:pass@ep-staging-xxxxx.us-east-1.aws.neon.tech/book_valley_staging?sslmode=require
```

Use different `.env` files:
- `.env.local` → Development
- Vercel Settings → Production
- Different Vercel preview branch → Staging

## Resetting Your Connection String

If your credentials are compromised:

1. Go to Neon Console
2. Select your project
3. Click "Settings"
4. Find "Roles" or "Connection"
5. Reset password
6. Copy new connection string
7. Update in `.env.local` and Vercel

## Connection String Parts Reference

| Part | Example | Purpose |
|------|---------|---------|
| Protocol | `postgresql://` | Database protocol |
| Username | `neon_user` | Database user |
| Password | `password123` | Database password |
| Host | `ep-cool-darkness-123456.us-east-1.aws.neon.tech` | Neon server address |
| Port | `5432` | Database port (default) |
| Database | `book_valley` | Database name |
| SSL | `?sslmode=require` | Secure connection |

## Troubleshooting Connection Issues

### "Connection refused"
- ❌ Check: Is your Neon project active?
  - Go to Neon Console
  - If project is paused, click to resume
  
### "Authentication failed"
- ❌ Check: Is your password correct?
  - Reset password in Neon Settings
  - Copy fresh connection string

### "SSL error" or "certificate verify failed"
- ❌ Check: Is `?sslmode=require` in your URL?
  - This is **required** for Neon

### "Database 'X' doesn't exist"
- ❌ Check: Is database name spelled correctly?
  - View in Neon Console
  - Copy exact name

### "Too many connections"
- ❌ Check: How many Node processes are running?
  - Close extra terminals
  - Use connection pooling for production

## Best Practices

1. **Never commit connection strings**
   ```bash
   # Good: Use .env.local (in .gitignore)
   DATABASE_URL="..."
   
   # Bad: Hardcode in code
   const url = "postgresql://...";
   ```

2. **Protect your password**
   - Don't share it in messages
   - Don't put it on GitHub
   - Use Neon's built-in safety features

3. **Use different databases**
   - Development: One Neon project
   - Production: Different Neon project
   - Staging: Optional third project

4. **Rotate passwords regularly**
   - Change every 90 days
   - Immediately if compromised

5. **Test before deploying**
   ```bash
   npm run build  # Test locally first
   git push      # Then deploy
   ```

## Need Help?

- [Neon Documentation](https://neon.tech/docs/connect/connection-details)
- [Prisma Connection Guide](https://www.prisma.io/docs/orm/reference/connection-urls)
- [PostgreSQL Connection String Docs](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)

---

**Last Updated**: December 14, 2025
