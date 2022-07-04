export default {
  jwt: {
    secret: process.env.TOKEN_SECRET || 'token',
    expiresIn: '1d',
  },
};
