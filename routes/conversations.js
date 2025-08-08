const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all conversations for a user
router.get('/:userId', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);

    const conversations = await prisma.conversations.findMany({
      where: {
        OR: [{ user1_id: userId }, { user2_id: userId }]
      },
      orderBy: { conversation_id: 'desc' }
    });

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

// GET full conversation (all messages) between two users
router.get('/with/:userId/:otherId', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const otherId = parseInt(req.params.otherId);
    const a = Math.min(userId, otherId);
    const b = Math.max(userId, otherId);

    // Ensure a conversation row exists (helps frontend show an empty thread gracefully)
    const convo = await prisma.conversations.upsert({
      where: { user1_id_user2_id: { user1_id: a, user2_id: b } },
      update: {},
      create: { user1_id: a, user2_id: b }
    });

    const messages = await prisma.messages.findMany({
      where: { conversation_id: convo.conversation_id },
      orderBy: { message_id: 'asc' }
    });

    res.json({ conversation_id: convo.conversation_id, messages });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
