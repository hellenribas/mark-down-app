const Document = require('../models/Document');

const handleSocket = (socket, io) => {
  console.log('Usuário conectado');

  socket.on('joinDocument', async ({ documentId }) => {
    try {
      // Usuário entra em uma sala específica para o documento
      socket.join(documentId);
      console.log(`Usuário entrou na sala do documento ${documentId}`);

      // Carregar conteúdo inicial do documento e enviar ao cliente que entrou
      const document = await Document.findById(documentId);
      if (document) {
        socket.emit('documentUpdate', { documentId, content: document.content });
      }
    } catch (error) {
      console.error('Erro ao entrar no documento', error);
    }
  });

  socket.on('editDocument', async ({ documentId, content }) => {
    try {
      // Atualiza o conteúdo do documento no banco de dados
      await Document.updateOne({ _id: documentId }, { content, $inc: { version: 1 } });

      // Envia a atualização para todos os outros usuários na mesma sala
      io.to(documentId).emit('documentUpdate', { documentId, content });
    } catch (error) {
      console.error('Erro ao editar documento', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
};

module.exports = { handleSocket };
