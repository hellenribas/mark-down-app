import React from 'react';
import * as S from './style';

const UserIndicators = ({ users }) => {
  return (
    <S.UserIndicatorWrapper>
      {users.map((user) => (
        <S.UserIndicator key={user.userName} color={user.color} title={user.userName} />
      ))}
    </S.UserIndicatorWrapper>
  );
};

export default UserIndicators;
