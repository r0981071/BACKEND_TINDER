var express = require('express');
var router = express.Router();

/* GET conversations for a user */
router.get('/', function(req, res, next) {
  const data = []; // Placeholder
  res.json(data);
});

/* POST to create a new conversation (optional) */
router.post('/', (req, res, next) => {
  res.send("Conversation created (placeholder)");
});

module.exports = router;
