# Backend API

Fastify backend with TypeScript, Zod validation, and global error handling.

## Features

- ✅ Fastify framework
- ✅ TypeScript support
- ✅ Zod validation schemas
- ✅ Global error handling
- ✅ CRUD operations for Items
- ✅ CORS support
- ✅ Request logging
- ✅ Pagination and filtering

## Installation

```bash
cd backend
npm install
```

## Environment Setup

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Or create a `.env` file manually with the following variables:

```env
NODE_ENV=development
PORT=3000
HOST=0.0.0.0
LOG_LEVEL=info
CORS_ORIGIN=true
```

## Development

```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file)

## Build

```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Check server status

### Items CRUD

- `POST /items` - Create a new item
- `GET /items` - Get all items (with pagination and filters)
- `GET /items/:id` - Get item by ID
- `PUT /items/:id` - Update item by ID
- `DELETE /items/:id` - Delete item by ID

### Example Requests

#### Create Item
```bash
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1299.99,
    "category": "Electronics",
    "inStock": true
  }'
```

#### Get All Items
```bash
curl http://localhost:3000/items?page=1&limit=10&category=Electronics&search=laptop
```

#### Get Item by ID
```bash
curl http://localhost:3000/items/{item-id}
```

#### Update Item
```bash
curl -X PUT http://localhost:3000/items/{item-id} \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1199.99,
    "inStock": false
  }'
```

#### Delete Item
```bash
curl -X DELETE http://localhost:3000/items/{item-id}
```

## Testing

### Quick Test Scripts

Two test scripts are provided to test all API endpoints:

#### Option 1: Node.js Test Script (Recommended)
```bash
npm run test:api
```

This script uses Node.js's built-in `fetch` (requires Node.js 18+) and tests all endpoints automatically.

#### Option 2: Bash/Curl Test Script
```bash
npm run test:api:curl
# OR
chmod +x test-api.sh
./test-api.sh
```

**Note:** Requires `jq` for JSON formatting. Install with:
- macOS: `brew install jq`
- Linux: `sudo apt-get install jq` or `sudo yum install jq`

### Manual Testing with curl

#### 1. Health Check
```bash
curl http://localhost:3000/health
```

#### 2. Create Item
```bash
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1299.99,
    "category": "Electronics",
    "inStock": true
  }'
```

#### 3. Get All Items
```bash
curl http://localhost:3000/items
```

#### 4. Get Items with Filters
```bash
# Pagination
curl "http://localhost:3000/items?page=1&limit=2"

# Filter by category
curl "http://localhost:3000/items?category=Electronics"

# Search
curl "http://localhost:3000/items?search=laptop"
```

#### 5. Get Item by ID
```bash
curl http://localhost:3000/items/{item-id}
```

#### 6. Update Item
```bash
curl -X PUT http://localhost:3000/items/{item-id} \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1199.99,
    "inStock": false
  }'
```

#### 7. Delete Item
```bash
curl -X DELETE http://localhost:3000/items/{item-id}
```

#### 8. Test Validation Errors
```bash
# Invalid price (negative)
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "price": -10,
    "category": "Test"
  }'

# Missing required fields
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test"
  }'
```

### Testing with Postman/Insomnia

Import the following collection structure:

- **Base URL:** `http://localhost:3000`
- **Endpoints:**
  - `GET /health`
  - `POST /items` (Body: JSON with name, price, category)
  - `GET /items` (Query params: page, limit, category, search)
  - `GET /items/:id`
  - `PUT /items/:id` (Body: JSON with fields to update)
  - `DELETE /items/:id`

## Environment Variables

All environment variables are validated using Zod on startup. Invalid values will cause the server to exit with an error message.

- `NODE_ENV` - Environment mode: `development`, `production`, or `test` (default: `development`)
- `PORT` - Server port number (default: `3000`)
- `HOST` - Server host address (default: `0.0.0.0`)
- `LOG_LEVEL` - Logging level: `fatal`, `error`, `warn`, `info`, `debug`, or `trace` (default: `info`)
- `CORS_ORIGIN` - CORS origin. Set to `true` to allow all origins, or specify a specific origin URL (default: `true`)

**Note:** Environment variables are loaded from a `.env` file using `dotenv`. Make sure to create a `.env` file in the backend directory.

## Error Handling

The API uses a global error handler that:
- Handles Zod validation errors (422)
- Handles custom HTTP errors (404, 400, 500, etc.)
- Returns consistent error response format
- Logs errors appropriately

Error response format:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": [] // Only for validation errors
  }
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration (env variables)
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── schemas/         # Zod validation schemas
│   ├── types/           # TypeScript types
│   ├── utils/           # Utilities (error handling)
│   └── server.ts        # Main server file
├── .env                 # Environment variables (create from .env.example)
├── .env.example         # Example environment variables
├── package.json
├── tsconfig.json
└── README.md
```

