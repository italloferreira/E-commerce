import './Produtos.css';
import Header from '../../componentes/Header';
import Footer from '../../componentes/Footer';
import Container from '../../componentes/Container';
import Card from '../../componentes/Card';

function Produtos() {
    return (
        <>
            <Header />
            <Container>
                <h1 className="txt">Produtos</h1>
                <Card /> {}
            </Container>
            <Footer />
        </>
    );
}

export default Produtos;
