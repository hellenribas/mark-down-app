import React, { useState } from 'react';
import axios from 'axios';

import * as S from './style'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

  
    const handleRegister = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:4000/api/auth/register', {
          username,
          email,
          password,
        });

        return response
  
      } catch (err) {
        setError('Erro ao cadastrar. Tente novamente.');
        console.error(err);
      }
    };

    const handleBack = () => {
        navigate(-1)
    }
  
    return (
      <S.RegisterContainer>
        <S.Form onSubmit={handleRegister}>
          <S.Title>Cadastro</S.Title>
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          <S.Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nome de usuário"
            required
          />
          <S.Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <S.Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
          />
          <S.Button type="submit">Cadastrar</S.Button>
          <S.Button type="button" onClick={handleBack}>Voltar</S.Button>
        </S.Form>
      </S.RegisterContainer>
    );
  };
  
  export default Register;