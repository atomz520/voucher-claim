const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PurchaseTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PurchaseTransaction.init({
    id: {
      type: DataTypes.BIGINT(20),
      autoIncrement: true,
      primaryKey: true
    },
    customer_id: DataTypes.BIGINT(20),
    total_spent: DataTypes.DECIMAL(10,2),
    total_saving: DataTypes.DECIMAL(10,2),
    transaction_at: DataTypes.DATE,
  }, {
    sequelize,
    timestamps: false,
    modelName: 'purchase_transaction',
  });
  return PurchaseTransaction;
};
