const Bet = require('../models/bet.model');

// Registrar um novo palpite
exports.createBet = async (req, res) => {
  try {
    const { user, match, guessA, guessB } = req.body;

    // Impede que o usuário dê dois palpites para o mesmo jogo
    const existingBet = await Bet.findOne({ user, match });
    if (existingBet) {
      return res.status(400).json({ message: 'Você já registrou um palpite para este jogo.' });
    }

    const newBet = new Bet({ user, match, guessA, guessB });
    await newBet.save();

    res.status(201).json({ message: 'Palpite registrado com sucesso!', bet: newBet });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar palpite', error: error.message });
  }
};

// Buscar todos os palpites de um usuário específico
exports.getUserBets = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // O .populate('match') serve para trazer os dados do jogo (ex: nomes dos times) junto com o palpite
    const bets = await Bet.find({ user: userId }).populate('match');
    
    res.status(200).json(bets);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar palpites', error: error.message });
  }
};