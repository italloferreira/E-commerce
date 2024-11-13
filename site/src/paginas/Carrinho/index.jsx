// Carrinho.js
import React, { useState, useEffect } from 'react';
import './Carrinho.css';
import pimenta from '../../imgs/icones/pimenta.png';
import { Link, useNavigate } from 'react-router-dom';

function Carrinho() {
    const [carrinho, setCarrinho] = useState([]);
    const [quantidades, setQuantidades] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const itensCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        setCarrinho(itensCarrinho);
        const quantidadesIniciais = {};
        itensCarrinho.forEach(item => {
            quantidadesIniciais[item.id] = 1;
        });
        setQuantidades(quantidadesIniciais);
    }, []);

    const handleRemoverDoCarrinho = (id) => {
        const novoCarrinho = carrinho.filter(produto => produto.id !== id);
        setCarrinho(novoCarrinho);
        localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
        alert('Produto removido do carrinho');
    };

    const handleAlterarQuantidade = (id, novaQuantidade) => {
        setQuantidades({ ...quantidades, [id]: novaQuantidade });
    };

    const handleEnviarPedido = () => {
        const pedido = carrinho.map(item => ({
            ...item,
            quantidade: quantidades[item.id],
        }));
        localStorage.setItem('pedido', JSON.stringify(pedido));
        navigate('/pedido');
    };

    return (
        <div className="Tudocarrinho">
            <div className="carrinho">
                <div className="txtCarrinho">
                    <h2 className="titulo">
                        <img src={pimenta} alt="pimenta" />
                        SEU CARRINHO DE COMPRAS!
                        <img src={pimenta} alt="pimenta" />
                    </h2>
                </div>
                <div id="produtoEscolhido">
                    {carrinho.length > 0 ? (
                        carrinho.map(produto => (
                            <div key={produto.id} className="produto">
                                <img className="img" src={produto.image} alt={produto.name} />
                                <h3 className="nome">{produto.name}</h3>
                                <p className="sifrao">R$</p>
                                <p className="valor">{produto.price.toFixed(2)}</p>
                                <p className="descricao">{produto.description}</p>
                                <div className="botaoCarrinho">
                                    <label>Qnt:</label>
                                    <input className='quantidade'
                                        type="number"
                                        value={quantidades[produto.id]}
                                        min="1"
                                        onChange={(e) => handleAlterarQuantidade(produto.id, e.target.value)}
                                    />
                                    <button className="remover" onClick={() => handleRemoverDoCarrinho(produto.id)}>
                                        Remover pedido
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Seu carrinho está vazio.</p>
                    )}
                </div>
            </div>

            <div className="botoes">
                <Link to='/inicio'><button className="btnVoltar">Voltar</button></Link>
                <button className="btnEnviar" onClick={handleEnviarPedido}>Enviar Pedido</button>
            </div>

        </div>
    );
}

export default Carrinho;
