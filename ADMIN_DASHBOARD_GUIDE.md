# 🎛️ Admin Dashboard - Complete Guide

## ✅ Admin Features Complete!

Tumhara complete admin dashboard ban gaya hai with all management features!

---

## 🔐 Admin Login Credentials

After running `npm run prisma:seed`:

```
Email: admin@bookvalley.com
Password: admin123
```

---

## 📊 Admin Dashboard APIs

### **1. Dashboard Stats**
```
GET /api/admin/dashboard
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalUsers": 150,
      "totalBooks": 458,
      "totalOrders": 3890,
      "totalRevenue": 1245000,
      "pendingOrders": 25
    },
    "recentOrders": [...],
    "topBooks": [...],
    "lowStockBooks": [...],
    "salesGraph": [...]
  }
}
```

---

## 📦 Orders Management

### **Get All Orders**
```
GET /api/admin/orders?status=pending&page=1&limit=20
Authorization: Bearer <admin-token>
```

**Query Parameters:**
- `status` - Filter by: pending, processing, shipped, delivered, cancelled
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)

### **Update Order Status**
```
PUT /api/admin/orders/[orderId]
Authorization: Bearer <admin-token>

Body:
{
  "orderStatus": "shipped",
  "trackingNumber": "TCS-12345"
}
```

**Order Status Options:**
- `pending` - Order placed
- `processing` - Being prepared
- `shipped` - On the way
- `delivered` - Completed
- `cancelled` - Cancelled

### **Delete Order**
```
DELETE /api/admin/orders/[orderId]
Authorization: Bearer <admin-token>
```

---

## 📚 Books Management

### **Get All Books (Admin)**
```
GET /api/admin/books?page=1&limit=20
Authorization: Bearer <admin-token>
```

### **Create New Book**
```
POST /api/admin/books
Authorization: Bearer <admin-token>

Body:
{
  "title": "New Book Title",
  "author": "Author Name",
  "category": "Novel Books",
  "categoryId": "category-id-here",
  "price": 2500,
  "discountPrice": 2200,
  "images": ["/book-image.jpg"],
  "coverImage": "/book-image.jpg",
  "description": "Book description...",
  "isbn": "978-3-16-148410-0",
  "publisher": "Publisher Name",
  "pages": 450,
  "language": "Urdu",
  "stockQuantity": 100,
  "tags": ["urdu", "novel", "romance"],
  "featured": true
}
```

### **Update Book**
```
PUT /api/admin/books/[bookId]
Authorization: Bearer <admin-token>

Body:
{
  "price": 2800,
  "stockQuantity": 45,
  "inStock": true
}
```

### **Delete Book**
```
DELETE /api/admin/books/[bookId]
Authorization: Bearer <admin-token>
```

---

## 👥 Users Management

### **Get All Users**
```
GET /api/admin/users?page=1&limit=20&search=rizwan
Authorization: Bearer <admin-token>
```

**Query Parameters:**
- `page` - Page number
- `limit` - Items per page
- `search` - Search by name or email

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user-id",
        "fullName": "Muhammad Rizwan",
        "email": "user@example.com",
        "phone": "+92 309 5693653",
        "role": "user",
        "isActive": true,
        "isVerified": true,
        "provider": "local",
        "lastLogin": "2025-12-03T10:30:00.000Z",
        "createdAt": "2025-01-15T08:00:00.000Z",
        "totalOrders": 5
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 8,
      "totalUsers": 150
    }
  }
}
```

---

## 🗂️ Categories Management

### **Get All Categories (Admin)**
```
GET /api/admin/categories
Authorization: Bearer <admin-token>
```

### **Create New Category**
```
POST /api/admin/categories
Authorization: Bearer <admin-token>

Body:
{
  "name": "Poetry Books",
  "description": "Beautiful poetry collection",
  "image": "/poetry.jpg",
  "displayOrder": 7,
  "isActive": true
}
```

---

## 📈 Analytics & Reports

### **Get Analytics Data**
```
GET /api/admin/analytics?days=30
Authorization: Bearer <admin-token>
```

**Query Parameters:**
- `days` - Number of days (default: 30)

**Response:**
```json
{
  "success": true,
  "data": {
    "salesByDay": [
      {
        "date": "2025-12-01",
        "orders": 15,
        "revenue": 45000
      }
    ],
    "topSellingBooks": [
      {
        "bookId": "book-id",
        "title": "Peer E Kamil",
        "totalSold": 150,
        "orderCount": 120
      }
    ],
    "ordersByStatus": [
      { "status": "pending", "count": 25 },
      { "status": "delivered", "count": 3500 }
    ],
    "newUsersCount": 45
  }
}
```

---

## 🎯 Admin Dashboard Features

### **Dashboard Overview:**
- ✅ Total Users Count
- ✅ Total Books Count
- ✅ Total Orders Count
- ✅ Total Revenue (PKR)
- ✅ Pending Orders Count
- ✅ Recent Orders List (Last 10)
- ✅ Top Selling Books (Top 5)
- ✅ Low Stock Alert (Books with ≤10 stock)
- ✅ Sales Graph (Last 7 days)

### **Orders Management:**
- ✅ View All Orders
- ✅ Filter by Status
- ✅ Update Order Status
- ✅ Add Tracking Number
- ✅ View Customer Details
- ✅ View Order Items
- ✅ Delete Orders

### **Books Management:**
- ✅ View All Books
- ✅ Add New Book
- ✅ Edit Book Details
- ✅ Update Stock
- ✅ Delete Book
- ✅ Mark as Featured
- ✅ Set Discount Price

### **Users Management:**
- ✅ View All Users
- ✅ Search Users
- ✅ View User Orders
- ✅ Check Last Login
- ✅ See Registration Date

### **Categories Management:**
- ✅ View All Categories
- ✅ Add New Category
- ✅ See Book Count per Category
- ✅ Reorder Categories

### **Analytics:**
- ✅ Sales by Day Graph
- ✅ Top Selling Books
- ✅ Orders by Status
- ✅ New Users Count
- ✅ Revenue Tracking

---

## 🧪 Testing Admin APIs

### **Step 1: Login as Admin**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@bookvalley.com",
    "password": "admin123"
  }'
```

**Copy the token from response**

### **Step 2: Get Dashboard Stats**
```bash
curl http://localhost:3000/api/admin/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### **Step 3: Get All Orders**
```bash
curl http://localhost:3000/api/admin/orders \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### **Step 4: Get All Users**
```bash
curl http://localhost:3000/api/admin/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📁 Admin API Structure

```
src/app/api/admin/
├── dashboard/
│   └── route.js          ← Dashboard stats & overview
├── orders/
│   ├── route.js          ← List all orders
│   └── [id]/
│       └── route.js      ← Update/Delete order
├── books/
│   ├── route.js          ← List/Create books
│   └── [id]/
│       └── route.js      ← Update/Delete book
├── users/
│   └── route.js          ← List all users
├── categories/
│   └── route.js          ← List/Create categories
└── analytics/
    └── route.js          ← Analytics & reports
```

---

## 🔒 Security Features

1. **JWT Authentication** - All admin routes protected
2. **Role-Based Access** - Only users with `role: 'admin'` can access
3. **Token Verification** - Every request validates JWT token
4. **Unauthorized Response** - Returns 403 for non-admin users

---

## 📊 Dashboard Metrics

### **Key Performance Indicators (KPIs):**
- Total Revenue (PKR)
- Total Orders
- Total Users
- Total Books
- Pending Orders
- Average Order Value
- Top Selling Books
- Low Stock Alerts

### **Charts & Graphs:**
- Sales Trend (Last 7 days)
- Orders by Status (Pie Chart)
- Revenue by Category
- New Users Growth

---

## 🚀 Next Steps for Frontend

### **Create Admin Dashboard Pages:**

1. **Dashboard Page** (`/admin/dashboard`)
   - Display stats cards
   - Show recent orders
   - Sales graph
   - Low stock alerts

2. **Orders Page** (`/admin/orders`)
   - Orders table with filters
   - Update status modal
   - View order details

3. **Books Page** (`/admin/books`)
   - Books table
   - Add/Edit book form
   - Stock management

4. **Users Page** (`/admin/users`)
   - Users table
   - Search functionality
   - User details view

5. **Analytics Page** (`/admin/analytics`)
   - Charts and graphs
   - Sales reports
   - Export data

---

## 💡 Usage Example (Frontend)

```javascript
// Login as Admin
const loginAdmin = async () => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@bookvalley.com',
      password: 'admin123'
    })
  })
  const data = await response.json()
  localStorage.setItem('token', data.data.token)
}

// Get Dashboard Stats
const getDashboard = async () => {
  const token = localStorage.getItem('token')
  const response = await fetch('/api/admin/dashboard', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  const data = await response.json()
  console.log(data.data.stats)
}

// Update Order Status
const updateOrder = async (orderId, status) => {
  const token = localStorage.getItem('token')
  await fetch(`/api/admin/orders/${orderId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ orderStatus: status })
  })
}
```

---

## ⚠️ Important Notes

1. **Admin Account Created** - Email: admin@bookvalley.com, Password: admin123
2. **Change Password** - Change admin password in production
3. **Role Check** - All admin APIs check for `role: 'admin'`
4. **Token Required** - Must include Bearer token in Authorization header
5. **Seed Database** - Run `npm run prisma:seed` to create admin user

---

## 📞 Support

**Developer:** Muhammad Rizwan  
**Email:** mlkrizwan213@gmail.com  
**Phone:** +92 309 5693653

---

**Admin Dashboard Status:** ✅ COMPLETE  
**Total Admin APIs:** 8 endpoints  
**Last Updated:** 2025-12-03
