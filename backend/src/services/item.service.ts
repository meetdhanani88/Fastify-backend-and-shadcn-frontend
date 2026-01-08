import { NotFoundError } from '../utils/errors.js';
import { Item, CreateItemData, UpdateItemData, PaginatedResponse } from '../types/item.types.js';
import { QueryParams } from '../schemas/item.schema.js';

// In-memory store (replace with database in production)
const items: Item[] = [];

export class ItemService {
  async create(data: CreateItemData): Promise<Item> {
    const item: Item = {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      inStock: data.inStock,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };

    items.push(item);
    return item;
  }

  async findAll(query: QueryParams): Promise<PaginatedResponse<Item>> {
    let filteredItems = [...items];

    // Filter by category if provided
    if (query.category) {
      filteredItems = filteredItems.filter(
        (item) => item.category.toLowerCase() === query.category!.toLowerCase()
      );
    }

    // Search by name or description
    if (query.search) {
      const searchLower = query.search.toLowerCase();
      filteredItems = filteredItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower)
      );
    }

    // Pagination
    const total = filteredItems.length;
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(total / limit);

    const paginatedItems = filteredItems.slice(skip, skip + limit);

    return {
      data: paginatedItems,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async findById(id: string): Promise<Item> {
    const item = items.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundError(`Item with id ${id} not found`);
    }
    return item;
  }

  async update(id: string, data: UpdateItemData): Promise<Item> {
    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      throw new NotFoundError(`Item with id ${id} not found`);
    }

    const existingItem = items[itemIndex];
    const updatedItem: Item = {
      ...existingItem,
      ...data,
      updatedAt: data.updatedAt,
    };

    items[itemIndex] = updatedItem;
    return updatedItem;
  }

  async delete(id: string): Promise<void> {
    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      throw new NotFoundError(`Item with id ${id} not found`);
    }

    items.splice(itemIndex, 1);
  }
}

export const itemService = new ItemService();

