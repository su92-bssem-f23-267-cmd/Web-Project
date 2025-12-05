# ⚡ Quick Start - Book Valley Backend

## 🚀 5 Commands to Start Backend

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma Client
npm run prisma:generate

# 3. Push database schema
npm run prisma:push

# 4. Seed initial data (12 books + 6 categories)
npm run prisma:seed

# 5. Start development server
npm run dev
```

## ⚠️ Before Running Commands

**Update `.env.local` file with your PostgreSQL database URL:**

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/book_valley"
```

### Free PostgreSQL Options:
1. **Neon.tech** (Recommended) - https://neon.tech
2. **Supabase** - https://supabase.com
3. **ElephantSQL** - https://www.elephantsql.com
4. **Local PostgreSQL** - https://www.postgresql.org/download/

---

## ✅ What You Get

After setup, your backend will have:

### **APIs Ready:**
- ✅ User Registration & Login
- ✅ Books Listing (12 novels)
- ✅ Categories (6 types)
- ✅ Shopping Cart
- ✅ Orders System
- ✅ User Profile
- ✅ Wishlist
- ✅ Admin Panel

### **Database Tables:**
- ✅ Users
- ✅ Books (12 seeded)
- ✅ Categories (6 seeded)
- ✅ Authors
- ✅ Cart & CartItems
- ✅ Orders & OrderItems
- ✅ Reviews
- ✅ Wishlist
- ✅ Payments
- ✅ Settings

---

## 🧪 Test Your Backend

### Open browser and test:
```
http://localhost:3000/api/categories
http://localhost:3000/api/books
http://localhost:3000/api/books?category=Novel Books
```

### Test Registration (Postman/Thunder Client):
```
POST http://localhost:3000/api/auth/register
Body: {
  "fullName": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

---

## 📚 Full Documentation

See `BACKEND_SETUP_GUIDE.md` for complete details.

---

**Status:** ✅ Backend Complete  
**Time to Setup:** ~5 minutes  
**Developer:** Muhammad Rizwan
