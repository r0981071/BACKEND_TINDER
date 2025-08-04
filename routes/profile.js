var express = require('express');
var router = express.Router();

/* GET all profiles */
router.get('/', function(req, res, next) {
  const data = []; // Placeholder
  res.json(data);
});

/* POST create or update a profile */
router.post('/', (req, res, next) => {
  res.send("Profile created/updated (placeholder)");
});

module.exports = router;
