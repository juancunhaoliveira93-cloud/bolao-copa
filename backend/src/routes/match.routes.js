const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller');

// Rotas para http://localhost:3000/api/matches
router.get('/', matchController.getAllMatches);
router.post('/', matchController.createMatch);
router.put('/:id/result', matchController.updateResult); // O :id é o ID gerado pelo MongoDB

module.exports = router;