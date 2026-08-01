import { Request, Response } from 'express';
import { successResponse } from 'utils/response';

const getHealth = (req: Request, res: Response): void => {
  successResponse(res, 'Server is healthy', { timestamp: new Date().toISOString() });
};

export { getHealth };
