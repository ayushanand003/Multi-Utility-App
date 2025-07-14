const express = require('express');
const router = express.Router();
const Calculation = require('../models/Calculation'); // import model

// POST /api/calculate
router.post('/', async (req, res) => {
  const { num1, num2, operation } = req.body;

  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({ error: 'Inputs must be numbers' });
  }

  let result;
  switch (operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      if (num2 === 0) return res.status(400).json({ error: 'Division by zero' });
      result = num1 / num2;
      break;
    default:
      return res.status(400).json({ error: 'Invalid operation' });
  }

  try {
    // Save to DB
    const newCalculation = new Calculation({ num1, num2, operation, result });
    await newCalculation.save();

    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/calculate/history
router.get('/history', async (req, res) => {
  try {
    const history = await Calculation.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/calculate/history
router.delete('/history', async (req, res) => {
  try {
    await Calculation.deleteMany({});
    res.json({ message: 'History cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
// DELETE /api/calculate/history
router.delete('/history', async (req, res) => {
  try {
    await Calculation.deleteMany({});
    res.json({ message: 'History cleared' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
