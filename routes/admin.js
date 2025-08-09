// Add to routes/admin.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/** Minimal admin gate.
 * Accept admin username from body, header, or query (so GET works):
 *   body.username === 'admin'
 *   OR header 'x-admin-user: admin'
 *   OR query ?username=admin
 */
const isAdmin = async (req, res, next) => {
  try {
    const u = req.body?.username || req.headers['x-admin-user'] || req.query?.username;
    if (u !== 'admin') return res.status(403).json({ error: 'Forbidden: not an admin' });
    // optionally verify it exists in DB:
    const adminUser = await prisma.user.findUnique({ where: { username: 'admin' } });
    if (!adminUser) return res.status(403).json({ error: 'Admin user not found in DB' });
    next();
  } catch (err) { next(err); }
};

// LIST USERS (for admin UI, excluding the admin account itself)
router.get('/users', isAdmin, async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      where: { username: { not: 'admin' } },
      select: {
        user_id: true,
        username: true,
        profile: { select: { name: true, profile_pic_url: true } }
      },
      orderBy: { user_id: 'asc' }
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});


// CHANGE PASSWORD (already added earlier)
router.post('/users/:userId/password', isAdmin, async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const { new_password } = req.body;
    if (!new_password) return res.status(400).json({ error: 'new_password is required' });
    const updated = await prisma.user.update({
      where: { user_id: userId },
      data: { password: new_password }
    });
    res.json({ success: true, user_id: updated.user_id });
  } catch (err) { next(err); }
});

// DELETE USER + RELATED DATA (already added earlier)
router.delete('/users/:userId', isAdmin, async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    await prisma.messages.deleteMany({ where: { OR: [{ sender_id: userId }, { receiver_id: userId }] } });
    await prisma.conversations.deleteMany({ where: { OR: [{ user1_id: userId }, { user2_id: userId }] } });
    await prisma.matches.deleteMany({ where: { OR: [{ user1_id: userId }, { user2_id: userId }] } });
    await prisma.swipes.deleteMany({ where: { OR: [{ swiper_id: userId }, { swiped_id: userId }] } });
    await prisma.profile.deleteMany({ where: { profile_id: userId } });
    await prisma.user.delete({ where: { user_id: userId } });
    res.json({ success: true, deleted_user_id: userId });
  } catch (err) { next(err); }
});

module.exports = router;
