import { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderAdm from '../../componentes/HeaderAdm';
import Conteiner from '../../componentes/Container';
import './Adm.css';

const AdminPanel = () => {
  const [message, setMessage] = useState('');

  // Fetching data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/admin', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(res.data.message);
      } catch (error) {
        console.error('Erro ao carregar dados do admin:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <HeaderAdm />
      <Conteiner>
        <div className="adm">
          <TabelaAdm />
        </div>
      </Conteiner>
    </>
  );
};

// TabelaAdm: Componente para a tabela de dados
const TabelaAdm = () => {
  const [dados, setDados] = useState([]);
  const [form, setForm] = useState({
    id: null,
    img: '',
    nome: '',
    descricao: '',
    valor: '',
    tipo: 'pimenta' // Valor padrão para o campo de tipo
  });

  // Carregar produtos do banco de dados ao montar o componente
  useEffect(() => {
    const fetchProdutos = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(res.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  // Função para lidar com a mudança nos campos do formulário
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value
    }));
  };

  // Função para adicionar ou atualizar o produto
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (form.id) {
      // Atualizar produto existente
      try {
        await axios.put(`http://localhost:5000/products/${form.id}`, {
          name: form.nome,
          description: form.descricao,
          price: parseFloat(form.valor),
          image: form.img,
          type: form.tipo
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDados((prevDados) =>
          prevDados.map((dado) =>
            dado.id === form.id ? { ...dado, ...form } : dado
          )
        );
        alert('Produto atualizado com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        alert('Erro ao atualizar produto: ' + error.message);
      }
    } else {
      // Adicionar novo produto
      try {
        const novoDado = {
          image: form.img,
          name: form.nome,
          description: form.descricao,
          price: parseFloat(form.valor),
          type: form.tipo
        };
    
        const res = await axios.post('http://localhost:5000/products', novoDado, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        setDados((prevDados) => [...prevDados, res.data]);
        alert('Produto adicionado com sucesso!');
      } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        alert('Erro ao adicionar produto: ' + error.message);
      }
    }

    // Limpa os campos do formulário
    setForm({
      id: null,
      img: '',
      nome: '',
      descricao: '',
      valor: '',
      tipo: 'pimenta'
    });
  };

  // Função para carregar os dados no formulário para edição
  const handleEdit = (dado) => {
    setForm({
      id: dado.id,
      img: dado.image,
      nome: dado.name,
      descricao: dado.description,
      valor: dado.price.toString(),
      tipo: dado.type
    });
  };

  // Função para remover uma linha da tabela
  const handleRemove = async (id) => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:5000/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDados((prevDados) => prevDados.filter((dado) => dado.id !== id));
      alert('Produto removido com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  return (
    <>
      <form className="formadm" onSubmit={handleSubmit}>
        <input
          className="inputadm"
          type="url"
          id="img"
          value={form.img}
          onChange={handleChange}
          placeholder="img"
        />
        <input
          className="inputadm"
          type="text"
          id="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="nome"
        />
        <input
          className="inputadm"
          type="text"
          id="descricao"
          value={form.descricao}
          onChange={handleChange}
          placeholder="descrição"
        />
        <input
          className="inputadm"
          type="number"
          id="valor"
          value={form.valor}
          onChange={handleChange}
          placeholder="valor"
        />
        <select
          className="inputadm"
          id="tipo"
          value={form.tipo}
          onChange={handleChange}
        >
          <option value="pimenta">Pimenta</option>
          <option value="tempero">Tempero</option>
          <option value="kits">Kits</option>
        </select>
        <input className="butaoadm" type="submit" value={form.id ? "Atualizar" : "Adicionar"} />
      </form>

      <table className="tabela">
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Editar</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((dado) => (
            <tr key={dado.id}>
              <td>
                <img src={dado.image} alt={dado.name} width="50" />
              </td>
              <td>{dado.name}</td>
              <td>{dado.description}</td>
              <td>R$ {dado.price}</td>
              <td>{dado.type}</td>
              <td>
                <button onClick={() => handleEdit(dado)}>Editar</button>
              </td>
              <td>
                <button onClick={() => handleRemove(dado.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminPanel;
