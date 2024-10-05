import React from 'react';
import * as S from './style';



const UserIndicators = ({ users }) => {
  return (
    <S.UserIndicatorWrapper>
      {users.map((user) => (
        <S.UserIndicator key={user.id} color={user.color} title={user.name} />
      ))}
    </S.UserIndicatorWrapper>
  );
};

export default UserIndicators;
