const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST send a message (only if matched)
router.post('/', async (req, res, next) => {
  try {
    const { sender_id, receiver_id, content } = req.body;

    if (!sender_id || !receiver_id || !content) {
      return res.status(400).json({ error: 'sender_id, receiver_id and content are required' });
    }
    if (sender_id === receiver_id) {
      return res.status(400).json({ error: 'Cannot message yourself' });
    }

    // Ensure they are matched (order the pair for unique key)
    const a = Math.min(sender_id, receiver_id);
    const b = Math.max(sender_id, receiver_id);

    const match = await prisma.matches.findUnique({
      where: { user1_id_user2_id: { user1_id: a, user2_id: b } }
    });

    if (!match) {
      return res.status(403).json({ error: 'Users are not matched' });
    }

    // Ensure conversation exists (unique on user1_id + user2_id)
    const convo = await prisma.conversations.upsert({
      where: { user1_id_user2_id: { user1_id: a, user2_id: b } },
      update: {},
      create: { user1_id: a, user2_id: b }
    });

    // Create message
    const message = await prisma.messages.create({
      data: {
        conversation_id: convo.conversation_id,
        sender_id,
        receiver_id,
        content
      }
    });

    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

