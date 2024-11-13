import './Footer.css'
import { Link } from 'react-router-dom'
import logo from '../../imgs/logo/logo.png'

function Footer(){

    return(
        <>
        <footer>
        <img src={logo}></img>

        <div className="ins">
            INSTITUCIONAL
        </div>
        
        <div className="dados">
            <Link to="/quemsomos"><p>Quem somos?</p></Link>
            <p>|</p>

            <a href='https://www.google.com/maps/place/Mercado+Central+de+Belo+Horizonte/@-19.9230462,-44.0152457,13z/data=!3m1!5s0xa697589ecc348f:0x43d7574e43e7deba!4m10!1m2!2m1!1sMercado+Central!3m6!1s0xa699e2031e3d03:0x8e6ca6c58d640160!8m2!3d-19.9230462!4d-43.9431479!15sCg9NZXJjYWRvIENlbnRyYWwiA4gBAVoRIg9tZXJjYWRvIGNlbnRyYWySAQZtYXJrZXTgAQA!16s%2Fg%2F1tdfvcmd?entry=ttu'><p>Onde nos encontrar?</p></a>
            <p>|</p>

            <Link><p>Envie seu curriculo aqui!</p></Link>
            <p>|</p>

            <Link><p>Faça parceria conosco</p></Link>
        </div>

        <div className="seila">
            Comercial Só Pimenta LMTD © 2024
        </div>
    </footer>
        </>
    )
}

export default Footer