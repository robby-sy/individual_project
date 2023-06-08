'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.User)
      Project.belongsToMany(models.User,{through:"UserProjects"})
    }
  }
  Project.init({
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    picture1: DataTypes.STRING,
    picture2: DataTypes.STRING,
    picture3: DataTypes.STRING,
    location: DataTypes.STRING,
    record: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    component: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};