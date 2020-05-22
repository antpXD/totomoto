//CRUD offers

const express = require("express");
const router = express.Router();
// middleware is for protected routes
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const Offer = require("../model/Offer");

//CREATING HTTP ROUTES/REQUESTS

//@route    GET api/offers
//@desc     Get users offers
//@access   Private
//    we use middleware in private access by passing it as a second parameter
router.get("/", auth, async (req, res) => {
  try {
    const offers = await Offer.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(offers);
  } catch (err) {
    console.log(err);
    console.log(process.env);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let offer = await Offer.findById(req.params.id);

    if (!offer) return res.status(404).json({ msg: "Offer not found" });

    res.json(offer);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/main/all", async (req, res) => {
  try {
    const offers = await Offer.find({}).sort({
      date: -1,
    });
    res.json(offers);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/offers
//@desc     Add new offers
//@access   Private
router.post(
  "/",
  [
    auth, //allows us to get logged in user's id
    [
      check("make", "Make is required").not().isEmpty(),
      check("model", "Model is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //pulling out the data from the body
    const {
      make,
      image,
      email,
      model,
      bodyType,
      price,
      mileage,
      year,
      fuelType,
      engineSize,
      enginePower,
      condition,
      description,
    } = req.body;

    try {
      const newOffer = new Offer({
        make: make,
        model: model,
        image: image,
        bodyType: bodyType,
        condition: condition,
        year: year,
        fuelType: fuelType,
        email: email,
        engineSize: engineSize,
        enginePower: enginePower,
        mileage: mileage,
        price: price,
        description: description,
        user: req.user.id,
      });
      const offer = await newOffer.save();
      res.json(offer);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post(
  "/upload",
  [
    auth, //allows us to get logged in user's id
  ],
  async (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: "Choose image to upload." });
    }

    const file = req.files.image;

    file.mv(`client/public/uploads/${file.name}`, (err) => {
      if (err) {
        // console.error(err);
        return res.status(500).send("Server Error");
      }
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
  }
);

//@route    PUT api/offers/:id    - :id is placeholder for whatever offer we want to update
//@desc     Update offer
//@access   Private
router.put("/:id", auth, async (req, res) => {
  const {
    make,
    image,
    email,
    model,
    bodyType,
    price,
    mileage,
    year,
    fuelType,
    engineSize,
    enginePower,
    condition,
    description,
  } = req.body;

  //Build offer object
  const offerFields = {};
  if (make) offerFields.make = make;
  if (model) offerFields.model = model;
  if (image) offerFields.image = image;
  if (bodyType) offerFields.bodyType = bodyType;
  if (condition) offerFields.condition = condition;
  if (year) offerFields.year = year;
  if (fuelType) offerFields.fuelType = fuelType;
  if (engineSize) offerFields.engineSize = engineSize;
  if (enginePower) offerFields.enginePower = enginePower;
  if (mileage) offerFields.mileage = mileage;
  if (price) offerFields.price = price;
  if (description) offerFields.description = description;
  if (email) offerFields.email = email;

  try {
    let offer = await Offer.findById(req.params.id);

    if (!offer) return res.status(404).json({ msg: "Offer not found" });

    //Make sure user owns offer
    if (offer.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    offer = await Offer.findByIdAndUpdate(
      req.params.id,
      { $set: offerFields },
      { new: true }
    );

    res.json(offer);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    DELETE api/offers/:id
//@desc     Delete offer
//@access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    //finds offer by id (from url)
    let offer = await Offer.findById(req.params.id);

    if (!offer) return res.status(404).json({ msg: "Offer not found" });

    //Make sure user owns offer
    if (offer.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Offer.findByIdAndRemove(req.params.id);

    res.json("Offer removed.");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router; //po prostu trzeba
