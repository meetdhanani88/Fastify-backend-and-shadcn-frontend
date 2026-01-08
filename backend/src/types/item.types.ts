import { CreateItemInput, UpdateItemInput } from '../schemas/item.schema.js';

export interface Item {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateItemData {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateItemData extends Partial<UpdateItemInput> {
  updatedAt: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

