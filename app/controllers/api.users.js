const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const { User } = require('../models');
const logger = require('../utils/logger');
const functions = require('../utils/functions');

const usersController = {

  async connecting(req, res) {
    try {
      // Save infos from req.body (form)
      const { email, password } = req.body;

      // QUERY : SELECT * FROM user WHERE email = $1;
      const connectingUser = await User.findOne({
        where: {
          email,
        },
      });
      // Checking if user exist before moving to the next step (creating token and giving access)
      if (!connectingUser) {
        throw new Error('User not found');
      }
      // If user exist, we check the password by comparing with the encrypted password in DB
      const connectinngPwd = await bcrypt.compare(password, connectingUser.password);
      // If (false) => No access and error 500
      if (!connectinngPwd) {
        throw new Error('Id KO');
      }
      // user connected, we create a token with JWT with info (id, isAdmin)
      const token = jwt.sign(
        {
          userId: connectingUser.id,
          userIsAdmin: connectingUser.isAdmin,
        },
        process.env.JWT_SECRET,
        // 24 hours later the connectinguser expires.
        { expiresIn: '24h' },
      );
      // we get connectinguser via a token sent to the Front end
      res.json({
        token,
      });
    } catch (error) {
      // If not, code 500 - Internal Server error
      res.status(500).json(error.toString());
    }
  },

  async getProfilePage(req, res) {
    try {
      // QUERY : SELECT * FROM user WHERE id = $1;
      const userConnected = await User.findByPk(req.user.userId);
      res.status(200).json({ userConnected });
    } catch (error) {
      // If not, code 500 - Internal Server error
      res.status(500).json(error.toString());
    }
  },

  async createUser(req, res) {
    try {
      // Save info from req.body (form)
      const {
        firstname, lastname, email, password, address, phone,
      } = req.body;
      // Save password after being crypted in DB
      const encryptedPwd = await bcrypt.hash(password, saltRounds);

      // Create user and insert what we got from req.body + enncrypted password
      // QUERY : INSERT INTO user ("firstname", "lastname", "email", "password")
      // VALUES ($1,$2,$3,$4) RETURNING *;
      const newUser = await User.build({
        firstname,
        lastname,
        email,
        password: encryptedPwd,
        address,
        phone,
      });

      await newUser.save();
      res.json(newUser);
    } catch (error) {
      // If not, code 500 - Internal Server error
      res.status(500).json(error.toString());
    }
  },

  async editUser(req, res) {
    try {
      // QUERY : UPDATE user SET ($1=$2) WHERE id = $3;
      const userConnected = await User.findByPk(req.user.userId);
      functions.patch(req.body, userConnected);
      await userConnected.save();
      res.json(userConnected);
    } catch (error) {
      // If not, code 500 - Internal Server error
      res.status(500).json(error.toString());
    }
  },

  async deleteUser(req, res) {
    try {
      // QUERY : DELETE FROM user WHERE id = $1;
      const userConnected = await User.findByPk(req.user.userId);
      await userConnected.destroy();
      res.json('Account deleted');
    } catch (error) {
      // If not, code 500 - Internal Server error
      res.status(500).json(error.toString());
    }
  },
  async getAllAccountAsAdmin(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      // If not, code 500 - Internal Server error
      res.status(500).json(error.toString());
    }
  },

  async checkTest(req, res) {
    try {
      // eslint-disable-next-line prefer-destructuring
      const email = req.query.email;
      logger.log(req.query);
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    } catch (error) {
      // If not, code 500 - Internal Server error
      res.status(500).json(error.toString());
    }
  },
};

module.exports = usersController;
