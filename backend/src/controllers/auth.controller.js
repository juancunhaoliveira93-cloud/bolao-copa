const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Lógica para Cadastrar Usuário
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Verifica se o e-mail já existe no banco
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Este e-mail já está em uso.' });
    }

    // 2. Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Cria e salva o novo usuário
    const newUser = new User({
      name,
      email,
      passwordHash
    });
    
    await newUser.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar usuário', error: error.message });
  }
};

// Lógica para Fazer Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Busca o usuário pelo e-mail
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // 2. Compara a senha digitada com a criptografada no banco
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta.' });
    }

    // 3. Gera o Token JWT (válido por 1 dia)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 4. Devolve o token e os dados básicos do usuário
    res.status(200).json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        totalPoints: user.totalPoints
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
};