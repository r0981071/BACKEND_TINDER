var express = require('express');
var router = express.Router();

/* GET messages for a conversation */
router.get('/', function(req, res, next) {
  const data = []; // Placeholder
  res.json(data);
});

/* POST a new message */
router.post('/', (req, res, next) => {
  res.send("Message sent (placeholder)");
});

module.exports = router;
