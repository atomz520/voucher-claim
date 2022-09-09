const db = require('../models');
const { Op } = require('sequelize');

function photoApi() {
  return true;
}

module.exports = {
  async eligibilityCheck (req, res) {
    const currentTime = new Date();
    try {
      // Check if customer is valid
      const user = await db.customer.findOne({
        where: {
          id: req.body.customer_id
        }
      });
      if(!user) {
        throw 'Invalid customer_id'
      }
      // Check if customer already claimed voucher
      const voucherClaimed = await db.voucher.findOne({
        where: {
          customer_id: req.body.customer_id,
          claimed : true
        }
      });
      if(voucherClaimed) {
        throw 'Already claimed'
      }
      // Check if customer already has a reserved voucher
      const expiryDate = new Date(currentTime);
      console.log(expiryDate)
      expiryDate.setMinutes(expiryDate.getMinutes() + 10)
      console.log(expiryDate)
      const alreadyVerified = await db.voucher.findOne({
        where: {
          customer_id: req.body.customer_id,
          expiry_date : {[Op.between] : [currentTime , expiryDate ] }
        }
      });
      if(alreadyVerified) {
        throw 'Already have a reserved voucher'
      }
      // Check if transactions are 3 or more
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - 30)
      const transactions = await db.purchase_transaction.findAll({
        where: {
          customer_id: req.body.customer_id,
          transaction_at : {[Op.between] : [startDate , currentTime ]}
        }
      });
      console.log('Length ' + transactions.length)
      if(transactions.length < 3) {
        throw 'Less than 3 transactions'
      }
      //Check if transactions are > $100
      let totalSpent = 0
      transactions.forEach(({total_spent}) => {
        totalSpent += total_spent
      })
      console.log(totalSpent)
      if(totalSpent < 100) {
        throw 'Total spent less than $100'
      }
      // Reserve voucher
      const voucher = await db.voucher.findOne({
        where: {
          claimed: false,
          expiry_date : {[Op.lt] : currentTime }
        }
      });
      voucher.customer_id = req.body.customer_id
      voucher.expiry_date = currentTime.setMinutes(currentTime.getMinutes() + 10)
      await voucher.save();
      let success = true;
      res.status(200).send({
        success:{
          eligible: true
        }
      })
    } catch (err) {
      res.status(400).send({
        error: {
          title: `There was an error with the request`,
          detail: err
        }
      })
    }
  },
  async retrieveVoucher (req, res) {
    try {
      const user = await db.customer.findOne({
        where: {
          id: req.body.customer_id
        }
      });
      if(!user) {
        throw 'Invalid customer_id'
      }
      // Mock Photo Recognition API
      if(!photoApi()) {
        throw 'Failed photo verification'
      }
      // Check for allocated voucher
      const voucher = await db.voucher.findOne({
        where: {
          customer_id: user.id
        }
      });
      if(!voucher) {
        throw 'No voucher allocated'
      }
      if(voucher.claimed) {
        throw 'Already claimed voucher'
      }
      voucher.claimed = true
      await voucher.save()
      res.status(200).send({
        success: {
          voucher_code: voucher.voucher_code
        }
      })
    } catch (err) {
      res.status(400).send({
        error: {
          title: `There was an error with the request`,
          detail: err
        }
      })
    }
  }
}