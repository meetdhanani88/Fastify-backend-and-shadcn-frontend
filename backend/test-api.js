#!/usr/bin/env node

/**
 * API Testing Script
 * Run with: node test-api.js
 * Make sure the server is running on http://localhost:3000
 */

const BASE_URL = process.env.API_URL || 'http://localhost:3000';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
};

let createdItemIds = [];

async function test(name, fn, options = {}) {
  try {
    console.log(`${colors.yellow}▶ ${name}${colors.reset}`);
    const result = await fn();
    console.log(JSON.stringify(result, null, 2));
    console.log('');
    return result;
  } catch (error) {
    if (!options.expectError) {
      console.error(`${colors.red}✗ Error: ${error.message}${colors.reset}`);
      if (error.response) {
        console.error(JSON.stringify(error.response, null, 2));
      }
      console.log('');
    }
    throw error;
  }
}

async function request(method, endpoint, data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const result = await response.json();

  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
    error.response = result;
    throw error;
  }

  return result;
}

async function runTests() {
  console.log(`${colors.green}🚀 Starting API Tests...${colors.reset}\n`);

  try {
    // Test 1: Health Check
    await test('Health Check', () => request('GET', '/health'));

    // Test 2: Create Item 1
    const item1 = await test('Create Item 1', () =>
      request('POST', '/items', {
        name: 'Laptop',
        description: 'High-performance laptop',
        price: 1299.99,
        category: 'Electronics',
        inStock: true,
      })
    );
    createdItemIds.push(item1.data.id);

    // Test 3: Create Item 2
    const item2 = await test('Create Item 2', () =>
      request('POST', '/items', {
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse',
        price: 29.99,
        category: 'Electronics',
        inStock: true,
      })
    );
    createdItemIds.push(item2.data.id);

    // Test 4: Create Item 3 (Different Category)
    const item3 = await test('Create Item 3 (Different Category)', () =>
      request('POST', '/items', {
        name: 'Office Chair',
        description: 'Comfortable office chair',
        price: 199.99,
        category: 'Furniture',
        inStock: false,
      })
    );
    createdItemIds.push(item3.data.id);

    // Test 5: Get All Items
    await test('Get All Items', () => request('GET', '/items'));

    // Test 6: Get All Items with Pagination
    await test('Get All Items (Page 1, Limit 2)', () =>
      request('GET', '/items?page=1&limit=2')
    );

    // Test 7: Filter by Category
    await test('Filter by Category (Electronics)', () =>
      request('GET', '/items?category=Electronics')
    );

    // Test 8: Search Items
    await test('Search Items (search=laptop)', () =>
      request('GET', '/items?search=laptop')
    );

    // Test 9: Get Item by ID
    await test('Get Item by ID', () =>
      request('GET', `/items/${createdItemIds[0]}`)
    );

    // Test 10: Update Item
    await test('Update Item', () =>
      request('PUT', `/items/${createdItemIds[0]}`, {
        price: 1199.99,
        inStock: false,
      })
    );

    // Test 11: Get Updated Item
    await test('Verify Updated Item', () =>
      request('GET', `/items/${createdItemIds[0]}`)
    );

    // Test 12: Delete Item
    await test('Delete Item', () =>
      request('DELETE', `/items/${createdItemIds[1]}`)
    );

    // Test 13: Verify Deleted Item (should return 404)
    try {
      await test('Verify Deleted Item (should return 404)', () =>
        request('GET', `/items/${createdItemIds[1]}`),
        { expectError: true }
      );
    } catch (error) {
      console.log(`${colors.yellow}Expected 404 error: ${error.message}${colors.reset}\n`);
    }

    // Test 14: Get All Items After Delete
    await test('Get All Items After Delete', () => request('GET', '/items'));

    // Test 15: Validation Error Test (Invalid Price)
    try {
      await test('Validation Error Test (Invalid Price)', () =>
        request('POST', '/items', {
          name: 'Test Item',
          price: -10,
          category: 'Test',
        }),
        { expectError: true }
      );
    } catch (error) {
      console.log(`${colors.yellow}Expected validation error: ${error.message}${colors.reset}\n`);
    }

    // Test 16: Validation Error Test (Missing Required Fields)
    try {
      await test('Validation Error Test (Missing Required Fields)', () =>
        request('POST', '/items', {
          name: 'Test Item',
        }),
        { expectError: true }
      );
    } catch (error) {
      console.log(`${colors.yellow}Expected validation error: ${error.message}${colors.reset}\n`);
    }

    // Test 17: Invalid UUID Test
    try {
      await test(
        'Invalid UUID Test',
        () => request('GET', '/items/invalid-id'),
        { expectError: true },
      );
    } catch (error) {
      console.log(`${colors.yellow}Expected validation error: ${error.message}${colors.reset}\n`);
    }

    console.log(`${colors.green}✅ All tests completed!${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}❌ Test suite failed: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.error(
    `${colors.red}Error: This script requires Node.js 18+ or install node-fetch${colors.reset}`
  );
  process.exit(1);
}

runTests();

