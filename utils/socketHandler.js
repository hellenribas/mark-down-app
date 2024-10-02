const Document = require('../models/Document');

const handleSocket = (socket, io) => {
  console.log('Usuário conectado');

  socket.on('editDocument', async ({ documentId, content }) => {
    try {
      const document = await Document.findById(documentId).lean();
      if (document) {
        document.content = content;
        document.version += 1;
        await Document.updateOne({ _id: documentId }, { content, version: document.version });
        socket.broadcast.emit('documentUpdate', { documentId, content });
      }
    } catch (error) {
      console.error('Erro ao editar documento', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
};

module.exports = { handleSocket };
