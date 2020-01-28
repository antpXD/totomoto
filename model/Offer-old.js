const mongoose = require('mongoose');

const OfferSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    refer: 'users'
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: false
  },
  image: {
    type: Array,
    required: true
  },
  bodyType: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: false
  },
  year: {
    type: String,
    required: false
  },
  fuelType: {
    type: String,
    required: false
  },
  engineSize: {
    type: String,
    required: false
  },
  enginePower: {
    type: String,
    required: false
  },
  mileage: {
    type: String,
    required: false
  },
  price: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('offer', OfferSchema);
