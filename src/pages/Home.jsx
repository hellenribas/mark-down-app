import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';


import * as S from './HomeStyles';

import Header from '../components/Header/Header';
import Editor from '../components/Editor/Editor';
import UserIndicators from '../components/UserIndicator/UserIndicator';
import { generateRandomColor } from '../utils/random';
import { useLocation } from 'react-router-dom';

const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000');

const Home = () => {
  const [activeUsers, setActiveUsers] = useState(new Map());
  const [highlightPositions, setHighlightPositions] = useState({});

  const location = useLocation();
  const { state } = location;
  const socketRef = useRef(null);

  const handleUserJoined = useCallback((user) => {
    const color = generateRandomColor();
    setActiveUsers((prevUsers) => new Map(prevUsers).set(user.userName, { ...user, color }));
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
    socketRef.current.emit('joinDocument', { documentId: 'doc123', userName: state.userName });

    socketRef.current.on('activeUsers', (users) => {
      const usersMap = new Map(users.map((user) => [user.userName, user]));
      setActiveUsers(usersMap);
    });

    socketRef.current.on('documentUpdate', ({ documentId, content, userName, cursorPosition }) => {
      setHighlightPositions((prevPositions) => ({
        ...prevPositions,
        [userName]: cursorPosition,
      }));
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [handleUserJoined, handleUserLeft, state.userName]);

  return (
    <S.HomeWrapper>
      <Header />
        <UserIndicators users={Array.from(activeUsers.values())} />
      <S.Card>
        <Editor documentId="doc123" highlightPositions={highlightPositions} />
      </S.Card>
    </S.HomeWrapper>
  );
};

export default Home;
