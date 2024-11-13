import './Produtos_Kits.css';
import Header from '../../../componentes/Header';
import Footer from '../../../componentes/Footer';
import Container from '../../../componentes/Container';
import Card from '../../../componentes/Card';

function Produtos_Kits() {
    return (
        <>
            <Header />
            <Container>
                <h1 className="txt">Produtos / Kits</h1>
                <Card tipo="kits" /> {/* Exibe apenas produtos do tipo 'kits' */}
            </Container>
            <Footer />
        </>
    );
}

export default Produtos_Kits;
