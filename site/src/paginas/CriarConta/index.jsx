import './CriarConta.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CriarConta = () => {
  const [celular, setCelular] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Envia nome e celular junto com email e password
      await axios.post('http://localhost:5000/criarconta', { 
        nome, 
        cell: celular, 
        email, 
        password 
      });
      alert("Cadastrado com sucesso");
      navigate('/'); 
    } catch (err) {
      setError('Falha no registro. Tente novamente.');
    }
  };  

  const handleCelularChange = (e) => {
    const valor = e.target.value.replace(/\D/g, ''); 
    let celularFormatado = valor;
    
    if (valor.length > 2) {
      celularFormatado = `(${valor.substring(0, 2)}) ${valor.substring(2, 7)}`;
    }
    if (valor.length >= 7) {
      celularFormatado += `-${valor.substring(7, 11)}`;
    }
    setCelular(celularFormatado); 
  };

  return (
    <div className="Tudo">
      <form onSubmit={handleSubmit} className='forms-criarconta'>
        <h1 className='nome-criarconta'>CRIE SUA CONTA!</h1>
        <br />

        <fieldset>
          <legend>Coloque seus dados</legend>
          <input 
            type="text" 
            className='input-criarconta' 
            placeholder="Nome"
            onChange={(e) => setNome(e.target.value)} 
            value={nome} 
            required 
          />
          <br /><br />
          <input 
            type="password" 
            className='input-criarconta' 
            placeholder="Senha" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <br /><br />
          <input 
            className='input-criarconta' 
            type="tel"
            id="celular"
            placeholder="Celular"
            value={celular}
            onChange={handleCelularChange} 
            maxLength={15} 
            required
          />
          <br /><br />
          <input 
            type="email" 
            className='input-criarconta' 
            placeholder="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </fieldset>
        {error && <p>{error}</p>}
        <input type="submit" className="button-criarconta" />
        <br /><br />
        <Link to="/"><p className="btn-voltar">Voltar</p></Link>
      </form>
    </div>
  );
}

export default CriarConta;
