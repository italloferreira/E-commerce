import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio';
import Produtos from './paginas/Produtos';
import Produtos_Pimentas from './paginas/Produtos/Pimentas';
import Produtos_Tempeiros from './paginas/Produtos/Tempeiros';
import Produtos_Kits from './paginas/Produtos/Kits';
import Pedido from './paginas/Pedido';
import QuemSomos from './paginas/QuemSomos';
import Login from './paginas/Login';
import CriarConta from './paginas/CriarConta';
import Carrinho from './paginas/Carrinho';
import Detalhes from './paginas/Produtos/Detalhes';
import AdmPage from './paginas/AdmPage';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/produtos/pimentas" element={<Produtos_Pimentas />} />
                <Route path="/produtos/tempeiros" element={<Produtos_Tempeiros />} />
                <Route path="/produtos/kits" element={<Produtos_Kits />} />
                <Route path="/pedido" element={<Pedido />} />
                <Route path="/quemsomos" element={<QuemSomos />} />
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/criarconta" element={<CriarConta />} />
                <Route path="/carrinho" element={<Carrinho />} />
                <Route path="/produtos/detalhes/:id" element={<Detalhes />} />
                <Route path="/admin" element={<AdmPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
