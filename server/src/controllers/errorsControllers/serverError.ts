import { Response, Request, NextFunction } from 'express';

const serverError = (err:any, req:Request, res:Response, next:NextFunction) => {
  if (err.details) {
    return res.status(400).json({ message: err.details[0].message });
  }
  return res.status(500).json({ message: 'internal server error ' });
};

export default serverError;