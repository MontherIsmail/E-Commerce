import bcrypt from 'bcryptjs';

const comparePassword = (password: any, hashedPassword: any) => bcrypt.compare(password, hashedPassword);

export default comparePassword;