var express = require('express');
var router = express.Router();

/* GET all matches */
router.get('/', function(req, res, next) {
  const data = []; // Placeholder
  res.json(data);
});

/* POST new match (manual or future auto-trigger) */
router.post('/', (req, res, next) => {
  res.send("Match created (placeholder)");
});

module.exports = router;
