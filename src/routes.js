const VoucherClaimController = require('./controllers/VoucherClaimController')
const Generate = require('./controllers/Generate')

module.exports = (app) => {
  app.post('/eligibility-check',
  VoucherClaimController.eligibilityCheck)

  app.post('/retrieve-voucher',
  VoucherClaimController.retrieveVoucher)

  app.get('/generate-vouchers',
  Generate.generateVouchers)

  app.get('/generate-transactions',
  Generate.generateTransactions)
}
