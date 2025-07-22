const express = require('express');
const router = express.Router();
const logController = require('../controllers/log');


router.post('/logging', logController.createLog);
router.get("/all-logs", logController.getAllLogs);

module.exports = router;
