const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all matches for a user
router.get('/:userId', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);

    const matches = await prisma.matches.findMany({
      where: {
        OR: [
          { user1_id: userId },
          { user2_id: userId }
        ]
      }
    });

    res.json(matches);
  } catch (error) {
    next(error);
  }
});

module.exports = router;  

