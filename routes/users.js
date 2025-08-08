const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all users
router.get('/', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Check existing username (SIGNUP)
router.post('/check-username', async (req, res, next) => {
  try {
    const { username } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    res.json({ exists: !!existingUser });
  } catch (error) {
    next(error);
  }
});

// Check username + password match (LOGIN)
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.json({ success: true, user_id: user.user_id });
  } catch (error) {
    next(error);
  }
});



module.exports = router;
