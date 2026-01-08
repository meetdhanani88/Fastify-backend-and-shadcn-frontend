# Frontend-Backend Connection Guide

## ✅ Connection Complete!

Your React frontend is now fully connected to your Fastify backend API.

---

## 📁 Files Created

### Frontend API Integration

1. **`my-app/src/lib/api.ts`**
   - API client with all CRUD operations
   - Type-safe interfaces for all data structures
   - Error handling with custom `ApiError` class
   - Base URL configuration via environment variable

2. **`my-app/src/hooks/useItems.ts`**
   - React hook for managing items state
   - Automatic data fetching and refreshing
   - CRUD operations: create, update, delete
   - Search and filter support
   - Loading and error states

3. **`my-app/src/components/ItemsManagement.tsx`**
   - Complete UI component for items management
   - Table view with all items
   - Create/Edit forms
   - Search and filter functionality
   - Delete with confirmation
   - Pagination display

4. **`my-app/src/App.tsx`** (Updated)
   - Added "Items Management" tab
   - Integrated `ItemsManagement` component

---

## 🚀 How to Use

### 1. Start Backend Server

```bash
cd backend
npm install  # if not already done
npm run dev
```

Server will run on `http://localhost:3000`

### 2. Start Frontend

```bash
cd my-app
npm install  # if not already done
npm run dev
```

Frontend will run on `http://localhost:5173` (or similar Vite port)

### 3. Configure API URL (Optional)

Create `.env` file in `my-app/` directory:

```env
VITE_API_URL=http://localhost:3000
```

If not set, it defaults to `http://localhost:3000`

### 4. Access the Application

1. Open `http://localhost:5173` in your browser
2. Click on **"Items Management"** tab
3. You'll see the full CRUD interface:
   - View all items in a table
   - Create new items
   - Edit existing items
   - Delete items
   - Search and filter items

---

## 🎯 Features

### Items Management Component

- **View Items**: Table display with all item details
- **Create Item**: Form to add new items
- **Edit Item**: Inline editing in the table
- **Delete Item**: Delete with confirmation dialog
- **Search**: Search items by name/description
- **Filter**: Filter by category
- **Pagination**: Shows current page and total items
- **Loading States**: Shows loading indicator while fetching
- **Error Handling**: Displays error messages if API calls fail

### API Integration

- **Type Safety**: Full TypeScript support
- **Error Handling**: Custom error class with status codes
- **Automatic Refresh**: Data refreshes after create/update/delete
- **Query Parameters**: Support for pagination, search, and filters

---

## 🔧 API Endpoints Used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/items` | Get all items (with pagination/filters) |
| `POST` | `/items` | Create new item |
| `GET` | `/items/:id` | Get item by ID |
| `PUT` | `/items/:id` | Update item |
| `DELETE` | `/items/:id` | Delete item |

---

## 📝 Code Structure

```
my-app/src/
├── lib/
│   └── api.ts              # API client and types
├── hooks/
│   └── useItems.ts         # React hook for items management
├── components/
│   └── ItemsManagement.tsx # UI component
└── App.tsx                 # Main app (updated)
```

---

## 🐛 Troubleshooting

### CORS Issues

If you see CORS errors, make sure:
- Backend `CORS_ORIGIN` is set to `true` (allows all origins) in `backend/.env`
- Or set it to your frontend URL: `CORS_ORIGIN=http://localhost:5173`

### Connection Refused

- Make sure backend is running on `http://localhost:3000`
- Check `VITE_API_URL` in frontend `.env` matches backend URL
- Verify no firewall is blocking the connection

### API Errors

- Check browser console for detailed error messages
- Verify backend logs for any server-side errors
- Ensure all required fields are provided when creating/updating items

---

## 🎨 UI Components Used

The Items Management component uses these shadcn/ui components:
- `Card` - Container for the management interface
- `Table` - Display items in a table
- `Button` - Actions (create, edit, delete)
- `Input` - Form inputs
- `Label` - Form labels
- `Badge` - Status indicators (In Stock/Out of Stock, Category)

---

## ✨ Next Steps

You can now:
1. **Customize the UI**: Modify `ItemsManagement.tsx` to match your design
2. **Add Features**: 
   - Bulk operations
   - Export to CSV
   - Advanced filtering
   - Image uploads
3. **Connect to Database**: Replace in-memory store with real database
4. **Add Authentication**: Protect routes with auth middleware
5. **Add More Entities**: Create similar CRUD for other resources

---

## 📚 Documentation

- Backend API docs: `backend/POSTMAN_API_ENDPOINTS.md`
- Postman Collection: `backend/Items_API.postman_collection.json`
- Backend README: `backend/README.md`

