#!/bin/bash

# API Testing Script
# Make sure the server is running on http://localhost:3000

BASE_URL="http://localhost:3000"
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting API Tests...${NC}\n"

# Test 1: Health Check
echo -e "${GREEN}Test 1: Health Check${NC}"
curl -s -X GET "${BASE_URL}/health" | jq '.'
echo -e "\n"

# Test 2: Create Item 1
echo -e "${GREEN}Test 2: Create Item 1${NC}"
ITEM1_RESPONSE=$(curl -s -X POST "${BASE_URL}/items" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1299.99,
    "category": "Electronics",
    "inStock": true
  }')
echo "$ITEM1_RESPONSE" | jq '.'
ITEM1_ID=$(echo "$ITEM1_RESPONSE" | jq -r '.data.id')
echo -e "Created Item ID: ${ITEM1_ID}\n"

# Test 3: Create Item 2
echo -e "${GREEN}Test 3: Create Item 2${NC}"
ITEM2_RESPONSE=$(curl -s -X POST "${BASE_URL}/items" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse",
    "price": 29.99,
    "category": "Electronics",
    "inStock": true
  }')
echo "$ITEM2_RESPONSE" | jq '.'
ITEM2_ID=$(echo "$ITEM2_RESPONSE" | jq -r '.data.id')
echo -e "Created Item ID: ${ITEM2_ID}\n"

# Test 4: Create Item 3 (Different Category)
echo -e "${GREEN}Test 4: Create Item 3 (Different Category)${NC}"
ITEM3_RESPONSE=$(curl -s -X POST "${BASE_URL}/items" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Office Chair",
    "description": "Comfortable office chair",
    "price": 199.99,
    "category": "Furniture",
    "inStock": false
  }')
echo "$ITEM3_RESPONSE" | jq '.'
ITEM3_ID=$(echo "$ITEM3_RESPONSE" | jq -r '.data.id')
echo -e "Created Item ID: ${ITEM3_ID}\n"

# Test 5: Get All Items
echo -e "${GREEN}Test 5: Get All Items${NC}"
curl -s -X GET "${BASE_URL}/items" | jq '.'
echo -e "\n"

# Test 6: Get All Items with Pagination
echo -e "${GREEN}Test 6: Get All Items (Page 1, Limit 2)${NC}"
curl -s -X GET "${BASE_URL}/items?page=1&limit=2" | jq '.'
echo -e "\n"

# Test 7: Filter by Category
echo -e "${GREEN}Test 7: Filter by Category (Electronics)${NC}"
curl -s -X GET "${BASE_URL}/items?category=Electronics" | jq '.'
echo -e "\n"

# Test 8: Search Items
echo -e "${GREEN}Test 8: Search Items (search=laptop)${NC}"
curl -s -X GET "${BASE_URL}/items?search=laptop" | jq '.'
echo -e "\n"

# Test 9: Get Item by ID
echo -e "${GREEN}Test 9: Get Item by ID${NC}"
curl -s -X GET "${BASE_URL}/items/${ITEM1_ID}" | jq '.'
echo -e "\n"

# Test 10: Update Item
echo -e "${GREEN}Test 10: Update Item${NC}"
curl -s -X PUT "${BASE_URL}/items/${ITEM1_ID}" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1199.99,
    "inStock": false
  }' | jq '.'
echo -e "\n"

# Test 11: Get Updated Item
echo -e "${GREEN}Test 11: Verify Updated Item${NC}"
curl -s -X GET "${BASE_URL}/items/${ITEM1_ID}" | jq '.'
echo -e "\n"

# Test 12: Delete Item
echo -e "${GREEN}Test 12: Delete Item${NC}"
curl -s -X DELETE "${BASE_URL}/items/${ITEM2_ID}" | jq '.'
echo -e "\n"

# Test 13: Verify Deleted Item (should return 404)
echo -e "${GREEN}Test 13: Verify Deleted Item (should return 404)${NC}"
curl -s -X GET "${BASE_URL}/items/${ITEM2_ID}" | jq '.'
echo -e "\n"

# Test 14: Get All Items After Delete
echo -e "${GREEN}Test 14: Get All Items After Delete${NC}"
curl -s -X GET "${BASE_URL}/items" | jq '.'
echo -e "\n"

# Test 15: Validation Error Test (Invalid Price)
echo -e "${GREEN}Test 15: Validation Error Test (Invalid Price)${NC}"
curl -s -X POST "${BASE_URL}/items" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Item",
    "price": -10,
    "category": "Test"
  }' | jq '.'
echo -e "\n"

# Test 16: Validation Error Test (Missing Required Fields)
echo -e "${GREEN}Test 16: Validation Error Test (Missing Required Fields)${NC}"
curl -s -X POST "${BASE_URL}/items" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Item"
  }' | jq '.'
echo -e "\n"

# Test 17: Invalid UUID Test
echo -e "${GREEN}Test 17: Invalid UUID Test${NC}"
curl -s -X GET "${BASE_URL}/items/invalid-id" | jq '.'
echo -e "\n"

echo -e "${YELLOW}✅ All tests completed!${NC}"

