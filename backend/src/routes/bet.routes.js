const express = require('express');
const router = express.Router();
const betController = require('../controllers/bet.controller');

// Rotas para http://localhost:3000/api/bets
router.post('/', betController.createBet);
router.get('/user/:userId', betController.getUserBets);

module.exports = router;