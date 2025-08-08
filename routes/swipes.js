const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  try {
    const swipes = await prisma.swipes.findMany();
    res.json(swipes);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.send("Swipe recorded (placeholder)");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
