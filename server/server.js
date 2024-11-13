const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const SECRET_KEY = 'your-secret-key';

app.use(cors());
app.use(express.json());

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('./informacoes.db', (err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados:', err);
  } else {
    console.log('Conectado ao banco SQLite');
  }
});

// Criação das tabelas de usuários e produtos
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  cell INT,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  description TEXT,
  price REAL,
  image TEXT,
  type TEXT CHECK(type IN ('pimenta', 'tempero', 'kits'))
)`);

// Rota para criar conta de usuário
app.post('/criarconta', async (req, res) => {
  const { email, password, nome, cell } = req.body; // Inclui os campos nome e cell no corpo da requisição
  const hashedPassword = await bcrypt.hash(password, 10);
  const role = email === "adm@gmail.com" ? "admin" : "user";

  db.run(
    `INSERT INTO users (nome, cell, email, password, role) VALUES (?, ?, ?, ?, ?)`,
    [nome, cell, email, hashedPassword, role], // Adiciona os valores para nome e cell no comando SQL
    function (err) {
      if (err) {
        console.error('Erro ao registrar o usuário:', err);
        return res.status(500).json({ message: 'Erro ao registrar o usuário' });
      }
      res.status(201).json({ message: 'Usuário registrado com sucesso' });
    }
  );
});

// Rota de login
app.post('/', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token, role: user.role, nome: user.nome }); // Incluindo nome
  });
});



// Middleware para autenticar o token JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Acesso negado' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = decoded;
    next();
  });
};

// Rota para obter todos os produtos
app.get('/products', authenticateToken, (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      res.status(500).json({ message: 'Erro ao buscar produtos' });
      return;
    }
    res.json(rows);
  });
});

// Rota para obter um produto específico
app.get('/products/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  db.get("SELECT * FROM products WHERE id = ?", id, (err, row) => {
    if (err) {
      console.error('Erro ao buscar o produto:', err);
      return res.status(500).json({ message: 'Erro ao buscar o produto' });
    }
    if (!row) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(row);
  });
});


// Rota para adicionar um novo produto (acesso restrito ao admin)
app.post('/products', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado' });
  }

  const { name, description, price, image, type } = req.body;

  // Validação do tipo de produto
  const allowedTypes = ['pimenta', 'tempero', 'kits'];
  if (!allowedTypes.includes(type)) {
    return res.status(400).json({ message: 'Tipo de produto inválido' });
  }

  // Log para verificar os dados
  console.log('Inserindo produto:', { name, description, price, image, type });

  db.run(
    `INSERT INTO products (name, description, price, image, type) VALUES (?, ?, ?, ?, ?)`,
    [name, description, parseFloat(price), image, type],
    function (err) {
      if (err) {
        console.error('Erro ao adicionar produto:', err);
        return res.status(500).json({ message: 'Erro ao adicionar produto' });
      }
      res.status(201).json({ id: this.lastID, name, description, price, image, type });
    }
  );
});


// Rota para atualizar um produto (acesso restrito ao admin)
app.put('/products/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado' });
  }

  const { id } = req.params;
  const { name, description, price, image, type } = req.body;

  const allowedTypes = ['pimenta', 'tempero', 'kits'];
  if (!allowedTypes.includes(type)) {
    return res.status(400).json({ message: 'Tipo de produto inválido' });
  }

  db.run(
    `UPDATE products SET name = ?, description = ?, price = ?, image = ?, type = ? WHERE id = ?`,
    [name, description, parseFloat(price), image, type, id],
    function (err) {
      if (err) {
        console.error('Erro ao atualizar produto:', err);
        return res.status(500).json({ message: 'Erro ao atualizar produto' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      res.json({ message: 'Produto atualizado com sucesso' });
    }
  );
});

// Rota para deletar um produto (acesso restrito ao admin)
app.delete('/products/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado' });
  }

  const { id } = req.params;

  db.run("DELETE FROM products WHERE id = ?", id, function (err) {
    if (err) {
      console.error('Erro ao deletar produto:', err);
      return res.status(500).json({ message: 'Erro ao deletar produto' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json({ message: 'Produto deletado com sucesso' });
  });
});

app.get('/inicio', authenticateToken, (req, res) => {
  res.json({ message: 'Bem-vindo ao site!' });
});

app.get('/admin', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado' });
  }
  res.json({ message: 'Bem-vindo ao Painel Administrativo!' });
});

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
