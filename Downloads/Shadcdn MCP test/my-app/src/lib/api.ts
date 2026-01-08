/**
 * API Configuration and Service Functions
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Item {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemInput {
  name: string;
  description?: string;
  price: number;
  category: string;
  inStock?: boolean;
}

export interface UpdateItemInput {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  inStock?: boolean;
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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Array<{
      field?: string;
      message: string;
      keyword?: string;
    }>;
  };
}

export interface QueryParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

export class ApiError extends Error {
  status: number;
  code: string;
  details?: ApiErrorResponse['error']['details'];

  constructor(
    status: number,
    code: string,
    message: string,
    details?: ApiErrorResponse['error']['details']
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      if (data.error) {
        throw new ApiError(
          response.status,
          data.error.code,
          data.error.message,
          data.error.details
        );
      }
      throw new ApiError(response.status, 'UNKNOWN_ERROR', `HTTP ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export const api = {
  // Health check
  health: () => request<{ status: string; timestamp: string; uptime: number }>('/health'),

  // Items CRUD
  items: {
    // Create item
    create: (data: CreateItemInput) =>
      request<ApiResponse<Item>>('/items', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    // Get all items
    getAll: (params?: QueryParams) => {
      const queryString = new URLSearchParams();
      if (params?.page) queryString.append('page', params.page.toString());
      if (params?.limit) queryString.append('limit', params.limit.toString());
      if (params?.category) queryString.append('category', params.category);
      if (params?.search) queryString.append('search', params.search);

      const query = queryString.toString();
      return request<ApiResponse<PaginatedResponse<Item>>>(
        `/items${query ? `?${query}` : ''}`
      );
    },

    // Get item by ID
    getById: (id: string) =>
      request<ApiResponse<Item>>(`/items/${id}`),

    // Update item
    update: (id: string, data: UpdateItemInput) =>
      request<ApiResponse<Item>>(`/items/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),

    // Delete item
    delete: (id: string) =>
      request<ApiResponse<{ message: string }>>(`/items/${id}`, {
        method: 'DELETE',
      }),
  },
};

