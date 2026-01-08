import { FastifyInstance, FastifyRequest, FastifyReply, RouteGenericInterface } from 'fastify';
import { itemService } from '../services/item.service.js';
import {
  createItemSchema,
  updateItemSchema,
  itemIdSchema,
  queryParamsSchema,
  CreateItemInput,
  UpdateItemInput,
  ItemIdParams,
  QueryParams,
} from '../schemas/item.schema.js';
import { randomUUID } from 'crypto';

interface CreateItemRoute extends RouteGenericInterface {
  Body: CreateItemInput;
}

interface UpdateItemRoute extends RouteGenericInterface {
  Params: ItemIdParams;
  Body: UpdateItemInput;
}

interface GetItemRoute extends RouteGenericInterface {
  Params: ItemIdParams;
}

interface ListItemsRoute extends RouteGenericInterface {
  Querystring: QueryParams;
}

interface DeleteItemRoute extends RouteGenericInterface {
  Params: ItemIdParams;
}

export async function itemRoutes(fastify: FastifyInstance) {
  // Create item
  fastify.post<CreateItemRoute>(
    '/items',
    {
      schema: {
        description: 'Create a new item',
        tags: ['items'],
        body: {
          type: 'object',
          required: ['name', 'price', 'category'],
          properties: {
            name: { type: 'string', minLength: 1, maxLength: 100 },
            description: { type: 'string', maxLength: 500 },
            price: { type: 'number', minimum: 0 },
            category: { type: 'string', minLength: 1 },
            inStock: { type: 'boolean' },
          },
        },
        response: {
          201: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  description: { type: 'string' },
                  price: { type: 'number' },
                  category: { type: 'string' },
                  inStock: { type: 'boolean' },
                  createdAt: { type: 'string' },
                  updatedAt: { type: 'string' },
                },
              },
            },
          },
        },
      } as any,
    },
    async (request: FastifyRequest<CreateItemRoute>, reply: FastifyReply) => {
      // Validate request body with Zod
      const validatedData = createItemSchema.parse(request.body);

      const now = new Date();
      const item = await itemService.create({
        ...validatedData,
        id: randomUUID(),
        createdAt: now,
        updatedAt: now,
      });

      reply.status(201).send({
        success: true,
        data: item,
      });
    }
  );

  // Get all items with pagination and filters
  fastify.get<ListItemsRoute>(
    '/items',
    {
      schema: {
        description: 'Get all items with pagination and filters',
        tags: ['items'],
        querystring: {
          type: 'object',
          properties: {
            page: { type: 'string', pattern: '^\\d+$' },
            limit: { type: 'string', pattern: '^\\d+$' },
            category: { type: 'string' },
            search: { type: 'string' },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        price: { type: 'number' },
                        category: { type: 'string' },
                        inStock: { type: 'boolean' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                      },
                    },
                  },
                  pagination: {
                    type: 'object',
                    properties: {
                      page: { type: 'number' },
                      limit: { type: 'number' },
                      total: { type: 'number' },
                      totalPages: { type: 'number' },
                    },
                  },
                },
              },
            },
          },
        },
      } as any,
    },
    async (request: FastifyRequest<ListItemsRoute>, reply: FastifyReply) => {
      // Validate query parameters with Zod
      const validatedQuery = queryParamsSchema.parse(request.query);

      const result = await itemService.findAll(validatedQuery);

      reply.send({
        success: true,
        data: result,
      });
    }
  );

  // Get item by ID
  fastify.get<GetItemRoute>(
    '/items/:id',
    {
      schema: {
        description: 'Get an item by ID',
        tags: ['items'],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  description: { type: 'string' },
                  price: { type: 'number' },
                  category: { type: 'string' },
                  inStock: { type: 'boolean' },
                  createdAt: { type: 'string' },
                  updatedAt: { type: 'string' },
                },
              },
            },
          },
          404: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              error: {
                type: 'object',
                properties: {
                  code: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
      } as any,
    },
    async (request: FastifyRequest<GetItemRoute>, reply: FastifyReply) => {
      // Validate params with Zod
      const validatedParams = itemIdSchema.parse(request.params);

      const item = await itemService.findById(validatedParams.id);

      reply.send({
        success: true,
        data: item,
      });
    }
  );

  // Update item
  fastify.put<UpdateItemRoute>(
    '/items/:id',
    {
      schema: {
        description: 'Update an item by ID',
        tags: ['items'],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
        },
        body: {
          type: 'object',
          properties: {
            name: { type: 'string', minLength: 1, maxLength: 100 },
            description: { type: 'string', maxLength: 500 },
            price: { type: 'number', minimum: 0 },
            category: { type: 'string', minLength: 1 },
            inStock: { type: 'boolean' },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  description: { type: 'string' },
                  price: { type: 'number' },
                  category: { type: 'string' },
                  inStock: { type: 'boolean' },
                  createdAt: { type: 'string' },
                  updatedAt: { type: 'string' },
                },
              },
            },
          },
        },
      } as any,
    },
    async (request: FastifyRequest<UpdateItemRoute>, reply: FastifyReply) => {
      // Validate params and body with Zod
      const validatedParams = itemIdSchema.parse(request.params);
      const validatedData = updateItemSchema.parse(request.body);

      const item = await itemService.update(validatedParams.id, {
        ...validatedData,
        updatedAt: new Date(),
      });

      reply.send({
        success: true,
        data: item,
      });
    }
  );

  // Delete item
  fastify.delete<DeleteItemRoute>(
    '/items/:id',
    {
      schema: {
        description: 'Delete an item by ID',
        tags: ['items'],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              message: { type: 'string' },
            },
          },
        },
      } as any,
    },
    async (request: FastifyRequest<DeleteItemRoute>, reply: FastifyReply) => {
      // Validate params with Zod
      const validatedParams = itemIdSchema.parse(request.params);

      await itemService.delete(validatedParams.id);

      reply.send({
        success: true,
        message: 'Item deleted successfully',
      });
    }
  );
}

