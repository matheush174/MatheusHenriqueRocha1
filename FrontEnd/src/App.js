import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Componente para o formulário de adicionar livros
const AdicionarLivro = ({ onAdicionar }) => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [ano, setAno] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !autor || !ano) {
      alert('Todos os campos devem ser preenchidos!');
      return;
    }

    // Envia o livro para a API
    const novoLivro = {
      titulo,
      autor,
      ano: parseInt(ano),
    };

    try {
      await axios.post('http://localhost:3001/livros', novoLivro);
      onAdicionar(); // Atualiza a lista de livros após adicionar
      setTitulo('');
      setAutor('');
      setAno('');
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
    }
  };

  return (
    <div>
      <h2>Adicionar Livro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Ano"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

// Componente para exibir a lista de livros
const ListaLivros = ({ livros, onDeletar }) => (
  <div>
    <h2>Livros</h2>
    <ul>
      {livros.map((livro) => (
        <li key={livro.id}>
          <strong>{livro.titulo}</strong> - {livro.autor} ({livro.ano})
          <button onClick={() => onDeletar(livro.id)}>Remover</button>
        </li>
      ))}
    </ul>
  </div>
);

function App() {
  const [livros, setLivros] = useState([]);
  
  // Buscar livros do backend
  const fetchLivros = async () => {
    try {
      const response = await axios.get('http://localhost:3001/livros');
      setLivros(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  useEffect(() => {
    fetchLivros(); // Busca os livros ao carregar o componente
  }, []);

  // Deletar livro
  const handleDeletar = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/livros/${id}`);
      setLivros(livros.filter((livro) => livro.id !== id)); // Atualiza a lista após exclusão
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
    }
  };

  // Atualizar a lista de livros após adicionar um novo livro
  const handleAdicionar = () => {
    fetchLivros(); // Recarrega a lista de livros
  };

  return (
    <div>
      <h1>Gerenciamento de Livros</h1>
      <AdicionarLivro onAdicionar={handleAdicionar} />
      <ListaLivros livros={livros} onDeletar={handleDeletar} />
    </div>
  );
}

export default App;
