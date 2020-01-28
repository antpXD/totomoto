//register a user
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../model/User");

//creating http requests

//@route    POST api/users
//@desc     Register a user
//@access   Public
router.post(
  "/",
  [
    check("name", "Name can't be empty")
      .not()
      .isEmpty(),
    check("email", "Wrong E-mail").isEmail(),
    check("password", "Password has to be at least 6 characters.").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    //error checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({ msg: "Name or E-mail is already taken" });
      }

      user = new User({
        name: name,
        email: email,
        password: password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //payload that is being sent in the token
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router; //exports
