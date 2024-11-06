// const express = require('express');
// const Property = require('../models/Property');
// const router = express.Router();

// // Get all properties
// router.get('/', async (req, res) => {
//   try {
//     const properties = await Property.find({});
//     res.status(200).json(properties);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Add a new property
// router.post('/', async (req, res) => {
//   try {
//     const property = new Property(req.body);
//     await property.save();
//     res.status(201).json(property);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// module.exports = router;

const express = require('express');
const Property = require('../models/Property');
const router = express.Router();

// GET all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find({});
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new property
router.post('/', async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
