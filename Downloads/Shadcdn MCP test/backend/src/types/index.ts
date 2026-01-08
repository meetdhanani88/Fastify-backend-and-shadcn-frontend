import { FastifyRequest, FastifyReply } from 'fastify';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

export interface RouteHandler {
  (request: FastifyRequest, reply: FastifyReply): Promise<void>;
}

