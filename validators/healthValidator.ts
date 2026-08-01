import { Request, Response, NextFunction } from 'express';

const validateHealthRequest = (req: Request, res: Response, next: NextFunction): void => {
  next();
};

export { validateHealthRequest };
