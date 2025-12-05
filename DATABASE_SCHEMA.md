# 📊 Book Valley - Database Schema Design (MongoDB)

## Collection Structure Overview

```
Database: book_valley
├── users
├── books
├── categories
├── authors
├── cart
├── orders
├── reviews
├── wishlist
├── payments
└── settings
```

---

## 1️⃣ Users Collection

```javascript
{
  _id: ObjectId("64a1b2c3d4e5f6g7h8i9j0k1"),
  
  // Basic Info
  fullName: "Muhammad Rizwan",
  email: "mlkrizwan213@gmail.com",        // Unique, Indexed
  password: "$2b$10$hashed_password_here",  // Bcrypt hashed
  
  // Profile
  profilePicture: "/uploads/users/profile-123.jpg",
  phone: "+92 309 5693653",
  
  // Authentication
  provider: "local",                      // "local", "google", "facebook"
  providerId: null,                       // Google/Facebook ID if social login
  
  // Status
  role: "user",                           // "user", "admin"
  isVerified: true,
  isActive: true,
  
  // Password Reset
  resetPasswordToken: null,
  resetPasswordExpire: null,
  
  // Timestamps
  createdAt: ISODate("2025-01-15T08:00:00.000Z"),
  updatedAt: ISODate("2025-12-01T10:30:00.000Z"),
  lastLogin: ISODate("2025-12-03T18:45:00.000Z")
}

// Indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ role: 1 })
db.users.createIndex({ createdAt: -1 })
```

---

## 2️⃣ Books Collection

```javascript
{
  _id: ObjectId("64a1b2c3d4e5f6g7h8i9j0k1"),
  
  // Basic Info
  title: "Salaar Sikandar",                // Indexed
  slug: "salaar-sikandar",                 // Unique, URL-friendly
  
  // Author Info
  author: "Rizwan",
  authorId: ObjectId("64a1b2c3d4e5f6g7h8i9j0k2"),  // Ref: authors
  
  // Category
  category: "Novel Books",
  categoryId: ObjectId("64a1b2c3d4e5f6g7h8i9j0k3"), // Ref: categories
  
  // Pricing
  price: 1800,
  discountPrice: 1500,                     // null if no discount
  currency: "PKR",
  
  // Media
  images: [
    "/uploads/books/salaar-main.jpg",
    "/uploads/books/salaar-back.jpg",
    "/uploads/books/salaar-inside.jpg"
  ],
  coverImage: "/uploads/books/salaar-main.jpg",  // Primary image
  
  // Details
  description: "Complete description of the book...",
  shortDescription: "Brief summary for cards...",
  
  // Publishing Info
  isbn: "978-3-16-148410-0",
  publisher: "Kitab Publications",
  publishedDate: ISODate("2020-05-15T00:00:00.000Z"),
  edition: "1st Edition",
  pages: 450,
  language: "Urdu",
  format: "Paperback",                     // Paperback, Hardcover, eBook
  
  // Inventory
  inStock: true,
  stockQuantity: 25,
  lowStockThreshold: 5,
  
  // Stats
  rating: 4.5,                             // Average rating
  reviewCount: 125,
  viewCount: 1850,
  salesCount: 340,
  
  // SEO
  tags: ["romantic", "adventure", "bestseller", "urdu-novel"],
  metaTitle: "Salaar Sikandar - Romantic Adventure Novel",
  metaDescription: "Buy Salaar Sikandar online...",
  
  // Status
  status: "active",                        // "active", "draft", "discontinued"
  featured: true,
  bestseller: true,
  
  // Timestamps
  createdAt: ISODate("2020-06-01T08:00:00.000Z"),
  updatedAt: ISODate("2025-12-01T15:30:00.000Z")
}

// Indexes
db.books.createIndex({ slug: 1 }, { unique: true })
db.books.createIndex({ title: "text", author: "text", description: "text" })
db.books.createIndex({ categoryId: 1 })
db.books.createIndex({ price: 1 })
db.books.createIndex({ rating: -1 })
db.books.createIndex({ createdAt: -1 })
db.books.createIndex({ status: 1 })
db.books.createIndex({ tags: 1 })
```

---

## 3️⃣ Categories Collection

```javascript
{
  _id: ObjectId("64a1b2c3d4e5f6g7h8i9j0k1"),
  
  // Basic Info
  name: "Novel Books",
  slug: "novel-books",                     // Unique, URL-friendly
  description: "Imagination, Emotion, Adventure.",
  
  // Media
  image: "/uploads/categories/novel.jpg",
  icon: "📚",
  
  // SEO
  metaTitle: "Novel Books - Book Valley",
  metaDescription: "Browse our collection of novels...",
  
  // Display
  displayOrder: 1,                         // For sorting
  color: "#6366F1",                        // Color theme
  
  // Stats
  bookCount: 145,                          // Auto-calculated
  
  // Status
  isActive: true,
  
  // Timestamps
  createdAt: ISODate("2025-01-01T00:00:00.000Z"),
  updatedAt: ISODate("2025-11-30T10:00:00.000Z")
}

// Indexes
db.categories.createIndex({ slug: 1 }, { unique: true })
db.categories.createIndex({ displayOrder: 1 })
```

---

## 4️⃣ Authors Collection

```javascript
{
  _id: ObjectId("64a1b2c3d4e5f6g7h8i9j0k1"),
  
  // Basic Info
  name: "Umera Ahmed",
  slug: "umera-ahmed",
  bio: "Umera Ahmed is a renowned Pakistani writer...",
  
  // Media
  photo: "/uploads/authors/umera-ahmed.jpg",
  
  // Social
  website: "https://umeraahmed.com",
  social: {
    facebook: "umeraahmedofficial",
    twitter: "umeraahmed",
    instagram: "umeraahmed_official"
  },
  
  // Stats
  bookCount: 15,
  totalSales: 25000,
  
  // Timestamps
  createdAt: ISODate("2025-01-10T00:00:00.000Z"),
  updatedAt: ISODate("2025-11-28T12:00:00.000Z")
}

// Indexes
db.authors.createIndex({ slug: 1 }, { unique: true })
db.authors.createIndex({ name: "text" })
```

---

## 5️⃣ Cart Collection

```javascript
{
  _id: ObjectId("64a1b2c3d4e5f6g7h8i9j0k1"),
  
  // User
  userId: ObjectId("64a1b2c3d4e5f6g7h8i9j0k2"),  // Ref: users
  
  // Items
  items: [
    {
      _id: ObjectId("64a1b2c3d4e5f6g7h8i9j0k3"),
      bookId: ObjectId("64a1b2c3d4e5f6g7h8i9j0k4"),  // Ref: books
      title: "Salaar Sikandar",           // Denormalized for performance
      image: "/SalaarSkindar.jpeg",
      price: 1800,
      quantity: 2,
      subtotal: 3600,
      addedAt: ISODate("2025-12-01T10:30:00.000Z")
    },
    {
      _id: ObjectId("64a1b2c3d4e5f6g7h8i9j0k5"),
      bookId: ObjectId("64a1b2c3d4e5f6g7h8i9j0k6"),
      title: "Peer E Kamil",
      image: "/Peer_E_Kamil.jpeg",
      price: 1400,
      quantity: 1,
      subtotal: 1400,
      addedAt: ISODate("2025-12-02T14:20:00.000Z")
    }
  ],
  
  // Totals
  itemCount: 3,
  totalAmount: 5000,
  
  // Timestamps
  createdAt: ISODate("2025-11-20T08:00:00.000Z"),
  updatedAt: ISODate("2025-12-02T14:20:00.000Z")
}

// Indexes
db.cart.createIndex({ userId: 1 }, { unique: true })
db.cart.createIndex({ "items.bookId": 1 })
```

---

## 6️⃣ Orders Collection

```javascript
{
  _id: ObjectId("64a1b2c3d4e5f6g7h8i9j0k1"),
  
  // Order Info
  orderNumber: "ORD-2025-00145",           // Unique, Auto-generated
  
  // User
  userId: ObjectId("64a1b2c3d4e5f6g7h8i9j0k2"),  // Ref: users
  userEmail: "user@example.com",           // Denormalized
  userName: "Muhammad Rizwan",
  
  // Items
  items: [
    {
      bookId: ObjectId("64a1b2c3d4e5f6g7h8i9j0k3"),
      title: "Salaar Sikandar",
      image: "/SalaarSkindar.jpeg",
      author: "Rizwan",
      quantity: 2,
      price: 1800,                         // Price at time of purchase
      subtotal: 3600
    }
  ],
  
  // Pricing
  subtotal: 3600,
  shippingCost: 200,
  discount: 0,
  tax: 0,
  totalAmount: 3800,
  currency: "PKR",
  
  // Shipping Address
  shippingAddress: {
    fullName: "Muhammad Rizwan",
    phone: "+92 309 5693653",
    email: "mlkrizwan213@gmail.com",
    address: "House 123, Street 5, Block A",
    city: "Lahore",
    state: "Punjab",
    postalCode: "54000",
    country: "Pakistan"
  },
  
  // Billing Address (optional, can be same as shipping)
  billingAddress: {
    // Same structure as shippingAddress
  },
  
  // Payment
  paymentMethod: "COD",                    // "COD", "JazzCash", "EasyPaisa", "Card"
  paymentStatus: "pending",                // "pending", "paid", "failed", "refunded"
  
  // Order Status
  orderStatus: "pending",                  // "pending", "processing", "shipped", "delivered", "cancelled"
  
  // Tracking
  trackingNumber: null,
  courier: null,                           // "TCS", "Leopards", "PostEx"
  
  // Notes
  customerNote: "Please call before delivery",
  adminNote: null,
  
  // Status History
  statusHistory: [
    {
      status: "pending",
      timestamp: ISODate("2025-12-01T10:30:00.000Z"),
      note: "Order placed"
    },
    {
      status: "processing",
      timestamp: ISODate("2025-12-01T14:00:00.000Z"),
      note: "Order confirmed"
    }
  ],
  
  // Timestamps
  createdAt: ISODate("2025-12-01T10:30:00.000Z"),
  updatedAt: ISODate("2025-12-01T14:00:00.000Z"),
  paidAt: null,
  shippedAt: null,
  deliveredAt: null,
  cancelledAt: null
}

// Indexes
db.orders.createIndex({ orderNumber: 1 }, { unique: true })
db.orders.createIndex({ userId: 1 })
db.orders.createIndex({ orderStatus: 1 })
db.orders.createIndex({ paymentStatus: 1 })
db.orders.createIndex({ createdAt: -1 })
db.orders.createIndex({ "items.bookId": 1 })
```

---

## 7️⃣ Reviews Collection

```javascript
{
  _id: ObjectId("64a1b2c3d4e5f6g7h8i9j0k1"),
  
  // Book
  bookId: ObjectId("64a1b2c3d4e5f6g7h8i9j0k2"),  // Ref: books
  
  // User
  userId: ObjectId("64a1b2c3d4e5f6g7h8i9j0k3"),  // Ref: users
  userName: "Ahmad Khan",                  // Denormalized
  userPhoto: "/uploads/users/ahmad.jpg",
  
  // Review
  rating: 5,                               // 1-5
  title: "Amazing Book!",
  comment: "This is one of the best books I've read...",
  
  // Verification
  isVerified: true,                        // Only if user purchased
  isPurchased: true,
  
  // Moderation
  isApproved: true,
  isReported: false,
  reportCount: 0,
  
  // Stats
  helpfulCount: 15,                        // How many found it helpful
  
  // Timestamps
  createdAt: ISODate("2025-11-20T10:00:00.000Z"),
  updatedAt: ISODate("2025-11-20T10:00:00.000Z")
}

// Indexes
db.reviews.createIndex({ bookId: 1 })
db.reviews.createIndex({ userId: 1 })
db.reviews.createIndex({ rating: 1 })
db.reviews.createIndex({ createdAt: -1 })
db.reviews.createIndex({ bookId: 1, userId: 1 }, { unique: true })
```

---

## 8️⃣ Wishlist Collection

```javascript
{
  _id: ObjectId("64a1b2c3d4e5f6g7h8i9j0k1"),
  
  // User
  userId: ObjectId("64a1b2c3d4e5f6g7h8i9j0k2"),  // Ref: users
  
  // Books
  books: [
    {
      bookId: ObjectId("64a1b2c3d4e5f6g7h8i9j0k3"),
      addedAt: ISODate("2025-11-28T15:30:00.000Z")
    },
    {
      bookId: ObjectId("64a1b2c3d4e5f6g7h8i9j0k4"),
      addedAt: ISODate("2025-11-30T10:00:00.000Z")
    }
  ],
  
  // Timestamps
  createdAt: ISODate("2025-11-20T08:00:00.000Z"),
  updatedAt: ISODate("2025-11-30T10:00:00.000Z")
}

// Indexes
db.wishlist.createIndex({ userId: 1 }, { unique: true })
db.wishlist.createIndex({ "books.bookId": 1 })
```

---

## 9️⃣ Payments Collection

```javascript
{
  _id: ObjectId("64a1b2c3d4e5f6g7h8i9j0k1"),
  
  // Order
  orderId: ObjectId("64a1b2c3d4e5f6g7h8i9j0k2"),  // Ref: orders
  orderNumber: "ORD-2025-00145",
  
  // User
  userId: ObjectId("64a1b2c3d4e5f6g7h8i9j0k3"),  // Ref: users
  
  // Payment Details
  amount: 3800,
  currency: "PKR",
  
  // Method
  method: "JazzCash",                      // "COD", "JazzCash", "EasyPaisa", "Card"
  
  // Transaction
  transactionId: "JC-2025-12345-ABC",      // From payment gateway
  gatewayResponse: {
    // Complete response from JazzCash/EasyPaisa
    status: "SUCCESS",
    message: "Payment successful",
    // ... other gateway data
  },
  
  // Status
  status: "completed",                     // "pending", "processing", "completed", "failed", "refunded"
  
  // Refund (if applicable)
  refundAmount: 0,
  refundReason: null,
  refundedAt: null,
  
  // Timestamps
  createdAt: ISODate("2025-12-01T10:30:00.000Z"),
  updatedAt: ISODate("2025-12-01T10:31:00.000Z"),
  completedAt: ISODate("2025-12-01T10:31:00.000Z")
}

// Indexes
db.payments.createIndex({ orderId: 1 })
db.payments.createIndex({ userId: 1 })
db.payments.createIndex({ transactionId: 1 }, { unique: true })
db.payments.createIndex({ status: 1 })
db.payments.createIndex({ createdAt: -1 })
```

---

## 🔟 Settings Collection

```javascript
{
  _id: ObjectId("64a1b2c3d4e5f6g7h8i9j0k1"),
  
  // Site Info
  siteName: "Book Valley",
  tagline: "Turning Pages, Opening Minds",
  logo: "/weblogo.png",
  favicon: "/favicon.ico",
  
  // Contact
  contact: {
    email: "mlkrizwan213@gmail.com",
    phone: "+92 309 5693653",
    address: "Lahore, Punjab, Pakistan",
    supportEmail: "support@bookvalley.com"
  },
  
  // Social Media
  social: {
    facebook: "https://facebook.com/bookvalley",
    instagram: "https://instagram.com/bookvalley",
    twitter: "https://twitter.com/bookvalley",
    youtube: null
  },
  
  // About
  about: {
    title: "About Book Valley",
    description: "Your ultimate destination for novels...",
    mission: "Our mission is to...",
    vision: "Our vision is to..."
  },
  
  // Business Settings
  business: {
    currency: "PKR",
    timezone: "Asia/Karachi",
    shippingCost: 200,
    freeShippingThreshold: 3000,
    taxRate: 0,                            // 0% for books in Pakistan
    lowStockAlert: 5
  },
  
  // Payment
  payment: {
    jazzcashEnabled: true,
    easypaisaEnabled: true,
    codEnabled: true,
    cardEnabled: false
  },
  
  // Email
  email: {
    fromName: "Book Valley",
    fromEmail: "noreply@bookvalley.com",
    smtpHost: "smtp.gmail.com",
    smtpPort: 587
  },
  
  // SEO
  seo: {
    metaTitle: "Book Valley - Online Book Store",
    metaDescription: "Buy books online in Pakistan...",
    metaKeywords: "books, urdu novels, islamic books",
    googleAnalyticsId: "G-XXXXXXXXXX"
  },
  
  // Features
  features: {
    reviewsEnabled: true,
    wishlistEnabled: true,
    ratingsEnabled: true,
    socialLoginEnabled: true
  },
  
  // Timestamps
  updatedAt: ISODate("2025-12-01T10:00:00.000Z")
}

// This collection usually has only one document
```

---

## 🔐 Mongoose Schema Examples

### User Schema (users.model.js)
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide your full name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: function() {
      return this.provider === 'local';
    },
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  profilePicture: {
    type: String,
    default: '/uploads/users/default-avatar.png'
  },
  phone: String,
  provider: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    default: 'local'
  },
  providerId: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  lastLogin: Date
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### Book Schema (books.model.js)
```javascript
const mongoose = require('mongoose');
const slugify = require('slugify');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
    index: true
  },
  slug: {
    type: String,
    unique: true
  },
  author: {
    type: String,
    required: [true, 'Author name is required']
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  discountPrice: {
    type: Number,
    validate: {
      validator: function(value) {
        return !value || value < this.price;
      },
      message: 'Discount price must be less than regular price'
    }
  },
  images: [String],
  coverImage: String,
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true
  },
  publisher: String,
  publishedDate: Date,
  pages: Number,
  language: {
    type: String,
    default: 'Urdu'
  },
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  tags: [String],
  status: {
    type: String,
    enum: ['active', 'draft', 'discontinued'],
    default: 'active'
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create slug before saving
bookSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// Text search index
bookSchema.index({ title: 'text', author: 'text', description: 'text' });

module.exports = mongoose.model('Book', bookSchema);
```

---

## 📊 Data Relationships

```
Users (1) ──────────── (Many) Orders
Users (1) ──────────── (1) Cart
Users (1) ──────────── (1) Wishlist
Users (1) ──────────── (Many) Reviews

Books (Many) ────────── (1) Category
Books (Many) ────────── (1) Author
Books (1) ──────────── (Many) Reviews
Books (Many) ────────── (Many) Cart Items
Books (Many) ────────── (Many) Order Items
Books (Many) ────────── (Many) Wishlist Items

Orders (1) ──────────── (1) Payment
Orders (1) ──────────── (Many) Order Items
```

---

**Last Updated:** 2025-12-03  
**Schema Version:** 1.0
