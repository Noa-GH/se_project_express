# 🏛️ WTWR Architecture & Data Flow

Complete visual guide to the WTWR system architecture, data flow, and component relationships.

---

## 🔄 Complete System Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT APPLICATION                          │
│              (Mobile/Web Frontend - Not in Repo)                │
│                                                                 │
│  User: "I want to browse winter clothes and like my favorites"  │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     │ HTTPS/REST API Calls
                     │
                     ↓
┌──────────────────────────────────────────────────────────────────┐
│                   EXPRESS SERVER (app.js)                        │
│                   PORT: 3001                                     │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ MIDDLEWARE PIPELINE                                         │ │
│  │ 1. CORS Support (cross-origin requests)                     │ │
│  │ 2. JSON Parser (req.body parsing)                           │ │
│  │ 3. Mock User Middleware (temp: req.user._id)                │ │
│  │ 4. JWT Auth (for protected routes)                          │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ ROUTES (routes/index.js)                                    │ │
│  │                                                             │ │
│  │  Public Routes:                                             │ │
│  │  ├─ POST /signup    → users.createUser()                    │ │
│  │  ├─ POST /signin    → users.login()                         │ │
│  │  └─ GET  /items    → clothingItems.getClothingItems()       │ │
│  │                                                             │ │
│  │  Protected Routes (require JWT token):                      │ │
│  │  ├─ GET  /users/me          → users.getCurrentUser()        │ │
│  │  ├─ PATCH /users/me         → users.updateCurrentUser()     │ │
│  │  ├─ POST  /items            → clothingItems.create...()     │ │
│  │  ├─ DELETE /items/:itemId   → clothingItems.delete...()     │ │
│  │  ├─ PUT  /items/:itemId/likes   → clothingItems.like...()   │ │
│  │  └─ DELETE /items/:itemId/likes → clothingItems.dislike()   │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ CONTROLLERS (Business Logic)                                │ │
│  │                                                             │ │
│  │ users.js:                                                   │ │
│  │  • Hash password with bcryptjs                              │ │
│  │  • Create JWT token on signin                               │ │
│  │  • Validate email/password format                           │ │
│  │  • Handle user CRUD operations                              │ │
│  │                                                             │ │
│  │ clothingItems.js:                                           │ │
│  │  • Validate item data (name, weather, season)               │ │
│  │  • Manage likes array (add/remove user ID)                  │ │
│  │  • Filter by weather/season (optional)                      │ │
│  │  • Check ownership before delete                            │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
└────────────────────┬─────────────────────────────────────────────┘
                     │
                     │ Mongoose ODM (Object-Document Mapper)
                     │ Schema validation & type checking
                     │
                     ↓
┌──────────────────────────────────────────────────────────────────┐
│                    MONGOOSE (models/)                            │
│                    Schema Validation Layer                       │
│                                                                  │
│  User Schema (user.model.js):                                    │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │ _id         : ObjectId (auto)                           │     │
│  │ name        : String (required)                         │     │
│  │ email       : String (unique, required, email format)   │     │
│  │ password    : String (hashed, required)                 │     │
│  │ avatar      : String (optional)                         │     │
│  │ createdAt   : Date (auto)                               │     │
│  │ updatedAt   : Date (auto)                               │     │
│  └─────────────────────────────────────────────────────────┘     │
│                                                                  │
│  ClothingItem Schema (clothingItem.model.js):                    │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │ _id         : ObjectId (auto)                           │     │
│  │ name        : String (required)                         │     │
│  │ imageUrl    : String (required)                         │     │
│  │ weather     : String (enum: hot, warm, cold)            │     │
│  │ season      : String (enum: spring, summer, etc.)       │     │
│  │ owner       : ObjectId (reference to User)              │     │
│  │ likes       : [ObjectId] (array of user IDs)            │     │
│  │ createdAt   : Date (auto)                               │     │
│  │ updatedAt   : Date (auto)                               │     │
│  └─────────────────────────────────────────────────────────┘     │
│                                                                  │
│  Validation Rules Applied:                                       │
│  • Email format validation                                       │
│  • Unique constraints (no duplicate emails)                      │
│  • Required fields enforcement                                   │
│  • Enum validation (weather, season)                             │
│  • Type checking (String, ObjectId, Array, etc.)                 │
│                                                                  │
└────────────────────┬─────────────────────────────────────────────┘
                     │
                     │ Network Query
                     │
                     ↓
┌──────────────────────────────────────────────────────────────────┐
│                    MONGODB DATABASE                              │
│                  Connection: mongodb://localhost:27017           │
│                  Database: wtwr_db                               │
│                                                                  │
│  ┌──────────────────┐      ┌──────────────────────────────────┐  │
│  │ users Collection │      │ clothingitems Collection         │  │
│  ├──────────────────┤      ├──────────────────────────────────┤  │
│  │ {                │      │ {                                │  │
│  │  _id: ObjectId   │      │  _id: ObjectId                   │  │
│  │  name: "John"    │      │  name: "Winter Jacket"           │  │
│  │  email: "j@e.com"│      │  imageUrl: "https://..."         │  │
│  │  password: "hash"│      │  weather: "cold"                 │  │
│  │  createdAt: Date │      │  season: "winter"                │  │
│  │ }                │      │  owner: ObjectId (→ users)       │  │
│  │                  │      │  likes: [ObjectId, ...]  (→ users)  |
│  │ ... more users   │      │  createdAt: Date                 │  │
│  └──────────────────┘      │ }                                │  │
│                            │                                  │  │
│                            │ ... more items                   │  │
│                            └──────────────────────────────────┘  │
│                                                                  │
│  Persistent Storage:                                             │
│  ✓ Users with hashed passwords                                   │
│  ✓ Clothing items with owner references                          │
│  ✓ Like relationships (user IDs in items array)                  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication Flow Detailed

```
Step 1: User Signs Up
───────────────────
POST /signup
Body: { name, email, password }
         ↓
[Controller: users.createUser()]
  • Validate email format
  • Check if email exists (unique constraint)
  • Hash password with bcryptjs (10 salt rounds)
  • Create new User document
         ↓
[Database: Save to users collection]
         ↓
Response: { _id, name, email, createdAt }
(Password NOT returned for security)


Step 2: User Signs In
──────────────────────
POST /signin
Body: { email, password }
         ↓
[Controller: users.login()]
  • Find user by email
  • Compare password with stored hash (bcryptjs)
  • If valid:
    - Generate JWT token
      Header:   { alg: "HS256", typ: "JWT" }
      Payload:  { _id: userId, iat: timestamp }
      Signature: HMAC-SHA256
         ↓
Response: { token: "eyJhbGc..." }
(Client stores token for future requests)


Step 3: Accessing Protected Routes
───────────────────────────────────
PUT /items/:itemId/likes
Header: Authorization: Bearer {token}
         ↓
[Middleware: auth.js]
  • Extract token from header
  • Verify token signature (JWT)
  • Decode token → get user._id
  • Attach user to request (req.user)
  • If invalid/missing: respond 401 Unauthorized
         ↓
[Controller: clothingItems.likeItem()]
  • Access req.user._id from middleware
  • Add user._id to item.likes array
  • Save updated item
         ↓
Response: { _id, name, ... , likes: [userId, ...] }
```

---

## 📊 Data Relationships

```
┌─────────────┐                      ┌─────────────────────┐
│    User     │                      │  ClothingItem       │
│  (Unique)   │                      │   (Can be Many)     │
├─────────────┤          owns        ├─────────────────────┤
│ _id (PK)    │◄─────────────────────│ owner (FK)          │
│ name        │                      │ _id                 │
│ email       │                      │ name                │
│ password    │                      │ imageUrl            │
│ createdAt   │                      │ weather             │
└─────────────┘                      │ season              │
       │                             │ createdAt           │
       │                             └─────────────────────┘
       │
       │ (Many-to-Many via arrays)
       │
┌──────┴──────────────────────────────┐
│        Item.likes array             │
│  Contains user IDs who liked item   │
│  [userId1, userId2, userId3]        │
└─────────────────────────────────────┘
```

**Key Relationships:**
- **1-to-Many:** One user can own many clothing items
- **Many-to-Many:** Users can like many items, items can be liked by many users
  - Implemented via array of user IDs in item.likes

---

## 🎯 Request-Response Lifecycle Example

### Use Case: User Likes an Item

```
┌─────────────────────────────────────────────────────────┐
│ CLIENT                                                  │
├─────────────────────────────────────────────────────────┤
│ 1. User clicks "Like" button on item                    │
│    Item ID: 507f1f77bcf86cd799439012                    │
│                                                         │
│ 2. Frontend sends HTTP request:                         │
│    PUT http://localhost:3001/items/.../likes            │
│    Header: Authorization: Bearer eyJhbGc...             │
│                                                         │
│    (No body needed)                                     │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ EXPRESS SERVER                                          │
├─────────────────────────────────────────────────────────┤
│ 1. Router matches: PUT /items/:itemId/likes             │
│                                                         │
│ 2. Auth middleware:                                     │
│    - Extract token from header                          │
│    - Verify token validity                              │
│    - Extract user ID: 507f1f77bcf86cd799439011          │
│    - req.user._id = 507f1f77bcf86cd799439011            │
│                                                         │
│ 3. Route → Controller: clothingItems.likeItem()         │
│    - params: { itemId: 507f1f77bcf86cd799439012 }       │
│    - user: { _id: 507f1f77bcf86cd799439011 }            │
│                                                         │
│ 4. Controller logic:                                    │
│    - Query: Item.findById(itemId)                       │
│    - Check: If userId NOT in likes array                │
│    - Update: item.likes.push(userId)                    │
│    - Save: item.save()                                  │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ MONGOOSE                                                │
├─────────────────────────────────────────────────────────┤
│ 1. Validate against schema                              │
│    - Item exists                                        │
│    - userId is valid ObjectId                           │
│    - likes array is valid                               │
│                                                         │
│ 2. Query MongoDB for item                               │
│    - Find: db.clothingitems.findById(...)               │
│    - Get current item.likes array                       │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ MONGODB                                                 │
├─────────────────────────────────────────────────────────┤
│ 1. Find document in clothingitems collection            │
│    Filter: { _id: ObjectId("507f1f77bcf86cd799439012") }│
│                                                         │
│ 2. Found:                                               │
│    {                                                    │
│      _id: ObjectId("507f1f77bcf86cd799439012"),         │
│      name: "Winter Jacket",                             │
│      imageUrl: "https://...",                           │
│      weather: "cold",                                   │
│      owner: ObjectId("507f1f77bcf86cd799439011"),       │
│      likes: ["507f1f77bcf86cd799439010"]  ← Before like │
│    }                                                    │
│                                                         │
│ 3. Update operation:                                    │
│    Update: { $push: { likes: userId } }                 │
│                                                         │
│ 4. Result (after update):                               │
│    likes: ["507f1f77bcf86cd799439010",                  │
│             "507f1f77bcf86cd799439011"]  ← After like   │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ EXPRESS (send response)                                 │
├─────────────────────────────────────────────────────────┤
│ 1. Receive updated document from Mongoose               │
│                                                         │
│ 2. Format response:                                     │
│    Status: 200 OK                                       │
│    Body: {                                              │
│      _id: "507f1f77bcf86cd799439012",                   │
│      name: "Winter Jacket",                             │
│      likes: ["507f1f77bcf86cd799439010",                │
│               "507f1f77bcf86cd799439011"]               │
│    }                                                    │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────┐
│ CLIENT                                                  │
├─────────────────────────────────────────────────────────┤
│ 1. Receive response: 200 OK                             │
│                                                         │
│ 2. Update UI:                                           │
│    - Show "Liked!" status                               │
│    - Update like count: 2 (was 1)                       │
│    - Change button state (filled heart)                 │
│                                                         │
│ 3. User sees immediate feedback                         │
│    ✓ Item now shows user has liked it                   │
└─────────────────────────────────────────────────────────┘
```

---

## 🛡️ Security Layers

```
Layer 1: CORS (Cross-Origin Resource Sharing)
  └─ Only allow requests from authorized origins
     Example: app.use(cors())

Layer 2: Input Validation
  └─ Mongoose schema validation
  └─ Email format checking
  └─ Type checking (String, ObjectId, etc.)
  └─ Enum constraints (weather, season)

Layer 3: Authentication
  └─ bcryptjs password hashing (10 salt rounds)
  └─ JWT token generation on signin
  └─ Token expiration (implementation ready)

Layer 4: Authorization
  └─ Middleware checks JWT token validity
  └─ Only authenticated users can access protected routes
  └─ Users can only delete their own items

Layer 5: Error Handling
  └─ Centralized error responses
  └─ No sensitive info in error messages
  └─ Standardized status codes
```

---

## 🔄 File & Component Relationships

```
app.js (Entry Point)
  ├─ Requires: routes/index.js
  │   └─ Routes Request to Controllers
  │
  ├─ Requires: models/ (Database schemas)
  │   ├─ user.model.js
  │   └─ clothingItem.model.js
  │
  ├─ Requires: middlewares/
  │   └─ auth.js (JWT verification)
  │
  ├─ Requires: utils/
  │   ├─ errors.js (Error constants)
  │   └─ config.js (Configuration)
  │
  └─ Requires: controllers/ (Business logic)
      ├─ users.js (Auth & user operations)
      └─ clothingItems.js (Item operations)
```

---

## 📈 Database Query Examples

### Create Item with Proper References
```
db.clothingitems.insertOne({
  _id: ObjectId("new_id"),
  name: "Winter Jacket",
  imageUrl: "https://...",
  weather: "cold",
  season: "winter",
  owner: ObjectId("507f1f77bcf86cd799439011"),  // ← Reference to user
  likes: [],  // ← Empty array initially
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Like an Item (Add User to Likes)
```
db.clothingitems.updateOne(
  { _id: ObjectId("507f1f77bcf86cd799439012") },
  { $push: { likes: ObjectId("507f1f77bcf86cd799439011") } }
)
```

### Unlike an Item (Remove User from Likes)
```
db.clothingitems.updateOne(
  { _id: ObjectId("507f1f77bcf86cd799439012") },
  { $pull: { likes: ObjectId("507f1f77bcf86cd799439011") } }
)
```

---

## 🎯 Key Takeaways

1. **MVC Architecture:** Clear separation between routes, logic, and models
2. **JWT Authentication:** Stateless auth with token-based sessions
3. **Schema Validation:** Mongoose enforces data integrity
4. **Reference Design:** Users referenced in items via owner & likes
5. **Error Handling:** Centralized, meaningful error responses
6. **Security:** Multiple layers from validation to authorization

---

**Architecture Version:** 1.0 | **Last Updated:** May 2026
