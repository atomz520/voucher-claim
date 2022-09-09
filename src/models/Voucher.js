const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Voucher.init({
    id: {
      type: DataTypes.BIGINT(20),
      autoIncrement: true,
      primaryKey: true
    },
    voucher_code: DataTypes.STRING,
    customer_id: DataTypes.BIGINT(20),
    expiry_date: DataTypes.DATE,
    claimed: DataTypes.BOOLEAN
  }, {
    sequelize,
    timestamps: false,
    modelName: 'voucher',
  });
  return Voucher;
};
