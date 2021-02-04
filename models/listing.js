/* eslint-disable */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(this);
      this.belongsTo(models.User);
    }
  };
  Listing.init({
    title: {
      allowNull: false, 
      type: DataTypes.STRING 
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING
    },
    UserId: {
      allowNull: false,
      references: {
        model: {
          tableName: 'Users',
          schema: 'public'
        },
        key: 'id'
      },
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Listing',
  });
  return Listing;
};