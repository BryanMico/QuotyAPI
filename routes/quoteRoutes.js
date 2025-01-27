const express = require('express');
const { getRandomQuote, getQuoteByMood, getQuoteByCategory, addQuote } = require('../controllers/quoteController');

const router = express.Router();

router.get('/', getRandomQuote);
router.get('/mood/:mood', getQuoteByMood);
router.get('/category/:category', getQuoteByCategory);
router.post('/', addQuote);

module.exports = router;