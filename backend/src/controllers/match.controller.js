const Match = require('../models/match.model');

// Listar todos os jogos cadastrados
exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find().sort({ matchDate: 1 }); // Ordena pela data do jogo
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar jogos', error: error.message });
  }
};

// Criar um novo jogo (Ação do Admin)
exports.createMatch = async (req, res) => {
  try {
    const { teamA, teamB, matchDate } = req.body;
    const newMatch = new Match({ teamA, teamB, matchDate });
    
    await newMatch.save();
    res.status(201).json({ message: 'Jogo cadastrado com sucesso!', match: newMatch });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar jogo', error: error.message });
  }
};

// Atualizar o resultado final de um jogo (Ação do Admin)
exports.updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { resultA, resultB } = req.body;

    const match = await Match.findByIdAndUpdate(
      id,
      { resultA, resultB, status: 'finished' },
      { new: true } // Retorna o documento já atualizado
    );

    if (!match) {
      return res.status(404).json({ message: 'Jogo não encontrado.' });
    }

    res.status(200).json({ message: 'Resultado atualizado com sucesso!', match });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar resultado', error: error.message });
  }
};