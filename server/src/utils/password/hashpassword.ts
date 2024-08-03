import bcrypt from 'bcryptjs';

const hashPassword = (password: any) => bcrypt.hash(password, 10);
export default hashPassword;