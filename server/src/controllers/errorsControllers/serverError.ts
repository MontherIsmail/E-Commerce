import { Response, Request, NextFunction } from 'express';

const serverError = (err:any, req:Request, res:Response, next:NextFunction) => {
  if (err.details) {
    return res.status(400).json({ message: err.details[0].message });
  }
  // Log error details to help diagnose 500s in PM2 logs
  try {
    // Avoid logging huge objects; prefer message and stack
    const message = err?.message || 'Unknown server error';
    const stack = err?.stack;
    console.error('[ServerError]', message);
    if (stack) console.error(stack);
  } catch (_) {
    // noop
  }

  // Do not leak details to clients in production
  const isProd = process.env.NODE_ENV === 'production';
  const clientMessage = isProd ? 'internal server error ' : (err?.message || 'internal server error ');
  return res.status(500).json({ message: clientMessage });
};

export default serverError;