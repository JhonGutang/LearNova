const express = require('express');
const router = express.Router();

// Sample route for modules
router.get('/sample', (req, res) => {
  res.json({ message: 'This is a sample route for modules.' });
});

module.exports = router;
