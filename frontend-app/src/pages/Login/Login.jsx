import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import { loginUser } from '../../utils/auth'; 

import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register')
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://mark-down-backend.vercel.app/api/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);

      navigate('/home', {
        state: response.data.userName
      })

    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <S.LoginWrapper>
      <S.LoginForm onSubmit={handleLogin}>
        <S.Title>Login</S.Title>
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        <S.Input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="E-mail" 
          required 
        />
        <S.Input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Senha" 
          required 
        />
        <S.Button type="submit">Entrar</S.Button>
        <S.Button type="button" onClick={handleRegister}>Registrar-se</S.Button>
      </S.LoginForm>
    </S.LoginWrapper>
  );
};

export default Login;
