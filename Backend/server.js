const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');

// Conectar ao banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'biblioteca',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados!');
});

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear JSON no body das requisições

// Rota para buscar todos os livros
app.get('/livros', (req, res) => {
  db.query('SELECT * FROM livros', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar livros');
    }
    res.json(results);
  });
});

// Rota para adicionar um livro
app.post('/livros', (req, res) => {
  const { titulo, autor, ano } = req.body;
  const query = 'INSERT INTO livros (titulo, autor, ano) VALUES (?, ?, ?)';
  db.query(query, [titulo, autor, ano], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao adicionar livro');
    }
    res.status(201).send('Livro adicionado');
  });
});

// Rota para deletar um livro
app.delete('/livros/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM livros WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao deletar livro');
    }
    res.status(200).send('Livro deletado');
  });
});

// Iniciar o servidor
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
