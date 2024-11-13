import './HeaderAdm.css'
import { Link } from 'react-router-dom'
import logo from '../../imgs/logo/logo.png'

function HeaderADM() {

    return (
        <>
            <header id="topADM">
                <p className='msgm-adm'>Bem vindo ADM</p>

                <Link to="/"> <button className='fazer-login-novamente'>fazer login novamente</button> </Link>
            </header>


            <div id="logoADM">
                <img src={logo}></img>
            </div>

            <div id="titulocapADM">
               <p className='tituloADM'>CADASTRE SEUS PRODUTOS</p>
            </div>
        </>
    )
}

export default HeaderADM