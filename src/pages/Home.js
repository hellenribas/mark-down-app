import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fetchAllDocuments } from '../utils/api';
import Header from '../components/Header/Header';
import { theme } from '../styles/theme';
import Editor from '../components/Editor/Editor';

const HomeWrapper = styled.div`
  padding: 2rem;
`;

const DocumentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const DocumentItem = styled.li`
  margin-bottom: 1rem;

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
  }
`;

const Home = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const docs = await fetchAllDocuments();
      setDocuments(docs);
    };
    fetchData();
  }, []);

  return (
    <HomeWrapper>
      <Header />
      <h2>Documentos</h2>
      <Editor />
    </HomeWrapper>
  );
};

export default Home;
