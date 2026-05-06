# Postman Collection Files

This folder contains Postman collection files for testing the WTWR API.

## Files

- **WTWR.postman_collection.json** — Ready-to-import Postman collection with all endpoints

## How to Use

### Import the Collection

1. Open **Postman** (Download from https://www.postman.com/downloads/)
2. Click **Import** (top-left)
3. Select **WTWR.postman_collection.json**
4. Collection loads with all endpoints pre-configured

### Set Environment Variables

1. Create a new **Environment** in Postman
2. Add these variables:

| Variable | Initial Value |
|----------|---|
| `baseUrl` | `http://localhost:3001` |
| `token` | `` (empty, will be set after signin) |
| `itemId` | `` (empty, will be set after creating item) |

### Quick Testing

1. **Start your server:** `npm run dev`
2. **Sign Up** → POST `/signup` with test credentials
3. **Sign In** → POST `/signin` to get token
4. **Copy token** → Paste into Postman environment variable `{{token}}`
5. **Test protected endpoints** → Now they'll work with your token

## Pre-request Script (Optional)

Add to **Collection → Pre-request Scripts** to auto-set token:

```javascript
// After signin, automatically save token
if (pm.response.code === 200 && pm.response.json().token) {
  pm.environment.set("token", pm.response.json().token);
}
```

## Collection Organization

```
WTWR API Collection
├── Authentication
│   ├── Sign Up
│   └── Sign In
├── Users
│   ├── Get Current User
│   └── Update Current User
└── Clothing Items
    ├── Get All Items
    ├── Create Item
    ├── Delete Item
    ├── Like Item
    └── Unlike Item
```

## Documentation

For detailed API examples and cURL commands, see [API_DEMO.md](../API_DEMO.md)
