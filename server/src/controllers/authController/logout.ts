import { Response, Request } from 'express';

const logout = (req: Request, res: Response) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: '/',
  });
  
  return res.status(200).json({ message: 'logout successfully' });
};

export default logout;