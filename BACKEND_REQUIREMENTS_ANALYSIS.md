# 📚 Book Valley - Complete Code Analysis & Backend Requirements

## 🎯 Project Overview
**Project Name:** Book Valley (Dana Sarkat)  
**Technology:** Next.js 15.5.4 with React 19.1.0  
**Styling:** TailwindCSS v4  
**Type:** Online Book Store / E-Commerce Platform

---

## 📂 Current Frontend Structure

### **Main Pages (Routes)**
```
├── / (Home Page)
├── /LoginPage
├── /signup
├── /Aboutus
├── /NovelBooks
├── /IslamicBooks
├── /StoryBooks
├── /MedicalBooks
├── /Computerbooks
├── /EducationalBooks
```

### **Reusable Components**
```
src/app/componenets/
├── Section1.js          (Category Card - Home page)
├── Novelsection.js      (Book Card Template)
├── Storysection.js      (Book Card Template)
├── Islamicsection.js    (Book Card Template)
├── Medicalsection.js    (Book Card Template)
├── Bookdetails.js       (Book Detail Page)
```

---

## 🔍 Feature-by-Feature Analysis

### **1️⃣ Homepage (`/`)**
**Current Features:**
- ✅ Fixed Navbar with Logo & Navigation
- ✅ Dropdown menu for Products (6 categories)
- ✅ Hero Section with tagline "Turning Pages, Opening Minds"
- ✅ 6 Book Categories displayed as cards:
  - Novel Books
  - Islamic Books
  - Story Books
  - Medical Books
  - Computer Books
  - Educational Books
- ✅ Footer with Quick Links, Logo, and Social Media

**Backend Needs:**
```javascript
// API Endpoints Required:
GET /api/categories          // Get all book categories
GET /api/featured-books     // Get featured books for homepage
```

**Database Schema Needed:**
```javascript
Categories Collection:
{
  _id: ObjectId,
  name: String,              // "Novel Books"
  slug: String,              // "novel-books"
  description: String,       // "Imagination, Emotion, Adventure."
  image: String,             // "/novel3.jpg"
  displayOrder: Number
}
```

---

### **2️⃣ Authentication Pages**

#### **Login Page (`/LoginPage`)**
**Current Features:**
- ✅ Email & Password Input Fields
- ✅ "Forgot Password" Link
- ✅ Social Login Buttons (Facebook & Google)
- ✅ Link to Signup Page

**Backend Needs:**
```javascript
// API Endpoints:
POST /api/auth/login              // Email/Password Login
POST /api/auth/social-login       // Google/Facebook OAuth
POST /api/auth/forgot-password    // Password Reset Request
GET  /api/auth/verify-token       // JWT Token Verification
```

**Database Schema:**
```javascript
Users Collection:
{
  _id: ObjectId,
  fullName: String,
  email: String (unique, indexed),
  password: String (hashed with bcrypt),
  profilePicture: String,
  role: String (enum: ['user', 'admin']),
  provider: String (enum: ['local', 'google', 'facebook']),
  providerId: String,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date
}
```

#### **Signup Page (`/signup`)**
**Current Features:**
- ✅ Full Name Input
- ✅ Email Input
- ✅ Password Input
- ✅ Confirm Password Input
- ✅ Social Signup (Facebook & Google)

**Backend Needs:**
```javascript
// API Endpoints:
POST /api/auth/register          // Create New Account
POST /api/auth/verify-email      // Email Verification
```

---

### **3️⃣ Book Listing Pages**

#### **Novel Books Page (`/NovelBooks`)**
**Current Features:**
- ✅ Search Functionality (Frontend State)
- ✅ 12 Books Displayed (Hardcoded Data)
- ✅ Book Cards showing:
  - Book Name
  - Book Image
  - Author Name
  - Price

**Current Hardcoded Data:**
```javascript
Books Array (12 items):
- Salaar Sikandar (RS:1800)
- Salaar Imaama (RS:1500)
- Aab E Hayaat (RS:1900)
- Peer E Kamil (RS:1400)
- Jaan (RS:2500)
- Omar O Ayaar (RS:2700)
- Beast Ka Ishq (RS:2300)
- Diyaar E Dil (RS:2800)
- Ghulam Baagh (RS:2600)
- Khaali Asmaan (RS:2400)
- Mera Ishq (RS:2900)
- Ye Dil Mera (RS:2550)
```

**Backend Needs:**
```javascript
// API Endpoints:
GET /api/books?category=novels              // Get all novels
GET /api/books/search?query=salaar          // Search books
GET /api/books/:id                          // Get single book details
POST /api/admin/books                       // Create new book (Admin)
PUT /api/admin/books/:id                    // Update book (Admin)
DELETE /api/admin/books/:id                 // Delete book (Admin)
```

**Database Schema:**
```javascript
Books Collection:
{
  _id: ObjectId,
  title: String (indexed),
  slug: String (unique),
  author: String,
  authorId: ObjectId (ref: 'Authors'),
  category: String (indexed),
  categoryId: ObjectId (ref: 'Categories'),
  price: Number,
  discountPrice: Number,
  images: [String],                    // Array of image URLs
  description: String,
  isbn: String,
  publisher: String,
  publishedDate: Date,
  pages: Number,
  language: String,
  inStock: Boolean,
  stockQuantity: Number,
  rating: Number,
  reviewCount: Number,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

**Similar Pages:**
- Islamic Books (`/IslamicBooks`)
- Story Books (`/StoryBooks`)
- Medical Books (`/MedicalBooks`)
- Computer Books (`/Computerbooks`)
- Educational Books (`/EducationalBooks`)

*All use same backend structure, just different category filter*

---

### **4️⃣ Book Details Page**

**Current Features (from `Bookdetails.js`):**
- ✅ Single Book Display (Hardcoded "Peer e Kamil")
- ✅ Book Image
- ✅ Author Name
- ✅ Published Date
- ✅ Description
- ✅ "Buy Now" Button (Non-functional)

**Backend Needs:**
```javascript
// API Endpoints:
GET /api/books/:slug                 // Get book by slug
GET /api/books/:id/reviews           // Get book reviews
POST /api/books/:id/reviews          // Add review
GET /api/books/:id/related           // Get related books
```

**Additional Schema:**
```javascript
Reviews Collection:
{
  _id: ObjectId,
  bookId: ObjectId (ref: 'Books'),
  userId: ObjectId (ref: 'Users'),
  rating: Number (1-5),
  comment: String,
  isVerified: Boolean,
  createdAt: Date
}
```

---

### **5️⃣ About Us Page (`/Aboutus`)**
**Current Features:**
- ✅ Developer Info (Muhammad Rizwan)
- ✅ Contact Information
- ✅ Profile Picture

**Backend Needs:**
```javascript
// API Endpoints:
GET /api/settings/about              // Get About Us info
PUT /api/admin/settings/about        // Update About Us (Admin)
```

---

## 🛒 **MISSING FEATURES (Need to Add)**

### **1. Shopping Cart System**
**Required:**
- Add to Cart functionality
- Cart page showing all items
- Update quantity
- Remove items
- Calculate total

**Backend Needs:**
```javascript
// API Endpoints:
GET /api/cart                        // Get user's cart
POST /api/cart/add                   // Add item to cart
PUT /api/cart/update/:itemId         // Update quantity
DELETE /api/cart/remove/:itemId      // Remove from cart
DELETE /api/cart/clear               // Clear cart

// Database Schema:
Cart Collection:
{
  _id: ObjectId,
  userId: ObjectId (ref: 'Users'),
  items: [{
    bookId: ObjectId (ref: 'Books'),
    quantity: Number,
    price: Number,
    addedAt: Date
  }],
  totalAmount: Number,
  updatedAt: Date
}
```

---

### **2. Orders & Checkout System**
**Required:**
- Checkout page
- Order summary
- Delivery address
- Payment integration
- Order confirmation

**Backend Needs:**
```javascript
// API Endpoints:
POST /api/orders/create              // Create new order
GET /api/orders                      // Get user orders
GET /api/orders/:id                  // Get order details
PUT /api/admin/orders/:id/status     // Update order status

// Database Schema:
Orders Collection:
{
  _id: ObjectId,
  userId: ObjectId (ref: 'Users'),
  orderNumber: String (unique),
  items: [{
    bookId: ObjectId,
    title: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    postalCode: String
  },
  paymentMethod: String,
  paymentStatus: String (enum: ['pending', 'paid', 'failed']),
  orderStatus: String (enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  createdAt: Date,
  deliveredAt: Date
}
```

---

### **3. User Profile & Dashboard**
**Required:**
- User profile page
- Order history
- Wishlist/Favorites
- Account settings

**Backend Needs:**
```javascript
// API Endpoints:
GET /api/user/profile                // Get user profile
PUT /api/user/profile                // Update profile
GET /api/user/orders                 // Get order history
GET /api/user/wishlist               // Get wishlist
POST /api/user/wishlist/add/:bookId  // Add to wishlist
DELETE /api/user/wishlist/:bookId    // Remove from wishlist

// Database Schema:
Wishlist Collection:
{
  _id: ObjectId,
  userId: ObjectId (ref: 'Users'),
  books: [ObjectId] (ref: 'Books'),
  updatedAt: Date
}
```

---

### **4. Admin Dashboard**
**Required:**
- Books management (CRUD)
- Orders management
- Users management
- Categories management
- Analytics/Reports

**Backend Needs:**
```javascript
// API Endpoints:
GET /api/admin/dashboard             // Dashboard stats
GET /api/admin/books                 // All books (with pagination)
GET /api/admin/orders                // All orders
GET /api/admin/users                 // All users
GET /api/admin/analytics             // Sales analytics
```

---

### **5. Payment Integration**
**Suggested for Pakistan:**
- JazzCash
- EasyPaisa
- Bank Transfer
- Cash on Delivery (COD)

**Backend Needs:**
```javascript
// API Endpoints:
POST /api/payment/jazzcash/initiate
POST /api/payment/jazzcash/callback
POST /api/payment/easypaisa/initiate
POST /api/payment/verify

// Database Schema:
Payments Collection:
{
  _id: ObjectId,
  orderId: ObjectId (ref: 'Orders'),
  userId: ObjectId (ref: 'Users'),
  amount: Number,
  method: String,
  transactionId: String,
  status: String,
  createdAt: Date
}
```

---

## 🔧 **Recommended Backend Tech Stack**

### **Option 1: Node.js + Express + MongoDB**
```javascript
// Dependencies:
- express           // Web framework
- mongoose          // MongoDB ORM
- bcryptjs          // Password hashing
- jsonwebtoken      // JWT authentication
- express-validator // Input validation
- multer            // File upload
- cors              // CORS handling
- dotenv            // Environment variables
```

### **Option 2: Next.js API Routes (Recommended)**
```javascript
// Built-in API routes in Next.js
- No separate backend needed
- Use /src/app/api/ folder
- Same dependencies as Option 1
```

---

## 📊 **Complete Database Collections Summary**

```
1. users             // User accounts
2. books             // All books inventory
3. categories        // Book categories
4. authors           // Book authors
5. cart              // Shopping carts
6. orders            // Customer orders
7. orderItems        // Order line items
8. reviews           // Book reviews
9. wishlist          // User wishlists
10. payments         // Payment transactions
11. settings         // Site settings
```

---

## 🚀 **Implementation Priority**

### **Phase 1 (Essential):**
1. ✅ Database Setup (MongoDB)
2. ✅ User Authentication (Login/Signup)
3. ✅ Books API (CRUD + Search)
4. ✅ Categories API

### **Phase 2 (Core Features):**
5. ✅ Shopping Cart System
6. ✅ Book Details with Reviews
7. ✅ User Profile

### **Phase 3 (E-commerce):**
8. ✅ Checkout Process
9. ✅ Order Management
10. ✅ Payment Integration

### **Phase 4 (Admin):**
11. ✅ Admin Dashboard
12. ✅ Inventory Management
13. ✅ Analytics

---

## 📝 **Environment Variables Needed**

```env
# Database
MONGODB_URI=mongodb+srv://...
DATABASE_NAME=book_valley

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRE=7d

# OAuth (Google)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# OAuth (Facebook)
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret

# Payment (JazzCash)
JAZZCASH_MERCHANT_ID=your-merchant-id
JAZZCASH_PASSWORD=your-password
JAZZCASH_RETURN_URL=http://localhost:3000/payment/callback

# Email (for verification)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Upload
UPLOAD_DIR=./public/uploads
MAX_FILE_SIZE=5242880  # 5MB

# App
NODE_ENV=development
PORT=3000
BASE_URL=http://localhost:3000
```

---

## 📞 **Contact Information (from code)**
- **Developer:** Muhammad Rizwan
- **Email:** mlkrizwan213@gmail.com
- **Phone:** +92 309 5693653

---

## ⚠️ **Current Issues to Fix:**

1. **Typo in MedicalBooks page:** Line 11 has extra "s" character
2. **Hardcoded Book Data:** All book pages use hardcoded arrays
3. **Non-functional Forms:** Login/Signup forms don't submit
4. **No Cart:** Buy Now buttons don't work
5. **No Search Backend:** Search only filters frontend array
6. **Duplicate Code:** Multiple pages have same footer/navbar code
7. **Component Naming:** "componenets" should be "components"

---

## ✅ **Next Steps:**

1. Create `.env` file with necessary variables
2. Setup MongoDB database
3. Create Mongoose models for all collections
4. Build API routes in `/src/app/api/`
5. Connect frontend forms to backend APIs
6. Add state management (Context API or Redux)
7. Implement proper error handling
8. Add loading states
9. Create protected routes
10. Build admin dashboard

---

**Last Updated:** 2025-12-03  
**Document Version:** 1.0  
**For:** Backend Development Planning
