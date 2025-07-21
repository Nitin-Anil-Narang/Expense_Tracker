const express = require("express");
const router = express.Router();
const pool = require('../DB/connect');

router.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    console.log('Query result:', result.rows);
    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
})

module.exports = router;