import { Response } from 'express';

const successResponse = <T>(res: Response, message: string, data: T | null = null, statusCode = 200): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

const errorResponse = (res: Response, message: string, statusCode = 500): void => {
  res.status(statusCode).json({
    success: false,
    message
  });
};

export { successResponse, errorResponse };
