const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  try {
    const matches = await prisma.matches.findMany();
    res.json(matches);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.send("Match created (placeholder)");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
