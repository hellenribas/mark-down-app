// Home.js
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Header from '../components/Header/Header';
import Editor from '../components/Editor/Editor';

import * as S from './HomeStyles';
import { io } from 'socket.io-client';
import UserIndicators from '../components/UserIndicator/UserIndicator';

const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000');

const Home = () => {  
  const [activeUsers, setActiveUsers] = useState(new Map());
  const socketRef = useRef(null);

  const handleUserJoined = useCallback((user) => {
    setActiveUsers((prevUsers) => new Map(prevUsers).set(user.id, user));
  }, []);

  const handleUserLeft = useCallback((userId) => {
    setActiveUsers((prevUsers) => {
      const updatedUsers = new Map(prevUsers);
      updatedUsers.delete(userId);
      return updatedUsers;
    });
  }, []);

  useEffect(() => {
    socketRef.current = io(socket);

    socketRef.current.emit('joinDocument', { documentId: 'doc123' });

    socketRef.current.on('activeUsers', (users) => {
      const usersMap = new Map(users.map((user) => [user.id, user]));
      setActiveUsers(usersMap);
    });

    socketRef.current.on('userJoined', handleUserJoined);
    socketRef.current.on('userLeft', handleUserLeft);

    return () => {
      if (socketRef.current) {
        socketRef.current.off('userJoined', handleUserJoined);
        socketRef.current.off('userLeft', handleUserLeft);
        socketRef.current.disconnect();
      }
    };
  }, [handleUserJoined, handleUserLeft]);

useEffect(() => {
  socket.on('userJoined', (user) => {
    setActiveUsers((prevUsers) => [...prevUsers, user]);
  });

  socket.on('userLeft', (userId) => {
    setActiveUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
  });

  return () => {
    socket.off('userJoined');
    socket.off('userLeft');
  };
}, []);

  return (
    <S.HomeWrapper>
      <Header />
      <S.Card>
      <UserIndicators users={Array.from(activeUsers.values())} />
      <Editor />
    </S.Card>
    </S.HomeWrapper>
  );
};

export default Home;
