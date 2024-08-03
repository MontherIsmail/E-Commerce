import { verify } from 'jsonwebtoken';

const verifyToken = (token: any, privateKey: any) => new Promise((resolve, reject) => {
  verify(token, privateKey, (err: any, decoded: any) => {
    if (err) return reject(err);

    return resolve(decoded);
  });
});

export default verifyToken;