import { Response, Request, NextFunction } from 'express';

const clientError = (req: Request, res: Response, next:NextFunction) => {
  res.status(404).json({ message: 'Page Not Found' });
};

export default clientError;