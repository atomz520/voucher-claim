const { faker } = require('@faker-js/faker');
const db = require('../models');

module.exports = {
  async generateVouchers (req, res) {
    try {
      for(var i = 0; i < 500; i++){
        const newVoucher =  db.voucher.build({
          voucher_code: faker.random.alphaNumeric(20),
          expiry_date: '2022-01-01T00:00:00.000Z',
          claimed: false
        });
        await newVoucher.save();
      }
      res.status(204).send()
    } catch (err) {
      console.log(err)
      res.status(400).send({
        message: `The student has not been registered`,
        error: err
      })
    }
  },
  async generateTransactions (req, res) {
    try {
      for(var i = 0; i < 10; i++){
        let firstname = faker.name.firstName();
        const newCustomer =  db.customer.build({
          first_name: firstname,
          last_name: faker.name.lastName(),
          gender: faker.name.sex(),
          date_of_birth: faker.date.birthdate(),
          contact_number: faker.phone.number('+65 9#######'),
          email: firstname + '@example.com',
          created_at: faker.date.past(),
          updated_at: new Date()
        });
        await newCustomer.save();
      }

      for(var i = 0; i < 500; i++){
        let spent = Math.random()* 100
        const newTransaction =  db.purchase_transaction.build({
          customer_id: Math.floor(Math.random()* 10) + 1,
          total_spent: spent.toFixed(2),
          total_saving: (spent / 10).toFixed(2),
          transaction_at: faker.date.between('2022-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z')
        });
        await newTransaction.save();
      }
      res.status(204).send()
    } catch (err) {
      console.log(err)
      res.status(400).send({
        message: `The student has not been registered`,
        error: err
      })
    }
  },
}