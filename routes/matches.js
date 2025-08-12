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

router.get('/list/:userId', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);

    const rows = await prisma.matches.findMany({
      where: { OR: [{ user1_id: userId }, { user2_id: userId }] },
      orderBy: { match_id: 'desc' }
    });

    const otherIds = rows.map(r => (r.user1_id === userId ? r.user2_id : r.user1_id));
    const profiles = await prisma.profile.findMany({
      where: { profile_id: { in: otherIds } }
    });

    // return minimal fields the UI needs
    const out = profiles.map(p => ({
      user_id: p.profile_id,
      name: p.name,
      username: null,            // keep field just in case UI checks it
      profile_pic_url: p.profile_pic_url
    }));

    res.json(out);
  } catch (error) {
    next(error);
  }
});


module.exports = router;  

