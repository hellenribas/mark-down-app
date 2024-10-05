const Document = require('../models/Document');

const activeUsers = new Map();

const handleSocket = (socket, io) => {
  console.log('Usuário conectado');

  socket.on('joinDocument', async ({ documentId, userId }) => {
    try {
      socket.join(documentId);
      console.log(`Usuário ${userId} entrou na sala do documento ${documentId}`);

      const document = await Document.findById(documentId);

      if (document) {
        socket.emit('documentUpdate', { documentId, content: document.content });
      }

      if (!activeUsers.has(documentId)) {
        activeUsers.set(documentId, []);
      }

      const users = activeUsers.get(documentId);
      users.push(userId);
      io.to(documentId).emit('activeUsers', users);

    } catch (error) {
      console.error('Erro ao entrar no documento', error);
    }
  });

  socket.on('editDocument', async ({ documentId, content, userId, cursorPosition }) => {
    try {
      await Document.updateOne({ _id: documentId }, { content, $inc: { version: 1 } });

      io.to(documentId).emit('documentUpdate', { documentId, content, userId, cursorPosition });
    } catch (error) {
      console.error('Erro ao editar documento', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });

  activeUsers.forEach((users, documentId) => {
    const updatedUsers = users.filter(user => user !== socket.id);
    activeUsers.set(documentId, updatedUsers);
    io.to(documentId).emit('activeUsers', updatedUsers);
  });
};

module.exports = { handleSocket };
