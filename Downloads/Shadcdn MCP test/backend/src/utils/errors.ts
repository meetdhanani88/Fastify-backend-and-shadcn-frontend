import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { AppError } from '../types/index.js';

export class HttpError extends Error implements AppError {
  statusCode: number;
  code: string;

  constructor(statusCode: number, message: string, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code || 'HTTP_ERROR';
    this.name = 'HttpError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = 'Resource not found') {
    super(404, message, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string = 'Bad request') {
    super(400, message, 'BAD_REQUEST');
    this.name = 'BadRequestError';
  }
}

export class ValidationError extends HttpError {
  constructor(message: string = 'Validation error') {
    super(422, message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string = 'Internal server error') {
    super(500, message, 'INTERNAL_SERVER_ERROR');
    this.name = 'InternalServerError';
  }
}

export function errorHandler(
  error: Error | AppError | ZodError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  const anyError = error as any;

  // Handle Fastify schema validation errors (AJV)
  if (anyError?.code === 'FST_ERR_VALIDATION' && Array.isArray(anyError.validation)) {
    const details = anyError.validation.map((v: any) => ({
      field: (v.instancePath || v.dataPath || '').replace(/^\//, '') || undefined,
      message: v.message,
      keyword: v.keyword,
    }));

    return reply.status(400).send({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details,
      },
    });
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const formattedErrors = error.errors.map((err: { path: (string | number)[]; message: string }) => ({
      field: err.path.join('.'),
      message: err.message,
    }));

    return reply.status(422).send({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: formattedErrors,
      },
    });
  }

  // Handle custom HTTP errors
  if (error instanceof HttpError) {
    return reply.status(error.statusCode).send({
      success: false,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  }

  // Handle unknown errors
  request.log.error(error);
  
  return reply.status(500).send({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: process.env.NODE_ENV === 'production' 
        ? 'An unexpected error occurred' 
        : error.message,
    },
  });
}

