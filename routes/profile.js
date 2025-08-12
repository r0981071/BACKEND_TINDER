const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET profiles the user hasn't swiped on yet (optionally filtered)
router.get('/for-swipe/:userId', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);

    // Optional filters from query
    const { gender, minAge, maxAge } = req.query;
    // gender: "male" | "female" | undefined
    // minAge/maxAge: strings -> numbers
    const min = Number.isFinite(+minAge) ? parseInt(minAge) : null;
    const max = Number.isFinite(+maxAge) ? parseInt(maxAge) : null;

    // ids you already swiped (to exclude)
    const swipedIds = await prisma.swipes.findMany({
      where: { swiper_id: userId },
      select: { swiped_id: true }
    });
    const swipedIdList = swipedIds.map(e => e.swiped_id);

    // Build Prisma where dynamically
    const where = {
      profile_id: { notIn: [userId, ...swipedIdList] }
    };

    if (gender === 'male') where.gender_male = true;
    if (gender === 'female') where.gender_male = false;

    if (min !== null || max !== null) {
      where.age = {};
      if (min !== null) where.age.gte = min;
      if (max !== null) where.age.lte = max;
    }

    const profilesToSwipe = await prisma.profile.findMany({ where });
    res.json(profilesToSwipe);
  } catch (error) {
    next(error);
  }
});


// GET a profile by ID
router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const profile = await prisma.profile.findUnique({
      where: { profile_id: id }
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
});

// POST create or update profile safely
router.post('/', async (req, res, next) => {
  try {
    const {
      profile_id,
      name,
      gender_male,
      age,
      nationallity,
      height,
      weight,
      bio,
      profile_pic_url
    } = req.body;

    const existingProfile = await prisma.profile.findUnique({
      where: { profile_id }
    });

    let result;

    if (existingProfile) {
      // Update only the fields that are provided (non-undefined)
      result = await prisma.profile.update({
        where: { profile_id },
        data: {
          ...(name !== undefined && { name }),
          ...(gender_male !== undefined && { gender_male }),
          ...(age !== undefined && { age }),
          ...(nationallity !== undefined && { nationallity }),
          ...(height !== undefined && { height }),
          ...(weight !== undefined && { weight }),
          ...(bio !== undefined && { bio }),
          ...(profile_pic_url !== undefined && { profile_pic_url })
        }
      });
    } else {
      // Create full profile (all fields must be included)
      result = await prisma.profile.create({
        data: {
          profile_id, // FK to user_id
          name,
          gender_male,
          age,
          nationallity,
          height,
          weight,
          bio,
          profile_pic_url
        }
      });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});





module.exports = router;
