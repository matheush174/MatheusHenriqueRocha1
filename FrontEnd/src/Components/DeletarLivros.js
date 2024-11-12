import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DeletarLivros = () => {
    const dispatch = useDispatch();
    // Usando useSelector para pegar os livros diretamente da store
    const livros = useSelector(state => state);

    const removerLivro = (id) => {
        dispatch({ type: 'remover', payload: id });
    };

    return (
        <div>
            <h2>Lista de Livros</h2>
            {livros.length === 0 ? (
                <p>Nenhum livro encontrado.</p>
            ) : (
                <ul>
                    {livros.map(livro => (
                        <li key={livro.id}>
                            {livro.titulo} 
                            <button className='btn-remover' onClick={() => removerLivro(livro.id)}>
                              <i className='bx bxs-trash'></i>Remover
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DeletarLivros;
