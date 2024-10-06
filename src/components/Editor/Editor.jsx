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

  useEffect(() => {
    // Emitir o evento para se juntar ao documento
    socket.emit('joinDocument', { documentId, userName: state });

    // Atualizar conteúdo do documento ao receber evento
    socket.on('documentUpdate', ({ content, userName, cursorPosition }) => {
      setContent(content); // Atualiza o conteúdo do editor com a nova versão recebida
      setHighlightPositions((prevPositions) => ({
        ...prevPositions,
        [userName]: cursorPosition,
      }));
    });

    // Atualizar usuários ativos
    socket.on('activeUsers', (users) => {
      const usersWithColors = users.map((userName) => ({
        userName,
        color: generateRandomColor(),
      }));
      const usersMap = new Map(usersWithColors.map((user) => [user.userName, user]));
      setActiveUsers(usersMap);
    });

    // Remover listeners ao desmontar o componente
    return () => {
      socket.off('documentUpdate');
      socket.off('activeUsers');
      socket.emit('leaveDocument', { documentId }); // Emitir evento ao sair
    };
  }, [documentId, setActiveUsers, state]);

  const debouncedEmitChange = debounce((newContent, cursorPosition) => {
    socket.emit('editDocument', { documentId, content: newContent, cursorPosition });
  }, 150); // Tente reduzir o valor ou remover o debounce para testar

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
