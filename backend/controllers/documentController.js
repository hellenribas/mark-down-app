const Document = require('../models/Document');
const { sanitize } = require('../utils/sanitizer'); // Função de sanitização
const { validationResult } = require('express-validator'); // Para gerenciar erros de validação

// Criar um novo documento
const createDocument = async (req, res) => {
  const { title, content } = req.body;

  // Sanitização dos dados
  const sanitizedTitle = sanitize(title);
  const sanitizedContent = sanitize(content);

  // Verificar erros de validação
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const document = new Document({ title: sanitizedTitle, content: sanitizedContent });
    await document.save();
    res.status(201).json(document);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Listar todos os documentos
const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find().select('-__v'); // Exclui o campo __v
    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Obter um documento específico por ID
const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id).select('-__v');
    if (!document) {
      return res.status(404).json({ message: 'Documento não encontrado' });
    }
    res.status(200).json(document);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Atualizar um documento existente
const updateDocument = async (req, res) => {
  const { title, content } = req.body;

  // Sanitização dos dados
  const sanitizedTitle = sanitize(title);
  const sanitizedContent = sanitize(content);

  // Verificar erros de validação
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const document = await Document.findByIdAndUpdate(
      req.params.id,
      { title: sanitizedTitle, content: sanitizedContent },
      { new: true, runValidators: true } // Retorna o documento atualizado
    );

    if (!document) {
      return res.status(404).json({ message: 'Documento não encontrado' });
    }
    res.status(200).json(document);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Excluir um documento
const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Documento não encontrado' });
    }
    res.status(204).send(); // No Content
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
};
