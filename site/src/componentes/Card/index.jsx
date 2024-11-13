import React, { useEffect, useState } from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Card({ adicionarAoCarrinho, tipo }) {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/products', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const produtosFiltrados = response.data.filter(produto => produto.type === tipo);
                setProdutos(produtosFiltrados);
            } catch (err) {
                setError('Erro ao carregar os produtos');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [tipo]);

    const handleAdicionarAoCarrinho = (produto) => {
        const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
        localStorage.setItem('carrinho', JSON.stringify([...carrinhoAtual, produto]));
        alert('Produto adicionado ao carrinho!');
    };

    if (loading) return <p>Carregando dados...</p>;
    if (error) return <p>{error}</p>;
    if (produtos.length === 0) return <p>Não há produtos do tipo {tipo}.</p>;

    return (
        <div className="cardsContainer">
            {produtos.map(produto => (
                <div key={produto.id} className="card">
                    <img className="imagem" src={produto.image || '/path/to/default-image.jpg'} alt={produto.name} />
                    <div className="txt">
                        <h2 className="nome">{produto.name || 'Nome não disponível'}</h2>
                        <p className="vall">R$ {produto.price ? produto.price.toFixed(2) : 'Preço não disponível'}</p>
                    </div>
                    <div className="botões">
                        <button className="colocarcarrinho" onClick={() => handleAdicionarAoCarrinho(produto)}>
                            COLOCAR NO CARRINHO
                        </button>
                        <Link to={`/produtos/detalhes/${produto.id}`}>
                            <button className="verproduto">VER PRODUTO</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Card;
