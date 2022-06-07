// Create admin
const Users = require("../models/User");
const bcrypt = require("bcryptjs");

const createAdmin = async () => {
 
    Users.findOne({
      where: {email: "admin@groupomania.com"}
    }).then( async (result) => {
      if (!result) {
        password = process.env.ADMIN_PASS;
        const hashedPass = await bcrypt.hash( password, 12 );
        const newUser = await Users.create({
          email: "admin@groupomania.com",
          password: hashedPass,
          lastName: process.env.ADMIN_LASTNAME,
          name: process.env.ADMIN_NAME,
          role: "admin",
          isActive: 1
        });
      }
    })
  }
  
  module.exports = createAdmin;