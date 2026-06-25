require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');

// Inicializa a conexão com o banco de dados
connectDB();

const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json()); // Permite que a API receba dados no formato JSON

// Importando as Rotas
const authRoutes = require('./src/routes/auth.routes');
const matchRoutes = require('./src/routes/match.routes'); // NOVA LINHA
const betRoutes = require('./src/routes/bet.routes');     // NOVA LINHA

// Usando as Rotas (O prefixo será /api/auth)
app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes); // NOVA LINHA
app.use('/api/bets', betRoutes);      // NOVA LINHA

// Rota de teste simples
app.get('/', (req, res) => {
  res.send('API do Bolão da Copa rodando perfeitamente!');
});

// Define a porta e sobe o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});