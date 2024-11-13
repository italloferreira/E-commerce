
import './Header.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import zap from '../../imgs/icones/whatsapp.png';
import insta from '../../imgs/icones/instagram.png';
import local from '../../imgs/icones/pin.png';
import carrinho from '../../imgs/icones/carrinho-de-compras.png';
import logo from '../../imgs/logo/logo.png';

function Header() {
    const [nomeUsuario, setNomeUsuario] = useState('');

    useEffect(() => {
        const nomeSalvo = localStorage.getItem('nomeUsuario');
        if (nomeSalvo) {
            setNomeUsuario(nomeSalvo);
        }
    }, []);

    return (
        <>
            <header id="top">
                <div id="redes_sociais">
                    <a className="camp-what" href="https://api.whatsapp.com/message/L4H74GDNCMEXB1?autoload=1&app_absent=0">
                        <img id="icone_whatsapp" src={zap} alt="WhatsApp" />
                    </a>

                    <a className="camp-insta" href="https://www.instagram.com/sopimentah/">
                        <img id="icone_insta" src={insta} alt="Instagram" />
                    </a>
                </div>

                <div id="cadastro">
                    <a className="camp-local" href="https://www.google.com/maps/place/Mercado+Central+de+Belo+Horizonte/">
                        <img src={local} id="icone_local" alt="Localização" />
                    </a>

                    <Link to="/carrinho">
                        <p className="camp-carrinho">
                            <img id="icone_carrinho" src={carrinho} alt="Carrinho" />
                        </p>
                    </Link>

                    {nomeUsuario ? (
                        <p id="usuarioNome">Olá, {nomeUsuario}</p> // Mostra o nome do usuário logado
                    ) : (
                        <Link to="/">
                            <p id="loguin">Login | Cadastre-se</p>
                        </Link>
                    )}
                </div>
            </header>

            <div id="logo">
                <img src={logo} alt="Logo" />
            </div>

            <div id="categorias">
                <Link to="/inicio"><p className="camp">Inicio</p></Link>
                <Link id="produtos">
                    <p className="camp">Produtos</p>
                    <ul>
                        <Link to="/produtos/pimentas"><li>Pimentas</li></Link>
                        <Link to="/produtos/tempeiros"><li>Tempeiros</li></Link>
                        <Link to="/produtos/kits"><li>Kits</li></Link>
                    </ul>
                </Link>
                <Link to="/pedido"><p className="camp">Faça seu pedido!</p></Link>
                <Link to="/quemsomos"><p className="camp">Quem somos?</p></Link>
            </div>
        </>
    );
}

export default Header;
