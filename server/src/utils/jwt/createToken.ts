import * as dotenv from 'dotenv';
import { sign } from 'jsonwebtoken';

dotenv.config();
const createToken = (payLoad: any) => new Promise((resolve, reject) => {
    const privateKey = process.env.PRIVATE_KEY;
    if(!privateKey){
        throw new Error('JWT_SECRET is not defined');
    }else{
        sign(payLoad, privateKey, (err: any, token: any) => {
          if (err) {
            return reject(err);
          }
      
          return resolve(token);
        });
    }
});

export default createToken;