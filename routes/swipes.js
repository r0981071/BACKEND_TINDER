const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all swipes (optional for debugging)
router.get('/', async (req, res, next) => {
  try {
    const swipes = await prisma.swipes.findMany();
    res.json(swipes);
  } catch (error) {
    next(error);
  }
});

// POST a new swipe
router.post('/', async (req, res, next) => {
  try {
    const { swiper_id, swiped_id, is_like } = req.body;

    // ✅ Prevent self-swiping
    if (swiper_id === swiped_id) {
      return res.status(400).json({ error: "Cannot swipe yourself." });
    }

    // ✅ Prevent duplicate swipes
    const existingSwipe = await prisma.swipes.findUnique({
      where: {
        swiper_id_swiped_id: {
          swiper_id,
          swiped_id
        }
      }
    });

    if (existingSwipe) {
      return res.status(409).json({ error: "Swipe already exists." });
    }

    // ✅ Save the new swipe
    const newSwipe = await prisma.swipes.create({
      data: {
        swiper_id,
        swiped_id,
        is_like
      }
    });

    // ✅ If it's a like, check for a mutual like
    if (is_like) {
      const reverseSwipe = await prisma.swipes.findUnique({
        where: {
          swiper_id_swiped_id: {
            swiper_id: swiped_id,
            swiped_id: swiper_id
          }
        }
      });

      if (reverseSwipe && reverseSwipe.is_like) {
        // ✅ Prevent duplicate matches
        const existingMatch = await prisma.matches.findUnique({
          where: {
            user1_id_user2_id: {
              user1_id: Math.min(swiper_id, swiped_id),
              user2_id: Math.max(swiper_id, swiped_id)
            }
          }
        });

        if (!existingMatch) {
          await prisma.matches.create({
            data: {
              user1_id: Math.min(swiper_id, swiped_id),
              user2_id: Math.max(swiper_id, swiped_id)
            }
          });
        }
      }
    }

    res.json(newSwipe);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
