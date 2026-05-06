# WTWR API Quick Reference Card

## 🚀 Quick Start

```bash
# Start server
npm run dev

# Server runs on http://localhost:3001
```

---

## 🔐 Authentication

### Sign Up
```bash
POST /signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

### Sign In
```bash
POST /signin
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
Response: { "token": "eyJhbGc..." }
```

---

## 📋 Using Token

Add to all protected endpoints:
```
Authorization: Bearer {token_from_signin}
```

---

## 👕 Clothing Items

### Get All Items (Public)
```bash
GET /items
```

### Create Item (Protected)
```bash
POST /items
Authorization: Bearer {token}
{
  "name": "Winter Jacket",
  "imageUrl": "https://...",
  "weather": "cold|warm|hot",
  "season": "spring|summer|autumn|winter"
}
```

### Delete Item (Protected)
```bash
DELETE /items/{itemId}
Authorization: Bearer {token}
```

### Like Item (Protected)
```bash
PUT /items/{itemId}/likes
Authorization: Bearer {token}
```

### Unlike Item (Protected)
```bash
DELETE /items/{itemId}/likes
Authorization: Bearer {token}
```

---

## 👤 User Profile

### Get Profile (Protected)
```bash
GET /users/me
Authorization: Bearer {token}
```

### Update Profile (Protected)
```bash
PATCH /users/me
Authorization: Bearer {token}
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

---

## ✅ Response Codes

| Code | Meaning |
|------|---------|
| 200 | ✅ Success |
| 201 | ✅ Created |
| 400 | ❌ Bad Request |
| 401 | 🔒 Unauthorized |
| 404 | ❌ Not Found |
| 409 | ⚠️ Conflict |
| 500 | 💥 Server Error |

---

## 🛠 Quick cURL Examples

```bash
# Get all items
curl http://localhost:3001/items

# Sign up
curl -X POST http://localhost:3001/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123"}'

# Get profile (with token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3001/users/me

# Like item
curl -X PUT \
  -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3001/items/ITEM_ID/likes
```

---

## 📚 Full Docs

See [API_DEMO.md](./API_DEMO.md) for complete endpoint documentation.
