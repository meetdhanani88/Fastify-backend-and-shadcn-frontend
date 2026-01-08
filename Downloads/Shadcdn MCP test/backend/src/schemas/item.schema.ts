import { z } from 'zod';

// Create item schema
export const createItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  price: z.number().positive('Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  inStock: z.boolean().default(true),
});

// Update item schema (all fields optional)
export const updateItemSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  price: z.number().positive().optional(),
  category: z.string().min(1).optional(),
  inStock: z.boolean().optional(),
});

// Item ID parameter schema
export const itemIdSchema = z.object({
  id: z.string().uuid('Invalid item ID format'),
});

// Query parameters schema
export const queryParamsSchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).default('1'),
  limit: z.string().regex(/^\d+$/).transform(Number).default('10'),
  category: z.string().optional(),
  search: z.string().optional(),
});

// Type exports
export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
export type ItemIdParams = z.infer<typeof itemIdSchema>;
export type QueryParams = z.infer<typeof queryParamsSchema>;

