# 🔌 Book Valley - Complete API Endpoints Reference

## Base URL: `http://localhost:3000/api`

---

## 🔐 Authentication APIs

### 1. Register New User
```http
POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "fullName": "Muhammad Rizwan",
  "email": "user@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123"
}

Response (201):
{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "data": {
    "userId": "64a1b2c3d4e5f6g7h8i9j0k1",
    "email": "user@example.com",
    "fullName": "Muhammad Rizwan",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login User
```http
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "SecurePass123"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "fullName": "Muhammad Rizwan",
      "email": "user@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Social Login (Google/Facebook)
```http
POST /api/auth/social-login
Content-Type: application/json

Request Body:
{
  "provider": "google",  // or "facebook"
  "accessToken": "ya29.a0AfH6SMB..."
}

Response (200):
{
  "success": true,
  "data": {
    "user": {...},
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 4. Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

Request Body:
{
  "email": "user@example.com"
}

Response (200):
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

### 5. Reset Password
```http
POST /api/auth/reset-password
Content-Type: application/json

Request Body:
{
  "token": "reset-token-from-email",
  "newPassword": "NewSecurePass123"
}

Response (200):
{
  "success": true,
  "message": "Password reset successful"
}
```

### 6. Verify Token
```http
GET /api/auth/verify-token
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "userId": "64a1b2c3d4e5f6g7h8i9j0k1",
    "email": "user@example.com",
    "role": "user"
  }
}
```

---

## 📚 Books APIs

### 1. Get All Books (with Filters)
```http
GET /api/books?category=novels&page=1&limit=12&sort=price&order=asc&search=salaar

Query Parameters:
- category: String (novels, islamic, story, medical, computer, educational)
- page: Number (default: 1)
- limit: Number (default: 12)
- sort: String (title, price, createdAt, rating)
- order: String (asc, desc)
- search: String (search in title, author)

Response (200):
{
  "success": true,
  "data": {
    "books": [
      {
        "id": "64a1b2c3d4e5f6g7h8i9j0k1",
        "title": "Salaar Sikandar",
        "slug": "salaar-sikandar",
        "author": "Rizwan",
        "category": "Novel Books",
        "price": 1800,
        "discountPrice": null,
        "image": "/SalaarSkindar.jpeg",
        "rating": 4.5,
        "reviewCount": 125,
        "inStock": true
      }
      // ... more books
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalBooks": 58,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### 2. Get Single Book Details
```http
GET /api/books/:slug
Example: GET /api/books/salaar-sikandar

Response (200):
{
  "success": true,
  "data": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Salaar Sikandar",
    "slug": "salaar-sikandar",
    "author": "Rizwan",
    "authorId": "64a1b2c3d4e5f6g7h8i9j0k2",
    "category": "Novel Books",
    "categoryId": "64a1b2c3d4e5f6g7h8i9j0k3",
    "price": 1800,
    "discountPrice": null,
    "images": [
      "/SalaarSkindar.jpeg",
      "/SalaarSkindar_2.jpeg"
    ],
    "description": "Detailed description of the book...",
    "isbn": "978-3-16-148410-0",
    "publisher": "Kitab Publications",
    "publishedDate": "2020-05-15T00:00:00.000Z",
    "pages": 450,
    "language": "Urdu",
    "inStock": true,
    "stockQuantity": 25,
    "rating": 4.5,
    "reviewCount": 125,
    "tags": ["romantic", "adventure", "bestseller"]
  }
}
```

### 3. Search Books
```http
GET /api/books/search?query=peer kamil&category=novels

Response (200):
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "64a1b2c3d4e5f6g7h8i9j0k1",
        "title": "Peer E Kamil",
        "author": "Umera Ahmed",
        "price": 1400,
        "image": "/Peer_E_Kamil.jpeg"
      }
      // ... more results
    ],
    "count": 1
  }
}
```

### 4. Get Related Books
```http
GET /api/books/:id/related?limit=4

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "64a1b2c3d4e5f6g7h8i9j0k2",
      "title": "Aab E Hayaat",
      "author": "Umera Ahmed",
      "price": 1900,
      "image": "/Aab_E_Hayat.jpeg"
    }
    // ... 3 more books
  ]
}
```

---

## 🗂️ Categories APIs

### 1. Get All Categories
```http
GET /api/categories

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "Novel Books",
      "slug": "novel-books",
      "description": "Imagination, Emotion, Adventure.",
      "image": "/novel3.jpg",
      "bookCount": 145,
      "displayOrder": 1
    },
    // ... more categories
  ]
}
```

### 2. Get Single Category
```http
GET /api/categories/:slug
Example: GET /api/categories/novel-books

Response (200):
{
  "success": true,
  "data": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Novel Books",
    "slug": "novel-books",
    "description": "Imagination, Emotion, Adventure.",
    "image": "/novel3.jpg",
    "bookCount": 145
  }
}
```

---

## 🛒 Shopping Cart APIs

### 1. Get User's Cart
```http
GET /api/cart
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "cartId": "64a1b2c3d4e5f6g7h8i9j0k1",
    "items": [
      {
        "id": "item-1",
        "bookId": "64a1b2c3d4e5f6g7h8i9j0k2",
        "title": "Salaar Sikandar",
        "image": "/SalaarSkindar.jpeg",
        "price": 1800,
        "quantity": 2,
        "subtotal": 3600
      }
      // ... more items
    ],
    "itemCount": 3,
    "totalAmount": 6800
  }
}
```

### 2. Add Item to Cart
```http
POST /api/cart/add
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "bookId": "64a1b2c3d4e5f6g7h8i9j0k2",
  "quantity": 1
}

Response (201):
{
  "success": true,
  "message": "Book added to cart",
  "data": {
    "cartId": "64a1b2c3d4e5f6g7h8i9j0k1",
    "itemCount": 4,
    "totalAmount": 8600
  }
}
```

### 3. Update Cart Item
```http
PUT /api/cart/update/:itemId
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "quantity": 3
}

Response (200):
{
  "success": true,
  "message": "Cart updated",
  "data": {
    "totalAmount": 10400
  }
}
```

### 4. Remove from Cart
```http
DELETE /api/cart/remove/:itemId
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Item removed from cart"
}
```

### 5. Clear Cart
```http
DELETE /api/cart/clear
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Cart cleared"
}
```

---

## 📦 Orders APIs

### 1. Create Order
```http
POST /api/orders/create
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "items": [
    {
      "bookId": "64a1b2c3d4e5f6g7h8i9j0k2",
      "quantity": 2,
      "price": 1800
    }
  ],
  "shippingAddress": {
    "fullName": "Muhammad Rizwan",
    "phone": "+92 309 5693653",
    "address": "House 123, Street 5, Block A",
    "city": "Lahore",
    "postalCode": "54000"
  },
  "paymentMethod": "COD"  // or "JazzCash", "EasyPaisa"
}

Response (201):
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "orderId": "64a1b2c3d4e5f6g7h8i9j0k1",
    "orderNumber": "ORD-2025-00145",
    "totalAmount": 3600,
    "paymentStatus": "pending",
    "orderStatus": "pending"
  }
}
```

### 2. Get User's Orders
```http
GET /api/orders?page=1&limit=10
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "orders": [
      {
        "orderId": "64a1b2c3d4e5f6g7h8i9j0k1",
        "orderNumber": "ORD-2025-00145",
        "totalAmount": 3600,
        "itemCount": 2,
        "orderStatus": "delivered",
        "paymentStatus": "paid",
        "createdAt": "2025-12-01T10:30:00.000Z"
      }
      // ... more orders
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalOrders": 25
    }
  }
}
```

### 3. Get Order Details
```http
GET /api/orders/:orderId
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "orderId": "64a1b2c3d4e5f6g7h8i9j0k1",
    "orderNumber": "ORD-2025-00145",
    "items": [
      {
        "bookId": "64a1b2c3d4e5f6g7h8i9j0k2",
        "title": "Salaar Sikandar",
        "quantity": 2,
        "price": 1800,
        "subtotal": 3600
      }
    ],
    "totalAmount": 3600,
    "shippingAddress": {
      "fullName": "Muhammad Rizwan",
      "phone": "+92 309 5693653",
      "address": "House 123, Street 5, Block A",
      "city": "Lahore",
      "postalCode": "54000"
    },
    "paymentMethod": "COD",
    "paymentStatus": "paid",
    "orderStatus": "delivered",
    "createdAt": "2025-12-01T10:30:00.000Z",
    "deliveredAt": "2025-12-05T14:20:00.000Z"
  }
}
```

---

## 👤 User Profile APIs

### 1. Get User Profile
```http
GET /api/user/profile
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "userId": "64a1b2c3d4e5f6g7h8i9j0k1",
    "fullName": "Muhammad Rizwan",
    "email": "mlkrizwan213@gmail.com",
    "profilePicture": "/uploads/profile.jpg",
    "phone": "+92 309 5693653",
    "createdAt": "2025-01-15T08:00:00.000Z"
  }
}
```

### 2. Update Profile
```http
PUT /api/user/profile
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "fullName": "Muhammad Rizwan Ali",
  "phone": "+92 309 5693654"
}

Response (200):
{
  "success": true,
  "message": "Profile updated successfully"
}
```

### 3. Change Password
```http
PUT /api/user/change-password
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "currentPassword": "OldPass123",
  "newPassword": "NewSecurePass456"
}

Response (200):
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## ❤️ Wishlist APIs

### 1. Get Wishlist
```http
GET /api/user/wishlist
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "title": "Peer E Kamil",
      "author": "Umera Ahmed",
      "price": 1400,
      "image": "/Peer_E_Kamil.jpeg",
      "addedAt": "2025-11-28T15:30:00.000Z"
    }
    // ... more books
  ]
}
```

### 2. Add to Wishlist
```http
POST /api/user/wishlist/add/:bookId
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Book added to wishlist"
}
```

### 3. Remove from Wishlist
```http
DELETE /api/user/wishlist/:bookId
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Book removed from wishlist"
}
```

---

## ⭐ Reviews APIs

### 1. Get Book Reviews
```http
GET /api/books/:bookId/reviews?page=1&limit=10

Response (200):
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "64a1b2c3d4e5f6g7h8i9j0k1",
        "userId": "64a1b2c3d4e5f6g7h8i9j0k2",
        "userName": "Ahmad Khan",
        "rating": 5,
        "comment": "Amazing book! Highly recommended.",
        "createdAt": "2025-11-20T10:00:00.000Z"
      }
      // ... more reviews
    ],
    "averageRating": 4.5,
    "totalReviews": 125
  }
}
```

### 2. Add Review
```http
POST /api/books/:bookId/reviews
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "rating": 5,
  "comment": "Excellent book! Must read."
}

Response (201):
{
  "success": true,
  "message": "Review added successfully"
}
```

---

## 🔒 Admin APIs

### 1. Admin Dashboard Stats
```http
GET /api/admin/dashboard
Authorization: Bearer <admin-token>

Response (200):
{
  "success": true,
  "data": {
    "totalUsers": 1250,
    "totalBooks": 458,
    "totalOrders": 3890,
    "totalRevenue": 1245000,
    "pendingOrders": 25,
    "recentOrders": [...],
    "topSellingBooks": [...],
    "salesGraph": [...]
  }
}
```

### 2. Create Book (Admin)
```http
POST /api/admin/books
Authorization: Bearer <admin-token>
Content-Type: multipart/form-data

Request Body (FormData):
{
  "title": "New Book Title",
  "author": "Author Name",
  "category": "Novel Books",
  "price": 2500,
  "description": "Book description...",
  "isbn": "978-3-16-148410-0",
  "stockQuantity": 50,
  "image": <file>
}

Response (201):
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "bookId": "64a1b2c3d4e5f6g7h8i9j0k1"
  }
}
```

### 3. Update Book (Admin)
```http
PUT /api/admin/books/:bookId
Authorization: Bearer <admin-token>
Content-Type: application/json

Request Body:
{
  "price": 2800,
  "stockQuantity": 45
}

Response (200):
{
  "success": true,
  "message": "Book updated successfully"
}
```

### 4. Delete Book (Admin)
```http
DELETE /api/admin/books/:bookId
Authorization: Bearer <admin-token>

Response (200):
{
  "success": true,
  "message": "Book deleted successfully"
}
```

### 5. Get All Orders (Admin)
```http
GET /api/admin/orders?status=pending&page=1&limit=20
Authorization: Bearer <admin-token>

Response (200):
{
  "success": true,
  "data": {
    "orders": [...],
    "pagination": {...}
  }
}
```

### 6. Update Order Status (Admin)
```http
PUT /api/admin/orders/:orderId/status
Authorization: Bearer <admin-token>
Content-Type: application/json

Request Body:
{
  "orderStatus": "shipped"  // pending, processing, shipped, delivered, cancelled
}

Response (200):
{
  "success": true,
  "message": "Order status updated"
}
```

---

## 💳 Payment APIs

### 1. Initiate JazzCash Payment
```http
POST /api/payment/jazzcash/initiate
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "orderId": "64a1b2c3d4e5f6g7h8i9j0k1",
  "amount": 3600
}

Response (200):
{
  "success": true,
  "data": {
    "transactionId": "JC-2025-12345",
    "redirectUrl": "https://sandbox.jazzcash.com.pk/..."
  }
}
```

### 2. JazzCash Callback
```http
POST /api/payment/jazzcash/callback
Content-Type: application/json

Request Body:
{
  "transactionId": "JC-2025-12345",
  "status": "SUCCESS",
  // ... other JazzCash response data
}

Response (200):
{
  "success": true,
  "message": "Payment verified",
  "data": {
    "orderId": "64a1b2c3d4e5f6g7h8i9j0k1",
    "paymentStatus": "paid"
  }
}
```

---

## ⚙️ Settings APIs

### 1. Get About Us Info
```http
GET /api/settings/about

Response (200):
{
  "success": true,
  "data": {
    "companyName": "Book Valley",
    "tagline": "Turning Pages, Opening Minds",
    "description": "Your ultimate destination...",
    "contact": {
      "email": "mlkrizwan213@gmail.com",
      "phone": "+92 309 5693653",
      "address": "Lahore, Pakistan"
    },
    "social": {
      "facebook": "#",
      "instagram": "#",
      "twitter": "#"
    }
  }
}
```

---

## 📊 Response Status Codes

```
200 - OK (Success)
201 - Created (Resource created)
400 - Bad Request (Invalid input)
401 - Unauthorized (Not authenticated)
403 - Forbidden (No permission)
404 - Not Found (Resource not found)
409 - Conflict (Duplicate entry)
500 - Internal Server Error
```

---

## 🔒 Authentication Headers

All protected endpoints require:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📝 Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": [
      {
        "field": "email",
        "message": "Please provide a valid email address"
      }
    ]
  }
}
```

---

**Last Updated:** 2025-12-03  
**API Version:** v1
