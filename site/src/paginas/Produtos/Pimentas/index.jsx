import './Produtos_Pimentas.css';
import Header from '../../../componentes/Header';
import Footer from '../../../componentes/Footer';
import Container from '../../../componentes/Container';
import Card from '../../../componentes/Card';

function Produtos_Pimentas() {
    return (
        <>
            <Header />
            <Container>
                <h1 className="txt">Produtos / Pimentas</h1>
                <Card tipo="pimenta" /> {/* Exibe apenas produtos do tipo 'pimenta' */}
            </Container>
            <Footer />
        </>
    );
}

export default Produtos_Pimentas;
