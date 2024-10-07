import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { debounce } from 'lodash';
import ReactMarkdown from 'react-markdown'; 

import * as S from './style';
import { useLocation } from 'react-router-dom';
import { generateRandomColor } from '../../utils/random';

const socket = io('https://mark-down-backend.vercel.app/');

const Editor = ({ documentId, setActiveUsers, activeUsers }) => {
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
    socket.emit('joinDocument', { documentId, userName: state });
  
    socket.on('documentUpdate', ({ content, userName, color }) => {
      setContent(content); 
      setHighlightPositions((prevPositions) => ({
        ...prevPositions,
        [userName]: { color },
      }));
    });
  
    socket.on('activeUsers', (users) => {
      const usersWithColors = users.map(user => ({
        userName: user.userName,
        color: user.color,
      }));
  
      const usersMap = new Map(usersWithColors.map(user => [user.userName, user]));
      setActiveUsers(usersMap);
    });
  
    return () => {
      socket.off('documentUpdate');
      socket.off('activeUsers');
      socket.emit('leaveDocument', { documentId }); 
    };
  }, [documentId, setActiveUsers, state]);

  const debouncedEmitChange = debounce((newContent, cursorPosition) => {
    const userColor = activeUsers.get(state)?.color || '#000';
    socket.emit('editDocument', { documentId, content: newContent, cursorPosition, color: userColor });
  }, 150);

  return (
    <>
      <S.EditorContainer
        value={content}
        onChange={handleChange}
        highlightPositions={highlightPositions[state]?.color || 'white'} 
      />
      <S.Button onClick={handleUndo} disabled={currentIndex <= 0}>Undo</S.Button>
      <S.Button onClick={handleRedo} disabled={currentIndex >= history.length - 1}>Redo</S.Button>
      <S.PreviewContainer>
      <ReactMarkdown
          components={{
            p: ({ node, ...props }) => {
              const userColor = highlightPositions[state]?.color || 'white';
              return <p style={{ color: userColor }} {...props} />;
            },
          }}
        >
            {content}
  </ReactMarkdown>
      </S.PreviewContainer>
    </>
  );
};

export default Editor;
