import './Detalhes.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../../../componentes/Header';
import Footer from '../../../componentes/Footer';
import Container from '../../../componentes/Container';
import zap from '../../../imgs/icones/whatsapp2.png';
import insta from '../../../imgs/icones/instagram2.png';
import email from '../../../imgs/icones/email2.png';

function Detalhes() {
    const { id } = useParams();
    const [produto, setProduto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduto = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:5000/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!response.ok) {
                    throw new Error("Erro ao buscar o produto, verifique a URL ou a resposta da API.");
                }
                const data = await response.json();
                setProduto(data);
            } catch (error) {
                setError("Erro ao carregar o produto.");
            } finally {
                setLoading(false);
            }
        };
        fetchProduto();
    }, [id]);
    

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;
    if (!produto) return <p>Produto não encontrado.</p>;

    return (
        <>
            <Header />
            <Container>
                <div className='pagina'>
                    <div className='prod'>
                        <div className='campimg'>
                            <img className='imags' src={produto.image || '/path/to/default-image.jpg'} alt={produto.name} />
                        </div>
                        <div className='inform'>
                            <h1 className='title'>{produto.name}</h1>
                            <div className='value'>
                                <p className='sif'>R$</p>
                                <p id='val'>{produto.price ? produto.price.toFixed(2) : 'Preço não disponível'}</p>
                                <p id='un'>Kg</p>
                            </div>
                            <div className='description'>
                                <p className='txtdes'>{produto.description}</p>
                            </div>
                            <hr className='linha' />
                            <h1>CONTATOS</h1>
                            <div className='contatos'>
                                <div className='fund_icon'>
                                    <img src={zap} alt="WhatsApp" />
                                </div>
                                <div className='fund_icon'>
                                    <img src={insta} alt="Instagram" />
                                </div>
                                <div className='fund_icon'>
                                    <img src={email} alt="Email" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default Detalhes;
