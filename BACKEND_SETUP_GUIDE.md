# 🚀 Backend Setup Guide - Book Valley

## ✅ Backend Complete! 

Tumhara complete backend ban gaya hai with:
- ✅ PostgreSQL Database Schema (Prisma)
- ✅ Authentication APIs (Register, Login)
- ✅ Books APIs (List, Search, Details)
- ✅ Categories API
- ✅ Cart APIs (Add, Get)
- ✅ Orders APIs (Create, List)
- ✅ User Profile APIs
- ✅ Wishlist API
- ✅ Admin APIs (Book Management)

---

## 📋 Step-by-Step Setup Instructions

### **Step 1: Install Dependencies**
```bash
npm install
```

### **Step 2: Setup PostgreSQL Database**

**Option A: Local PostgreSQL**
1. Install PostgreSQL from: https://www.postgresql.org/download/
2. Create database:
```sql
CREATE DATABASE book_valley;
```
3. Update `.env.local` file:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/book_valley"
```

**Option B: Free Cloud PostgreSQL (Recommended)**
1. Go to: https://neon.tech (Free PostgreSQL)
2. Create account & new project
3. Copy connection string
4. Update `.env.local` with your connection string

### **Step 3: Generate Prisma Client**
```bash
npm run prisma:generate
```

### **Step 4: Push Database Schema**
```bash
npm run prisma:push
```

### **Step 5: Seed Initial Data**
```bash
npm run prisma:seed
```

### **Step 6: Run Development Server**
```bash
npm run dev
```

---

## 🔌 API Endpoints Created

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### **Categories**
- `GET /api/categories` - Get all categories

### **Books**
- `GET /api/books` - Get all books (with filters)
  - Query params: `?category=Novel Books&search=salaar&page=1&limit=12`
- `GET /api/books/[slug]` - Get single book details

### **Cart**
- `GET /api/cart` - Get user cart (requires auth)
- `POST /api/cart/add` - Add book to cart (requires auth)

### **Orders**
- `POST /api/orders/create` - Create new order (requires auth)
- `GET /api/orders` - Get user orders (requires auth)

### **User Profile**
- `GET /api/user/profile` - Get user profile (requires auth)
- `PUT /api/user/profile` - Update profile (requires auth)

### **Wishlist**
- `GET /api/user/wishlist` - Get wishlist (requires auth)

### **Admin**
- `POST /api/admin/books` - Create book (admin only)

---

## 🔐 Authentication

APIs use JWT Bearer token authentication.

**How to use:**
1. Register/Login to get token
2. Add header to requests:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 📊 Database Schema

### **Tables Created:**
1. **User** - User accounts
2. **Category** - Book categories (6 categories)
3. **Author** - Book authors
4. **Book** - All books (12 novels seeded)
5. **Cart** - Shopping carts
6. **CartItem** - Cart items
7. **Order** - Customer orders
8. **OrderItem** - Order line items
9. **Payment** - Payment records
10. **Review** - Book reviews
11. **Wishlist** - User wishlists
12. **Settings** - Site settings

---

## 🎯 Initial Data Seeded

After running `npm run prisma:seed`, you'll have:

**Categories (6):**
- Novel Books
- Islamic Books
- Story Books
- Medical Books
- Computer Books
- Educational Books

**Books (12 Novels):**
- Salaar Sikandar (RS 1800)
- Salaar Imaama (RS 1500)
- Aab E Hayaat (RS 1900)
- Peer E Kamil (RS 1400)
- Jaan (RS 2500)
- Omar O Ayaar (RS 2700)
- Beast Ka Ishq (RS 2300)
- Diyaar E Dil (RS 2800)
- Ghulam Baagh (RS 2600)
- Khaali Asmaan (RS 2400)
- Mera Ishq (RS 2900)
- Ye Dil Mera (RS 2550)

---

## 🧪 Testing APIs

### **Test Registration:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### **Test Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### **Test Get Books:**
```bash
curl http://localhost:3000/api/books?category=Novel%20Books
```

### **Test Get Categories:**
```bash
curl http://localhost:3000/api/categories
```

---

## 📁 Backend File Structure

```
project dana sarkat/
├── prisma/
│   ├── schema.prisma          ← Database schema
│   └── seed.js                ← Initial data
├── src/
│   ├── lib/
│   │   ├── prisma.js          ← Database client
│   │   └── auth.js            ← Auth utilities
│   └── app/
│       └── api/
│           ├── auth/
│           │   ├── register/route.js
│           │   └── login/route.js
│           ├── books/
│           │   ├── route.js
│           │   └── [slug]/route.js
│           ├── categories/route.js
│           ├── cart/
│           │   ├── route.js
│           │   └── add/route.js
│           ├── orders/
│           │   ├── route.js
│           │   └── create/route.js
│           ├── user/
│           │   ├── profile/route.js
│           │   └── wishlist/route.js
│           └── admin/
│               └── books/route.js
├── .env.local                 ← Environment variables
└── package.json
```

---

## 🔧 Environment Variables

Update `.env.local` with your values:

```env
# Database (REQUIRED)
DATABASE_URL="postgresql://user:password@localhost:5432/book_valley"

# JWT (REQUIRED)
JWT_SECRET="your-super-secret-jwt-key-change-this"
JWT_EXPIRE="7d"

# NextAuth (Optional - for social login)
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Facebook OAuth (Optional)
FACEBOOK_CLIENT_ID="your-facebook-app-id"
FACEBOOK_CLIENT_SECRET="your-facebook-app-secret"
```

---

## ⚠️ Important Notes

1. **PostgreSQL Required**: Install PostgreSQL or use free cloud service (Neon.tech)
2. **Environment Variables**: Update `.env.local` with your database URL
3. **Run Migrations**: Always run `npm run prisma:push` after schema changes
4. **Seed Data**: Run `npm run prisma:seed` to populate initial data
5. **JWT Secret**: Change JWT_SECRET in production

---

## 🐛 Troubleshooting

### **Error: Can't reach database**
- Check PostgreSQL is running
- Verify DATABASE_URL in `.env.local`
- Test connection: `npm run prisma:push`

### **Error: Prisma Client not generated**
- Run: `npm run prisma:generate`

### **Error: Module not found**
- Run: `npm install`

### **Error: Port 3000 already in use**
- Kill process or use different port:
```bash
npm run dev -- -p 3001
```

---

## 🎉 Next Steps

1. ✅ Setup database (PostgreSQL)
2. ✅ Install dependencies (`npm install`)
3. ✅ Generate Prisma client (`npm run prisma:generate`)
4. ✅ Push schema (`npm run prisma:push`)
5. ✅ Seed data (`npm run prisma:seed`)
6. ✅ Run server (`npm run dev`)
7. 🔨 Connect frontend to backend APIs
8. 🔨 Add authentication to frontend
9. 🔨 Build cart & checkout pages
10. 🔨 Test & deploy

---

## 📞 Support

**Developer:** Muhammad Rizwan  
**Email:** mlkrizwan213@gmail.com  
**Phone:** +92 309 5693653

---

**Backend Status:** ✅ COMPLETE  
**Last Updated:** 2025-12-03
