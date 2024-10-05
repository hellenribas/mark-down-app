// Home.js
import React from 'react';

import Header from '../components/Header/Header';
import Editor from '../components/Editor/Editor';

import * as S from './HomeStyles';


const Home = () => {
  return (
    <S.HomeWrapper>
      <Header />
      <S.Card>
      <Editor />
    </S.Card>
    </S.HomeWrapper>
  );
};

export default Home;
