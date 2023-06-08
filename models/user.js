'use strict';
const {hashPassword} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Project,{through:"UserProjects"})
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        notNull:{
          msg:"email is required"
        },
        notEmpty:{
          msg:"email is required"
        },
        isEmail:{
          msg:"format email is invalid"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"password is required"
        },
        notEmpty:{
          msg:"password is required"
        }
      }
    },
    first_name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"first name is required"
        },
        notEmpty:{
          msg:"first name is required"
        }
      }
    },
    last_name: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    province: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"province is required"
        },
        notEmpty:{
          msg:"province is required"
        }
      }
    }
  }, {
    hooks:{
      beforeCreate:(instance)=>{
        const hash = hashPassword(instance.password)
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};