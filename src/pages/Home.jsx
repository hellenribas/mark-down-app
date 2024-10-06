import React, { useState } from 'react';

import * as S from './HomeStyles';

import Header from '../components/Header/Header';
import Editor from '../components/Editor/Editor';
import UserIndicators from '../components/UserIndicator/UserIndicator';


const Home = () => {
  const [activeUsers, setActiveUsers] = useState(new Map());

  return (
    <S.HomeWrapper>
      <Header />
        <UserIndicators users={Array.from(activeUsers.values())} />
      <S.Card>
        <Editor setActiveUsers={setActiveUsers} documentId="doc123" />
      </S.Card>
    </S.HomeWrapper>
  );
};

export default Home;
