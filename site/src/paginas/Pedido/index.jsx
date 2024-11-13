// Pedido.js
import './Pedido.css';
import Header from '../../componentes/Header';
import Footer from '../../componentes/Footer';
import Container from '../../componentes/Container';
import { useEffect, useState } from 'react';

function Pedido() {
    const [pedido, setPedido] = useState([]);
    const [mensagemSucesso, setMensagemSucesso] = useState('');

    useEffect(() => {
        const pedidoSalvo = JSON.parse(localStorage.getItem('pedido')) || [];
        setPedido(pedidoSalvo);
    }, []);

    const calcularTotal = () => {
        return pedido.reduce((total, item) => total + item.price * item.quantidade, 0).toFixed(2);
    };

    const handleEnviarPedido = () => {
        // Limpa o pedido e mostra a mensagem de sucesso
        setPedido([]);
        setMensagemSucesso('Pedido enviado com sucesso!');
        localStorage.removeItem('pedido'); // Remove o pedido do localStorage
    };

    const handleCancelarPedido = () => {
        // Limpa o pedido e reseta o estado sem mensagem de sucesso
        setPedido([]);
        localStorage.removeItem('pedido'); // Remove o pedido do localStorage
    };

    return (
        <>
            <Header />
            <Container>
                <div className="pedidoContainer">
                    <h2>Resumo do Pedido</h2>
                    {mensagemSucesso ? (
                        <p className="mensagemSucesso">{mensagemSucesso}</p>
                    ) : (
                        pedido.length > 0 ? (
                            <>
                                <ul className="listaPedido">
                                    {pedido.map(item => (
                                        <li key={item.id} className="itemPedido">
                                            <img src={item.image} alt={item.name} className="imgPedido" />
                                            <div>
                                                <h3>{item.name}</h3>
                                                <p>Quantidade: {item.quantidade}</p>
                                                <p>Preço: R$ {item.price.toFixed(2)}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <p className="total">Total: R$ {calcularTotal()}</p>
                                <div className="botoesPedido">
                                    <button className="btnEnviarPedido" onClick={handleEnviarPedido}>
                                        Enviar Pedido
                                    </button>
                                    <button className="btnCancelarPedido" onClick={handleCancelarPedido}>
                                        Cancelar Pedido
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p>Seu pedido está vazio.</p>
                        )
                    )}
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default Pedido;
