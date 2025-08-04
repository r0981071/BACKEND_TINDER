var express = require('express');
var router = express.Router();

/* GET all swipes */
router.get('/', function(req, res, next) {
  const data = []; // Placeholder
  res.json(data);
});

/* POST new swipe */
router.post('/', (req, res, next) => {
  res.send("Swipe recorded (placeholder)");
});

module.exports = router;
