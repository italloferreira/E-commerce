import './Produtos_Tempeiros.css';
import Header from '../../../componentes/Header';
import Footer from '../../../componentes/Footer';
import Container from '../../../componentes/Container';
import Card from '../../../componentes/Card';

function Produtos_Tempeiros() {
    return (
        <>
            <Header />
            <Container>
                <h1 className="txt">Produtos / Tempeiros</h1>
                <Card tipo="tempero" /> {/* Exibe apenas produtos do tipo 'tempero' */}
            </Container>
            <Footer />
        </>
    );
}

export default Produtos_Tempeiros;
