import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeletarLivros from './DeletarLivros';


function App() {
  const [livros, setLivros] = useState([]);

  // Função para buscar a lista de livros do servidor
  const fetchLivros = async () => {
    try {
      const response = await axios.get('http://localhost:3001/livros'); // Requisição para o backend
      setLivros(response.data); // Atualiza o estado com os livros recebidos
    } catch (error) {
      console.error('Erro ao buscar livros:', error); // Exibe o erro, caso ocorra
    }
  };

  // Executa a busca de livros ao carregar o componente
  useEffect(() => {
    fetchLivros();
  }, []);

  // Função para lidar com a exclusão de um livro
  const handleDelete = (id) => {
    setLivros(livros.filter(livro => livro.id !== id)); // Filtra e remove o livro do estado
  };

  return (
    <div>
      <h1>Gerenciamento de Livros</h1>
      {/* Passa a lista de livros e a função de exclusão para o componente DeletarLivros */}
      <DeletarLivros livros={livros} onDelete={handleDelete} />
    </div>
  );
}

export default App;
