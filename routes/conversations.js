const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  try {
    const conversations = await prisma.conversations.findMany();
    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.send("Conversation created (placeholder)");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
