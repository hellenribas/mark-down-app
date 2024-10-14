const jwt = require('jsonwebtoken'); // Usar JWT para verificar o token

const handleSocket = (socket, io) => {
  socket.use((packet, next) => {
    const token = socket.handshake.auth.token; 
    if (!token) {
      return next(new Error('Autenticação falhou'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      socket.userId = decoded.id; 
      socket.userName = decoded.name; 
      next(); 
    } catch (error) {
      next(new Error('Autenticação inválida'));
    }
  });

  console.log('Usuário conectado');

  socket.on('joinDocument', async (data) => {
    const { documentId } = data;
  
    try {
      socket.join(documentId);
      console.log(`Usuário ${socket.userName} entrou na sala do documento ${documentId}`);
  
      const document = await Document.findById(documentId);
      if (document) {
        socket.emit('documentUpdate', { documentId, content: document.content, userName: socket.userName });
      }
  
      if (!activeUsers.has(documentId)) {
        activeUsers.set(documentId, []);
      }
  
      const color = stringToColor(socket.userName); 
      const users = activeUsers.get(documentId);
      users.push({ userName: socket.userName, socketId: socket.id, color });
      
      io.to(documentId).emit('activeUsers', users.map(user => ({ userName: user.userName, color: user.color })));
    } catch (error) {
      console.error('Erro ao entrar no documento', error);
    }
  });

  socket.on('editDocument', async ({ documentId, content }) => {
    try {
      await Document.updateOne({ _id: documentId }, { content, $inc: { version: 1 } });
      socket.broadcast.to(documentId).emit('documentUpdate', { documentId, content, userName: socket.userName, color: stringToColor(socket.userName) });
    } catch (error) {
      console.error('Erro ao editar documento', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');

    activeUsers.forEach((users, documentId) => {
      const updatedUsers = users.filter(user => user.socketId !== socket.id);
      activeUsers.set(documentId, updatedUsers);
      io.to(documentId).emit('activeUsers', updatedUsers.map(user => user.userName));
    });
  });
};

module.exports = { handleSocket };
