import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import config from 'config';

interface MongoServerErrorLike extends Error {
  code?: number;
  keyValue?: Record<string, unknown>;
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err);

  const appErr = err as Error & { statusCode?: number; status?: number; isOperational?: boolean };
  let statusCode = appErr.statusCode || appErr.status || 500;
  let message = err.message || 'Internal server error';

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  } else if ((err as MongoServerErrorLike).code === 11000) {
    statusCode = 409;
    const field = Object.keys((err as MongoServerErrorLike).keyValue || {})[0] || 'field';
    message = `${field} already exists`;
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  if (statusCode === 500 && config.nodeEnv === 'production' && !appErr.isOperational) {
    message = 'Internal server error';
  }

  res.status(statusCode).json({
    success: false,
    message
  });
};

export default errorHandler;
