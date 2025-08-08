const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  try {
    const messages = await prisma.messages.findMany();
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.send("Message sent (placeholder)");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
