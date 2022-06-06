const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");
const Users = require("./User");

const RefreshToken = sequelize.define(
  "refreshtokens",
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    token: {
      type: Sequelize.STRING,
      unique: "token",
    }
  }
);

// refreshtokens

RefreshToken.belongsTo(Users, { onDelete: "cascade" });
Users.hasMany(RefreshToken,  { onDelete: "cascade" })

module.exports = RefreshToken;


