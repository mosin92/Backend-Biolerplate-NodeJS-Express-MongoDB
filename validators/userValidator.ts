import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from 'utils/errors';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return next(new BadRequestError('Name is required'));
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    return next(new BadRequestError('A valid email is required'));
  }

  next();
};

export { validateUser };
