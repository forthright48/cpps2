module.exports = {
  secret: process.env.SECRET,
  dburl: process.env.DB_URL,
  mailApi: 'secret-mail-api',
  siteName: process.env.SITE_NAME,
  domain: 'localhost:8000',
  subdomain: 'www',
  recaptcha: {
    site: 'some-site',
    secret: 'some-secret',
  },
  ojscraper: {
    loj: {
      credential: {
        userId: 'some-id',
        password: 'some-password',
      },
    },
  },
};
