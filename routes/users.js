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

router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // This replaces the need for /check-username
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Create the user
    const newUser = await prisma.user.create({
      data: { username, password }
    });

    res.status(201).json({ user_id: newUser.user_id, username: newUser.username });
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

    res.json({ user_id: user.user_id, username: user.username });
  } catch (error) {
    next(error);
  }
});



module.exports = router;
