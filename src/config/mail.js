export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_HOST,
    pass: process.env.MAIL_HOST,
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
};
