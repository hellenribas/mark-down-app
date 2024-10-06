import React, { useState, useEffect, useCallback } from 'react';

import { io } from 'socket.io-client';
import { debounce } from 'lodash';
import ReactMarkdown from 'react-markdown'; 

import * as S from './style';
import { useLocation } from 'react-router-dom';
import { generateRandomColor } from '../../utils/random';

const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000');

const Editor = ({ documentId, setActiveUsers }) => {
  const [content, setContent] = useState('');
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [highlightPositions, setHighlightPositions] = useState({});

  const location = useLocation();

  const { state } = location;


  const addToHistory = (newContent) => {
    const newHistory = [...history.slice(0, currentIndex + 1), newContent];
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1; 
      setCurrentIndex(newIndex); 
      const previousContent = history[newIndex]; 
      setContent(previousContent); 
      debouncedEmitChange(previousContent); 
    }
  };


  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1; 
      setCurrentIndex(newIndex); 
      const nextContent = history[newIndex]; 
      setContent(nextContent); 
      debouncedEmitChange(nextContent); 
    }
  };

  const handleChange = (e) => {
    const newContent = e.target.value;
    const cursorPosition = e.target.selectionStart;
    setContent(newContent);
    addToHistory(newContent);
    debouncedEmitChange(newContent, cursorPosition);
  };

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
    socket.emit('joinDocument', { documentId: 'doc321', userName: `${state}` });

    socket.on('activeUsers', (users) => {
      const usersMap = new Map(users.map((user) => [user.userName, user]));
      setActiveUsers(usersMap);
    });

    socket.on('documentUpdate', ({ documentId, content, userName, cursorPosition }) => {
      setHighlightPositions((prevPositions) => ({
        ...prevPositions,
        [userName]: cursorPosition,
      }));
    });

    return () => {
      socket.off('disconnect');
    };
  }, [documentId, setActiveUsers, state]);

  const debouncedEmitChange = debounce((newContent, cursorPosition) => {
    socket.emit('editDocument', { documentId, content: newContent, cursorPosition });
  }, 300);

  return (
    <>
     <S.EditorContainer
      value={content}
      onChange={handleChange}
      highlightPositions={highlightPositions}
    />
          <S.Button onClick={handleUndo} disabled={currentIndex <= 0}>Undo</S.Button>
          <S.Button onClick={handleRedo} disabled={currentIndex >= history.length - 1}>Redo</S.Button>
    <S.PreviewContainer>
        <ReactMarkdown>{content}</ReactMarkdown>
      </S.PreviewContainer> 
    </>
   
  );
};

export default Editor;
