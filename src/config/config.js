module.exports = {
  port: process.env.PORT || 8088,
  db: {
    database: process.env.DB_NAME || 'voucher-claim',
    user: process.env.DB_USER || 'voucher-claim',
    password: process.env.DB_PASS || 'voucher-claim',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './voucher-claim.sqlite'
    }
  }
}
