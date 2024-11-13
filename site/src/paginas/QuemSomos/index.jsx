import './QuemSomos.css';
import Header from '../../componentes/Header';
import Footer from '../../componentes/Footer';
import Container from '../../componentes/Container';
import lojaAntiga from '../../imgs/loja/loja_antiga.jpeg';
import placa from '../../imgs/loja/placa-loja.jpeg';
import lojaAtual from '../../imgs/loja/loja_atual.jpeg';
import { useEffect } from 'react';

function QuemSomos() {

    // Função para verificar se o elemento está visível na tela
    const verificaElementos = () => {
        const elementos1 = document.querySelectorAll('.card_1');
        const elementos2 = document.querySelectorAll('.card_2');
        const elementos3 = document.querySelectorAll('.card_3');
        const elementosImg3 = document.querySelectorAll('.card_img3');

        const verificar = (elementos) => {
            elementos.forEach(function(elemento) {
                if (elemento.getBoundingClientRect().top < window.innerHeight &&
                    elemento.getBoundingClientRect().bottom >= 0) {
                    elemento.classList.add('aparece');
                } else {
                    elemento.classList.remove('aparece');
                }
            });
        }

        verificar(elementos1);
        verificar(elementos2);
        verificar(elementos3);
        verificar(elementosImg3);
    };

    useEffect(() => {
        // Adiciona eventos de scroll e resize
        window.addEventListener('scroll', verificaElementos);
        window.addEventListener('resize', verificaElementos);

        // Executa a verificação quando o componente for montado
        verificaElementos();

        // Remove os eventos quando o componente for desmontado
        return () => {
            window.removeEventListener('scroll', verificaElementos);
            window.removeEventListener('resize', verificaElementos);
        };
    }, []); // Array vazio para rodar o efeito apenas uma vez, na montagem do componente

    return (
        <>
            <Header />
            <Container>
                <div className="cards">
                    <div className="card_1" id="elemento1">
                        <img className="card_img1" src={lojaAntiga} alt="loja antiga" />
                        <p className="card_txt1">Desde 2005, o Mercado Central tem sido nosso lar, onde cuidamos de nossos clientes com dedicação, oferecendo produtos de qualidade e preços justos. O que começou como uma modesta loja repleta de maravilhas agora floresceu em um espaço maior, uma expressão vívida de nossa paixão pelo comércio.</p>
                    </div>

                    <div className="card_2" id="elemento1">
                        <p className="card_txt2">À medida que o tempo avançava, o espaço se tornou um desafio, um lembrete gentil de nosso sucesso crescente. Assim, abraçamos a mudança e nos mudamos para um ambiente mais amplo, onde o conforto é rei e a variedade de produtos é vasta.</p>
                        <img className="card_img2" src={lojaAtual} alt="loja atual" />
                    </div>

                    <div className="card_3" id="elemento1">
                        <p className="card_txt3">Porém, mesmo com a expansão, mantemos nossa promessa de excelência. A qualidade continua sendo nossa bússola, o atendimento caloroso nossa marca registrada e os preços justos nossa promessa inabalável. No Mercado Central, estamos além de uma simples loja; somos uma experiência, um refúgio para os buscadores de qualidade e valor.</p>
                    </div>
                    <img className="card_img3" id="elemento1" src={placa} alt="placa loja" />
                </div>
            </Container>

            <Footer />
        </>
    );
}

export default QuemSomos;
