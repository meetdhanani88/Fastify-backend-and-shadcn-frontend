# Postman API Endpoints Collection

**Base URL:** `http://localhost:3000`

---

## 1. Health Check

### GET `/health`
Check server status

**Request:**
- Method: `GET`
- URL: `http://localhost:3000/health`
- Headers: None required

**Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2026-01-08T17:25:30.247Z",
  "uptime": 41.995536042
}
```

---

## 2. Items CRUD Operations

### 2.1 Create Item

**POST `/items`**
Create a new item

**Request:**
- Method: `POST`
- URL: `http://localhost:3000/items`
- Headers:
  ```
  Content-Type: application/json
  ```
- Body (JSON):
  ```json
  {
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1299.99,
    "category": "Electronics",
    "inStock": true
  }
  ```

**Required Fields:**
- `name` (string, 1-100 chars)
- `price` (number, must be >= 0)
- `category` (string, min 1 char)

**Optional Fields:**
- `description` (string, max 500 chars)
- `inStock` (boolean, default: true)

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "9750864d-caae-4bc8-9694-d39e3d729222",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1299.99,
    "category": "Electronics",
    "inStock": true,
    "createdAt": "2026-01-08T17:25:30.255Z",
    "updatedAt": "2026-01-08T17:25:30.255Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "price",
        "message": "must be >= 0",
        "keyword": "minimum"
      }
    ]
  }
}
```

---

### 2.2 Get All Items

**GET `/items`**
Get all items with pagination and filters

**Request:**
- Method: `GET`
- URL: `http://localhost:3000/items`
- Query Parameters (all optional):
  - `page` (string, numeric): Page number (default: 1)
  - `limit` (string, numeric): Items per page (default: 10)
  - `category` (string): Filter by category
  - `search` (string): Search in name/description

**Examples:**

1. **Get all items (default pagination):**
   ```
   GET http://localhost:3000/items
   ```

2. **Get items with pagination:**
   ```
   GET http://localhost:3000/items?page=1&limit=2
   ```

3. **Filter by category:**
   ```
   GET http://localhost:3000/items?category=Electronics
   ```

4. **Search items:**
   ```
   GET http://localhost:3000/items?search=laptop
   ```

5. **Combined filters:**
   ```
   GET http://localhost:3000/items?page=1&limit=10&category=Electronics&search=laptop
   ```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "9750864d-caae-4bc8-9694-d39e3d729222",
        "name": "Laptop",
        "description": "High-performance laptop",
        "price": 1299.99,
        "category": "Electronics",
        "inStock": true,
        "createdAt": "2026-01-08T17:25:30.255Z",
        "updatedAt": "2026-01-08T17:25:30.255Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

---

### 2.3 Get Item by ID

**GET `/items/:id`**
Get a specific item by its UUID

**Request:**
- Method: `GET`
- URL: `http://localhost:3000/items/{item-id}`
- Replace `{item-id}` with actual UUID

**Example:**
```
GET http://localhost:3000/items/9750864d-caae-4bc8-9694-d39e3d729222
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "9750864d-caae-4bc8-9694-d39e3d729222",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1299.99,
    "category": "Electronics",
    "inStock": true,
    "createdAt": "2026-01-08T17:25:30.255Z",
    "updatedAt": "2026-01-08T17:25:30.255Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Item with id 9750864d-caae-4bc8-9694-d39e3d729222 not found"
  }
}
```

**Error Response (400 Bad Request - Invalid UUID):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "id",
        "message": "must match format \"uuid\"",
        "keyword": "format"
      }
    ]
  }
}
```

---

### 2.4 Update Item

**PUT `/items/:id`**
Update an existing item (partial update - all fields optional)

**Request:**
- Method: `PUT`
- URL: `http://localhost:3000/items/{item-id}`
- Headers:
  ```
  Content-Type: application/json
  ```
- Body (JSON) - all fields optional:
  ```json
  {
    "name": "Updated Laptop",
    "description": "Updated description",
    "price": 1199.99,
    "category": "Electronics",
    "inStock": false
  }
  ```

**Example:**
```
PUT http://localhost:3000/items/9750864d-caae-4bc8-9694-d39e3d729222
```

**Partial Update Example:**
```json
{
  "price": 1099.99,
  "inStock": false
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "9750864d-caae-4bc8-9694-d39e3d729222",
    "name": "Updated Laptop",
    "description": "Updated description",
    "price": 1199.99,
    "category": "Electronics",
    "inStock": false,
    "createdAt": "2026-01-08T17:25:30.255Z",
    "updatedAt": "2026-01-08T17:25:30.269Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Item with id 9750864d-caae-4bc8-9694-d39e3d729222 not found"
  }
}
```

---

### 2.5 Delete Item

**DELETE `/items/:id`**
Delete an item by its UUID

**Request:**
- Method: `DELETE`
- URL: `http://localhost:3000/items/{item-id}`
- Replace `{item-id}` with actual UUID

**Example:**
```
DELETE http://localhost:3000/items/9750864d-caae-4bc8-9694-d39e3d729222
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Item deleted successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Item with id 9750864d-caae-4bc8-9694-d39e3d729222 not found"
  }
}
```

---

## 3. Error Response Format

All errors follow this consistent format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": [
      {
        "field": "fieldName",
        "message": "Validation message",
        "keyword": "validation-keyword"
      }
    ]
  }
}
```

**Error Codes:**
- `VALIDATION_ERROR` - Validation failed (400 Bad Request)
- `NOT_FOUND` - Resource not found (404 Not Found)
- `BAD_REQUEST` - Bad request (400 Bad Request)
- `INTERNAL_SERVER_ERROR` - Server error (500 Internal Server Error)

---

## 4. Postman Collection Setup

### Environment Variables (Optional)
Create a Postman environment with:
- `base_url`: `http://localhost:3000`
- `item_id`: (will be set after creating an item)

### Collection Structure
```
📁 Items API
  ├── 📁 Health
  │   └── GET Health Check
  ├── 📁 Items
  │   ├── POST Create Item
  │   ├── GET Get All Items
  │   ├── GET Get Item by ID
  │   ├── PUT Update Item
  │   └── DELETE Delete Item
```

### Quick Test Flow

1. **Create Item** → Copy the `id` from response
2. **Get All Items** → Verify item appears
3. **Get Item by ID** → Use the copied `id`
4. **Update Item** → Use the copied `id`
5. **Get Item by ID** → Verify changes
6. **Delete Item** → Use the copied `id`
7. **Get Item by ID** → Should return 404

---

## 5. Example Test Cases

### Valid Requests

**Create Item:**
```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse",
  "price": 29.99,
  "category": "Electronics",
  "inStock": true
}
```

**Update Item (Partial):**
```json
{
  "price": 24.99,
  "inStock": false
}
```

### Invalid Requests (for testing error handling)

**Invalid Price (negative):**
```json
{
  "name": "Test Item",
  "price": -10,
  "category": "Test"
}
```
Expected: `400 Bad Request` with validation error

**Missing Required Field:**
```json
{
  "name": "Test Item"
}
```
Expected: `400 Bad Request` with validation error

**Invalid UUID:**
```
GET http://localhost:3000/items/invalid-id
```
Expected: `400 Bad Request` with validation error

---

## 6. Notes

- All timestamps are in ISO 8601 format (UTC)
- UUIDs follow standard UUID v4 format
- Pagination starts at page 1
- Search is case-insensitive and searches in `name` and `description`
- Category filter is case-insensitive
- All endpoints support CORS (configured in environment)

