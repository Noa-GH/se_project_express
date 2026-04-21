# WTWR (What to Wear?) — Backend API

## 📌 Overview

WTWR is a RESTful backend service that powers a weather-based clothing recommendation application.
It provides endpoints for managing users and clothing items, including functionality for liking items based on weather conditions.

Built with scalability and clean architecture in mind, this API follows REST principles and enforces data integrity through schema validation.

---

## 🧠 Core Features

* User creation and retrieval
* Clothing item management (CRUD)
* Like / unlike functionality
* Centralized error handling
* Schema validation with Mongoose
* Modular MVC-style architecture

---

## ⚙️ Tech Stack

* **Node.js** — runtime environment
* **Express.js** — server framework
* **MongoDB** — NoSQL database
* **Mongoose** — ODM + schema validation
* **ESLint (Airbnb config)** — code quality and consistency

---

## 🔐 Environment Configuration

Create a `.env` file in the root directory:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/wtwr_db
NODE_ENV=development
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the server

```bash
npm run dev
```

### 3. Production mode

```bash
npm start
```

---

## 🔗 API Reference

### Users

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/users`         | Retrieve all users  |
| GET    | `/users/:userId` | Retrieve user by ID |
| POST   | `/users`         | Create a new user   |

---

### Clothing Items

| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| GET    | `/items`         | Retrieve all items |
| POST   | `/items`         | Create a new item  |
| DELETE | `/items/:itemId` | Delete an item     |

---

### Likes

| Method | Endpoint               | Description    |
| ------ | ---------------------- | -------------- |
| PUT    | `/items/:itemId/likes` | Like an item   |
| DELETE | `/items/:itemId/likes` | Unlike an item |

---

## 🧱 Project Structure

```bash
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
