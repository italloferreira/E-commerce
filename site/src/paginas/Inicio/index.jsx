import './Inicio.css';
import Header from '../../componentes/Header';
import Footer from '../../componentes/Footer';
import Container from '../../componentes/Container';
import banner1 from '../../imgs/banner/VENDEMOS EM ATACADO.png';
import banner2 from '../../imgs/banner/CODIGO QR MERCADO CENTRAL.png';
import banner3 from '../../imgs/banner/banner3.png';
import banner4 from '../../imgs/banner/banner4.png';
import React, { useState, useEffect, useRef } from 'react';

function Inicio() {
  const banners = [banner1, banner2, banner3, banner4]; 
  const [idx, setIdx] = useState(0); 
  const imgContainerRef = useRef(null); 

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prevIdx) => (prevIdx + 1) % banners.length); 
    }, 5000);

    return () => clearInterval(interval); 
  }, [banners.length]);

  useEffect(() => {
    if (imgContainerRef.current) {
      imgContainerRef.current.style.transform = `translateX(${-idx * 1215}px)`; 
    }
  }, [idx]);

  return (
    <>
      <Header />

      <Container>
        <div className="conteiner__carrossel">
          <div className="carrossel">
            <div className="conteiner" ref={imgContainerRef} id="img">
              {banners.map((banner, index) => (
                <img key={index} className="imagens" src={banner} alt={`Banner ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
}

export default Inicio;
