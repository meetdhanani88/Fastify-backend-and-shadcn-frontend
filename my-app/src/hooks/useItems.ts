import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import type { Item, CreateItemInput, UpdateItemInput, QueryParams, PaginatedResponse } from '../lib/api';

interface UseItemsReturn {
  items: Item[];
  pagination: PaginatedResponse<Item>['pagination'] | null;
  loading: boolean;
  error: string | null;
  createItem: (data: CreateItemInput) => Promise<Item>;
  updateItem: (id: string, data: UpdateItemInput) => Promise<Item>;
  deleteItem: (id: string) => Promise<void>;
  refreshItems: () => Promise<void>;
  setQueryParams: (params: QueryParams) => void;
}

export function useItems(initialParams?: QueryParams): UseItemsReturn {
  const [items, setItems] = useState<Item[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<Item>['pagination'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [queryParams, setQueryParams] = useState<QueryParams>(initialParams || {});

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.items.getAll(queryParams);
      setItems(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch items';
      setError(message);
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createItem = useCallback(async (data: CreateItemInput): Promise<Item> => {
    // Generate temporary ID for optimistic update
    const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();
    
    // Create temporary item for optimistic update
    const tempItem: Item = {
      id: tempId,
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      inStock: data.inStock ?? true,
      createdAt: now,
      updatedAt: now,
    };

    // Store previous state for potential rollback
    const previousItems = [...items];
    const previousPagination = pagination ? { ...pagination } : null;

    // Optimistic update: Add item to UI immediately
    const updatedItems = [tempItem, ...items];
    setItems(updatedItems);

    // Update pagination optimistically
    if (previousPagination) {
      setPagination({
        ...previousPagination,
        total: previousPagination.total + 1,
      });
    }

    try {
      // Make the actual API call
      const response = await api.items.create(data);
      const newItem = response.data;
      
      // Replace temporary item with real item from server
      setItems(currentItems => 
        currentItems.map(item => 
          item.id === tempId ? newItem : item
        )
      );
      
      return newItem;
    } catch (err) {
      // Revert the optimistic update on error
      setItems(previousItems);
      if (previousPagination) {
        setPagination(previousPagination);
      }
      
      const message = err instanceof Error ? err.message : 'Failed to create item';
      setError(message);
      throw err;
    }
  }, [items, pagination]);

  const updateItem = useCallback(async (id: string, data: UpdateItemInput): Promise<Item> => {
    try {
      const response = await api.items.update(id, data);
      await fetchItems(); // Refresh list
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update item';
      setError(message);
      throw err;
    }
  }, [fetchItems]);

  const deleteItem = useCallback(async (id: string): Promise<void> => {
    // Store previous state for potential rollback
    const previousItems = [...items];
    const previousPagination = pagination ? { ...pagination } : null;

    // Optimistic update: Remove item from UI immediately
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);

    // Update pagination optimistically
    if (previousPagination) {
      setPagination({
        ...previousPagination,
        total: Math.max(0, previousPagination.total - 1),
      });
    }

    try {
      // Make the actual API call
      await api.items.delete(id);
      // If successful, the optimistic update was correct
      // Optionally refresh to ensure consistency with server
      // await fetchItems();
    } catch (err) {
      // Revert the optimistic update on error
      setItems(previousItems);
      if (previousPagination) {
        setPagination(previousPagination);
      }
      
      const message = err instanceof Error ? err.message : 'Failed to delete item';
      setError(message);
      throw err;
    }
  }, [items, pagination]);

  return {
    items,
    pagination,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    refreshItems: fetchItems,
    setQueryParams,
  };
}

