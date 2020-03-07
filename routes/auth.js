//authentication of a user

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../model/User");

//@route    GET api/auth
//@desc     Get logged in user
//@access   Private
//          we use middleware in private access by passing it as a second parameter
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

//@route    POST api/auth
//@desc     Auth user & get token
//@access   Public
router.post(
  "/",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    //error checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      // jezeli nie ma takiego uzytkownika
      if (!user) {
        return res.status(400).json({ msg: "User doesn't exist" });
      }

      //jezeli zle haslo
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Wrong password" });
      }

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
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router; //po prostu trzeba
