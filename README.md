# 👕 WTWR (What to Wear?) — Backend API

A production-ready Node.js/Express REST API for the WTWR application—a weather-aware clothing recommendation system. Built with modular architecture, robust error handling, and MongoDB integration.

**GitHub:** [Noa-GH/se_project_express](https://github.com/Noa-GH/se_project_express)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [Error Handling](#-error-handling)
- [Contributing](#-contributing)

---

## 🎯 Overview

WTWR is a RESTful backend service that powers a weather-based clothing recommendation platform. Users can:

- **Create & manage accounts** with secure authentication
- **Browse clothing items** filtered by weather conditions
- **Like/save favorite items** for quick access
- **Build personalized wardrobes** based on climate preferences

Built with scalability and clean architecture in mind, this API enforces strict data validation, implements proper error handling, and follows REST best practices.

> **Use Case:** Perfect for weather-aware fashion apps, seasonal wardrobe planning, and climate-adapted shopping assistants.

---

## ✨ Features

### Core Functionality
- ✅ **User Management** — Sign up, sign in, retrieve profile, update profile
- ✅ **Clothing Item CRUD** — Create, read, and delete clothing items
- ✅ **Like System** — Mark items as favorites with persistent storage
- ✅ **JWT Authentication** — Secure endpoint protection with token-based auth
- ✅ **Data Validation** — Schema enforcement with Mongoose
- ✅ **Error Handling** — Centralized, standardized error responses
- ✅ **CORS Support** — Cross-origin request handling

### Architecture
- ✅ **MVC Pattern** — Clear separation of concerns (Models, Controllers, Routes)
- ✅ **Middleware Pipeline** — Auth, error handling, and request logging
- ✅ **Modular Routes** — Organized endpoint management
- ✅ **Environment Config** — Flexible configuration via `.env`

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js v5 |
| **Database** | MongoDB |
| **ODM** | Mongoose v8 |
| **Authentication** | JWT + bcryptjs |
| **Validation** | Mongoose schemas + Validator.js |
| **Linting** | ESLint (Airbnb config) |
| **Code Formatting** | Prettier |
| **Dev Tools** | Nodemon |
| **CORS** | Built-in CORS middleware |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ ([Download](https://nodejs.org))
- **MongoDB** v5+ (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **npm** or **yarn** package manager

### 1️⃣ Clone & Install

```bash
git clone https://github.com/Noa-GH/se_project_express.git
cd se_project_express
npm install
```

### 2️⃣ Configure Environment

Create a `.env` file in the root directory:

```env
PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/wtwr_db
NODE_ENV=development
```

**Environment Variables:**
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server listening port | 3001 |
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/wtwr_db` |
| `NODE_ENV` | Runtime environment | development |

### 3️⃣ Start the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

**Lint code**:
```bash
npm run lint
```

The server will start and connect to MongoDB. You should see:
```
Connected to the Database
Server is running on port 3001
```

---

## 📡 API Reference

### Authentication Endpoints

#### Sign Up
```http
POST /signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

#### Sign In
```http
POST /signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### User Endpoints (Protected 🔒)

#### Get Current User
```http
GET /users/me
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

#### Update Current User
```http
PATCH /users/me
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Response (200):** Updated user object

---

### Clothing Items Endpoints

#### Get All Items
```http
GET /items
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Winter Jacket",
    "imageUrl": "https://...",
    "weather": "cold",
    "season": "winter",
    "owner": "507f1f77bcf86cd799439011",
    "likes": ["507f1f77bcf86cd799439010"]
  }
]
```

---

#### Create Clothing Item (Protected 🔒)
```http
POST /items
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Summer T-Shirt",
  "imageUrl": "https://example.com/tshirt.jpg",
  "weather": "warm",
  "season": "summer"
}
```

**Response (201):** Created item object

---

#### Delete Clothing Item (Protected 🔒)
```http
DELETE /items/:itemId
Authorization: Bearer {token}
```

**Response (200):**
```json
{ "message": "Item deleted successfully" }
```

---

#### Like Item (Protected 🔒)
```http
PUT /items/:itemId/likes
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Winter Jacket",
  "likes": ["507f1f77bcf86cd799439011"]
}
```

---

#### Unlike Item (Protected 🔒)
```http
DELETE /items/:itemId/likes
Authorization: Bearer {token}
```

**Response (200):** Updated item object with removed like

---

## 🏗 Project Structure

```
se_project_express/
├── 📄 app.js                      # Express app entry point
├── 📄 package.json                # Project metadata & dependencies
├── 📄 .env                        # Environment variables (create this)
├── 📄 README.md                   # This file
├── 📄 sprint.txt                  # Project sprint notes
│
├── 📁 controllers/                # Business logic
│   ├── clothingItems.js           # Item CRUD handlers
│   └── users.js                   # Auth & user handlers
│
├── 📁 models/                     # Database schemas
│   ├── clothingItem.model.js      # Clothing item schema
│   └── user.model.js              # User schema with validation
│
├── 📁 routes/                     # API route definitions
│   ├── index.js                   # Main router
│   ├── users.js                   # User routes
│   └── clothingItems.js           # Item routes
│
├── 📁 middlewares/                # Custom middleware
│   └── auth.js                    # JWT authentication
│
├── 📁 utils/                      # Utility functions
│   ├── config.js                  # Configuration helpers
│   └── errors.js                  # Error codes & messages
│
└── 📁 demos/                      # Demo screenshots & guides
    ├── API_DEMO.md                # API usage examples
    └── SCREENSHOTS.md             # Feature screenshots guide
```

---

## 🎨 Architecture

### Request Flow Diagram

```
HTTP Request
    ↓
[Express Middleware] (CORS, JSON parsing)
    ↓
[Routes] (Route matching)
    ↓
[Auth Middleware] (JWT verification, if protected)
    ↓
[Controllers] (Business logic)
    ↓
[Models] (Database operations)
    ↓
[MongoDB] (Persistent storage)
    ↓
HTTP Response
```

### MVC Pattern

- **Models** (`/models`) — Define data schemas and validation rules
- **Controllers** (`/controllers`) — Handle request processing and business logic
- **Routes** (`/routes`) — Define API endpoints and map to controllers
- **Middleware** (`/middlewares`) — Auth, error handling, request preprocessing

---

## ⚠️ Error Handling

The API returns standardized error responses:

```json
{
  "message": "Error description",
  "statusCode": 400
}
```

### Common Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | ✅ Success | Successful item fetch |
| 201 | ✅ Created | User/item successfully created |
| 400 | ❌ Bad Request | Invalid input data |
| 401 | 🔒 Unauthorized | Missing/invalid token |
| 404 | ❌ Not Found | Item/user doesn't exist |
| 409 | ⚠️ Conflict | Duplicate email on signup |
| 500 | 💥 Server Error | Unexpected error |

---

## 🔒 Authentication Flow

1. **Sign Up** → User creates account → Server generates JWT
2. **Sign In** → User logs in → Server returns JWT token
3. **Protected Routes** → Client includes `Authorization: Bearer {token}`
4. **Auth Middleware** → Verifies token → Extracts user ID
5. **Controller Logic** → Uses user ID from token

**Example Header:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🐛 Debugging

### Enable Verbose Logging

```bash
DEBUG=* npm run dev
```

### Check MongoDB Connection

```bash
mongosh "mongodb://127.0.0.1:27017/wtwr_db"
```

### Test Endpoints with cURL

```bash
# Get all items
curl http://localhost:3001/items

# Sign up
curl -X POST http://localhost:3001/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123"}'
```

---

## 📸 Demo Features

### Visual Walkthroughs

See [SCREENSHOTS.md](./demos/SCREENSHOTS.md) for:
- **API Request/Response Examples** with screenshots
- **Authentication Flow** diagram
- **Feature Demonstrations**

### Quick Start Video Steps

1. **Sign Up** → POST `/signup` with name, email, password
2. **Get Token** → POST `/signin` to receive JWT
3. **Create Items** → POST `/items` with authentication
4. **Browse Items** → GET `/items` (public endpoint)
5. **Like Items** → PUT `/items/:itemId/likes` with authentication

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style

Run ESLint before committing:
```bash
npm run lint
```

---

## 📝 License

This project is licensed under the **ISC License** — see [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**Noah Ford** — [GitHub Profile](https://github.com/Noa-GH)

---

## 📞 Support

- **Issues:** [Report a bug](https://github.com/Noa-GH/se_project_express/issues)
- **Discussions:** [Ask a question](https://github.com/Noa-GH/se_project_express/discussions)

---

**Last updated:** May 2026 | Made with ❤️ for the WTWR project
.
├── controllers   # Request handlers
├── models        # Mongoose schemas
├── routes        # API route definitions
├── middlewares   # Error handling & validation
├── utils         # Helper functions
```

---

## ⚠️ Error Handling

The API uses centralized error handling middleware to ensure consistent responses.

Typical response format:

```json
{
  "message": "Error description"
}
```

---

## 🧪 Future Improvements

* Authentication & authorization (JWT)
* Input validation with Celebrate/Joi
* Rate limiting & security middleware
* Logging (Winston / Morgan)
* Docker containerization

---

## 📈 Why This Project Matters

This backend demonstrates real-world API design patterns, including:

* Separation of concerns
* Scalable folder structure
* Data validation and integrity
* RESTful resource modeling

---

## 📝 License

MIT
