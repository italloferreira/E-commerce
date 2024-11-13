import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/', { email, password });
      localStorage.setItem('token', res.data.token);
      const userRole = res.data.role;

      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/inicio');
      }
    } catch (err) {
      setError('Falha no login. Tente novamente.');
    }
  };

  return (
    <>
    <body className='Tudo'>
    <div>
      <form className="forms-login" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <br /><br />
        <input className='input-login'
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <div style={{ position: 'relative' }}>
            
          <input className='input-login'
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer'
            }}
          >
            {showPassword ? '🙊' : '🙈'} 
          </span>
        </div>

        <button className='button-login' type="submit">Entrar</button>
        {error && <p>{error}</p>}
        <Link to="/criarconta"><button className='button-login'>Criar conta</button></Link>
      </form>
    </div>
    </body>
    </>
    
  );
};

export default Login;
