import Fastify from 'fastify';
import cors from '@fastify/cors';
import { errorHandler } from './utils/errors.js';
import { itemRoutes } from './routes/item.routes.js';
import { env } from './config/env.js';

const fastify = Fastify({
  logger: env.LOG_ENABLED
    ? {
        level: env.LOG_LEVEL,
        ...(env.NODE_ENV === 'development' && {
          transport: {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          },
        }),
      }
    : false,
});

// Register CORS
await fastify.register(cors, {
  origin: env.CORS_ORIGIN === 'true' ? true : env.CORS_ORIGIN,
  credentials: true,
});

// Global error handler
fastify.setErrorHandler(errorHandler);

// Health check endpoint
fastify.get('/health', async () => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
});

// Register routes
await fastify.register(itemRoutes);

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: env.PORT, host: env.HOST });
    console.log(`🚀 Server is running on http://${env.HOST}:${env.PORT}`);
    console.log(`📚 API Documentation available at http://${env.HOST}:${env.PORT}/docs`);
    console.log(`🌍 Environment: ${env.NODE_ENV}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

