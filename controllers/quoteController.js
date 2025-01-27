const Quote = require('../models/Quote');

// Get Random Quote
exports.getRandomQuote = async (req, res, next) => {
  try {
    const quotes = await Quote.find();
    if (!quotes.length) return res.status(404).json({ message: 'No quotes available' });
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.status(200).json(randomQuote);
  } catch (err) {
    next(err);
  }
};

// Get Quote by Mood
exports.getQuoteByMood = async (req, res, next) => {
  const { mood } = req.params;
  try {
    const quotes = await Quote.find({ mood });
    if (!quotes.length) return res.status(404).json({ message: 'No quotes found for this mood' });
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.status(200).json(randomQuote);
  } catch (err) {
    next(err);
  }
};

// Get Quote by Category
exports.getQuoteByCategory = async (req, res, next) => {
  const { category } = req.params;
  try {
    const quotes = await Quote.find({ category });
    if (!quotes.length) return res.status(404).json({ message: 'No quotes found for this category' });
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.status(200).json(randomQuote);
  } catch (err) {
    next(err);
  }
};

// Add a New Quote
exports.addQuote = async (req, res, next) => {
  const { text, mood, category } = req.body;
  if (!text || !mood || !category) return res.status(400).json({ message: 'All fields are required' });

  try {
    const newQuote = new Quote({ text, mood, category });
    await newQuote.save();
    res.status(201).json(newQuote);
  } catch (err) {
    next(err);
  }
};