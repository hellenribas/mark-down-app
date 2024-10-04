import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { debounce } from 'lodash';
import * as S from './style';


const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000');

const Editor = ({ documentId }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    socket.emit('joinDocument', { documentId });

    socket.on('documentUpdate', ({ content }) => {
      setContent(content);
    });

    return () => {
      socket.off('documentUpdate');
    };
  }, [documentId]);

  const debouncedEmitChange = debounce((newContent) => {
    socket.emit('editDocument', { documentId, content: newContent });
  }, 300);

  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    debouncedEmitChange(newContent);
  };

  return (
    <S.EditorContainer value={content} onChange={handleChange} />
  );
}

export default Editor;
