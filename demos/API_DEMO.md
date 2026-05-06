# 🔗 WTWR API Demo & Usage Guide

Complete walkthrough of all API endpoints with example requests, responses, and curl commands.

---

## 🚀 Quick Start

### Start the Server
```bash
npm run dev
```

**Expected Output:**
```
Connected to the Database
Server is running on port 3001
```

### Test with cURL
```bash
curl http://localhost:3001/items
```

---

## 🔐 Authentication Flow

### 1. Sign Up - Create New User

**Endpoint:** `POST /signup`

```bash
curl -X POST http://localhost:3001/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-05-05T10:30:00.000Z",
  "updatedAt": "2024-05-05T10:30:00.000Z"
}
```

**Postman Setup:**
- Method: `POST`
- URL: `{{baseUrl}}/signup`
- Body (raw JSON):
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }
  ```

---

### 2. Sign In - Get JWT Token

**Endpoint:** `POST /signin`

```bash
curl -X POST http://localhost:3001/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJpYXQiOjE3MTQ5MjAyMDB9.signature_here"
}
```

**⚠️ Important:** Save this token! You'll need it for protected endpoints.

**Postman Setup:**
- Method: `POST`
- URL: `{{baseUrl}}/signin`
- Body (raw JSON):
  ```json
  {
    "email": "john@example.com",
    "password": "SecurePass123!"
  }
  ```
- Copy the token to use in next requests

---

## 👤 User Endpoints (Protected 🔒)

All user endpoints require the JWT token in the `Authorization` header:

```
Authorization: Bearer {your_jwt_token_here}
```

### 3. Get Current User Profile

**Endpoint:** `GET /users/me` (Protected 🔒)

```bash
TOKEN="your_jwt_token_here"

curl -X GET http://localhost:3001/users/me \
  -H "Authorization: Bearer $TOKEN"
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": "https://example.com/avatar.jpg",
  "createdAt": "2024-05-05T10:30:00.000Z",
  "updatedAt": "2024-05-05T10:30:00.000Z"
}
```

**Postman Setup:**
- Method: `GET`
- URL: `{{baseUrl}}/users/me`
- Headers:
  - Key: `Authorization`
  - Value: `Bearer {{token}}`

---

### 4. Update Current User Profile

**Endpoint:** `PATCH /users/me` (Protected 🔒)

```bash
TOKEN="your_jwt_token_here"

curl -X PATCH http://localhost:3001/users/me \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "avatar": "https://example.com/new-avatar.jpg"
  }'
```

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "avatar": "https://example.com/new-avatar.jpg",
  "createdAt": "2024-05-05T10:30:00.000Z",
  "updatedAt": "2024-05-05T10:35:00.000Z"
}
```

**Postman Setup:**
- Method: `PATCH`
- URL: `{{baseUrl}}/users/me`
- Headers:
  - Key: `Authorization`
  - Value: `Bearer {{token}}`
- Body (raw JSON):
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
  ```

---

## 👕 Clothing Items Endpoints

### 5. Get All Clothing Items (Public ✅)

**Endpoint:** `GET /items`

```bash
curl http://localhost:3001/items
```

**Query Parameters (Optional):**
```bash
# Filter by weather
curl "http://localhost:3001/items?weather=cold"

# Filter by season
curl "http://localhost:3001/items?season=winter"

# Pagination
curl "http://localhost:3001/items?page=1&limit=10"
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Winter Jacket",
    "imageUrl": "https://example.com/jacket.jpg",
    "weather": "cold",
    "season": "winter",
    "owner": "507f1f77bcf86cd799439011",
    "likes": ["507f1f77bcf86cd799439010"],
    "createdAt": "2024-05-05T11:00:00.000Z",
    "updatedAt": "2024-05-05T11:00:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Summer T-Shirt",
    "imageUrl": "https://example.com/tshirt.jpg",
    "weather": "warm",
    "season": "summer",
    "owner": "507f1f77bcf86cd799439011",
    "likes": [],
    "createdAt": "2024-05-05T11:05:00.000Z",
    "updatedAt": "2024-05-05T11:05:00.000Z"
  }
]
```

**Postman Setup:**
- Method: `GET`
- URL: `{{baseUrl}}/items`
- No authentication required

---

### 6. Create Clothing Item (Protected 🔒)

**Endpoint:** `POST /items`

```bash
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:3001/items \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Leather Boots",
    "imageUrl": "https://example.com/boots.jpg",
    "weather": "cold",
    "season": "winter"
  }'
```

**Request Body:**
```json
{
  "name": "Leather Boots",
  "imageUrl": "https://example.com/boots.jpg",
  "weather": "cold",
  "season": "winter"
}
```

**Valid Weather Values:**
- `hot`
- `warm`
- `cold`

**Valid Season Values:**
- `spring`
- `summer`
- `autumn`
- `winter`

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "name": "Leather Boots",
  "imageUrl": "https://example.com/boots.jpg",
  "weather": "cold",
  "season": "winter",
  "owner": "507f1f77bcf86cd799439011",
  "likes": [],
  "createdAt": "2024-05-05T12:00:00.000Z",
  "updatedAt": "2024-05-05T12:00:00.000Z"
}
```

**Postman Setup:**
- Method: `POST`
- URL: `{{baseUrl}}/items`
- Headers:
  - Key: `Authorization`
  - Value: `Bearer {{token}}`
- Body (raw JSON):
  ```json
  {
    "name": "Leather Boots",
    "imageUrl": "https://example.com/boots.jpg",
    "weather": "cold",
    "season": "winter"
  }
  ```

---

### 7. Delete Clothing Item (Protected 🔒)

**Endpoint:** `DELETE /items/:itemId`

```bash
TOKEN="your_jwt_token_here"
ITEM_ID="507f1f77bcf86cd799439014"

curl -X DELETE http://localhost:3001/items/$ITEM_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Response (200 OK):**
```json
{
  "message": "Item deleted successfully"
}
```

**Error Response (404 - Item not found):**
```json
{
  "message": "Item not found"
}
```

**Error Response (403 - Not owner):**
```json
{
  "message": "You can only delete items you created"
}
```

**Postman Setup:**
- Method: `DELETE`
- URL: `{{baseUrl}}/items/{{itemId}}`
- Headers:
  - Key: `Authorization`
  - Value: `Bearer {{token}}`

---

### 8. Like an Item (Protected 🔒)

**Endpoint:** `PUT /items/:itemId/likes`

```bash
TOKEN="your_jwt_token_here"
ITEM_ID="507f1f77bcf86cd799439012"

curl -X PUT http://localhost:3001/items/$ITEM_ID/likes \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

**Request Body:** (Empty)
```json
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Winter Jacket",
  "imageUrl": "https://example.com/jacket.jpg",
  "weather": "cold",
  "season": "winter",
  "owner": "507f1f77bcf86cd799439011",
  "likes": ["507f1f77bcf86cd799439011"],
  "createdAt": "2024-05-05T11:00:00.000Z",
  "updatedAt": "2024-05-05T12:15:00.000Z"
}
```

**Note:** If you like an item twice, it won't add duplicate likes (idempotent).

**Postman Setup:**
- Method: `PUT`
- URL: `{{baseUrl}}/items/{{itemId}}/likes`
- Headers:
  - Key: `Authorization`
  - Value: `Bearer {{token}}`

---

### 9. Unlike an Item (Protected 🔒)

**Endpoint:** `DELETE /items/:itemId/likes`

```bash
TOKEN="your_jwt_token_here"
ITEM_ID="507f1f77bcf86cd799439012"

curl -X DELETE http://localhost:3001/items/$ITEM_ID/likes \
  -H "Authorization: Bearer $TOKEN"
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Winter Jacket",
  "imageUrl": "https://example.com/jacket.jpg",
  "weather": "cold",
  "season": "winter",
  "owner": "507f1f77bcf86cd799439011",
  "likes": [],
  "createdAt": "2024-05-05T11:00:00.000Z",
  "updatedAt": "2024-05-05T12:20:00.000Z"
}
```

**Postman Setup:**
- Method: `DELETE`
- URL: `{{baseUrl}}/items/{{itemId}}/likes`
- Headers:
  - Key: `Authorization`
  - Value: `Bearer {{token}}`

---

## ❌ Error Responses

### 400 - Bad Request

```json
{
  "message": "Invalid email format"
}
```

**Common causes:**
- Missing required fields
- Invalid data format
- Invalid email address
- Password too short

---

### 401 - Unauthorized

```json
{
  "message": "No authorization token provided"
}
```

**Or:**

```json
{
  "message": "Invalid token"
}
```

**Common causes:**
- Missing `Authorization` header
- Expired token
- Malformed token

---

### 404 - Not Found

```json
{
  "message": "Requested resource not found"
}
```

**Common causes:**
- Item doesn't exist
- User doesn't exist
- Invalid endpoint

---

### 409 - Conflict

```json
{
  "message": "Email already in use"
}
```

**Common causes:**
- Email already registered
- Duplicate constraint violation

---

### 500 - Server Error

```json
{
  "message": "Server error"
}
```

**Common causes:**
- Database connection failure
- Unexpected error in processing

---

## 🧪 Complete User Workflow Test

Follow this sequence to test the full system:

### Step 1: Sign Up
```bash
curl -X POST http://localhost:3001/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
```

### Step 2: Sign In
```bash
curl -X POST http://localhost:3001/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
# Save the token from response
```

### Step 3: Create Item
```bash
# Replace TOKEN with actual token
curl -X POST http://localhost:3001/items \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Favorite Jacket",
    "imageUrl": "https://example.com/jacket.jpg",
    "weather": "cold",
    "season": "winter"
  }'
# Save the _id from response
```

### Step 4: Browse Items
```bash
curl http://localhost:3001/items
```

### Step 5: Like Item
```bash
# Replace TOKEN and ITEM_ID
curl -X PUT http://localhost:3001/items/ITEM_ID/likes \
  -H "Authorization: Bearer TOKEN"
```

### Step 6: Get Profile
```bash
# Replace TOKEN
curl http://localhost:3001/users/me \
  -H "Authorization: Bearer TOKEN"
```

### Step 7: Update Profile
```bash
# Replace TOKEN
curl -X PATCH http://localhost:3001/users/me \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name"
  }'
```

---

## 📝 Postman Variable Setup

### Create Collection Variables

In Postman, set up these variables for easy testing:

| Variable | Initial Value | Current Value |
|----------|---|---|
| `baseUrl` | `http://localhost:3001` | — |
| `token` | — | *Set after signin* |
| `userId` | — | *Your user ID* |
| `itemId` | — | *Item ID to test* |

### Set Token Variable Automatically

In the **Sign In** request's **Tests** tab, add:
```javascript
if (pm.response.code === 200) {
  pm.environment.set("token", pm.response.json().token);
}
```

---

## 🔒 Security Notes

⚠️ **Important:**
- Never share your JWT token
- Tokens expire (use refresh if implemented)
- Always use HTTPS in production
- Store tokens securely in frontend (httpOnly cookies recommended)
- Don't commit `.env` files to git

---

## 📊 Performance Testing

### Load Testing (Optional)

Using Apache Bench:
```bash
# Test GET /items endpoint
ab -n 100 -c 10 http://localhost:3001/items
```

### Response Time Tracking

Monitor in Postman:
- Response time visible in request history
- Slower responses may indicate database issues

---

## ✅ Testing Checklist

- [ ] Sign up works
- [ ] Sign in returns valid token
- [ ] Get current user works with token
- [ ] Update user profile works
- [ ] Create clothing item works
- [ ] Get all items works (public)
- [ ] Like item works
- [ ] Unlike item works
- [ ] Delete item works (only own items)
- [ ] Error responses are clear and helpful

---

**Happy Testing!** 🎉
