const Produto = require('../models/produto')
const fs = require('fs')
const utils = require('util')
const unlinkFile = utils.promisify(fs.unlink)
const { uploadFile, getFileStream } = require('../middleware/s3')

const handleErrors = (err) => {
  let errors = {
    nome: '',
    marca: '',
    volume: '',
    preco: '',
    categoria: '',
    genero: '',
    descricao: '',
    imagem: '',
  }

  // Validating all errors
  if (err.message) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }
  return errors
}

const produto_details = async (req, res) => {
  const id = req.params.id
  try {
    const produto = await Produto.findById(id)
    res.status(200).json(produto)
  } catch (err) {
    res.status(404).json({ message: 'Produto não encontrado' })
  }
}

const produto_cria_post = async (req, res) => {
  const { nome, marca, volume, preco, categoria, genero, descricao } = req.body
  const file = req.file
  const result = await uploadFile(file)
  await unlinkFile(file.path)
  try {
    const produto = await Produto.create({
      nome,
      marca,
      volume,
      preco,
      categoria,
      genero,
      descricao,
      imagem: result.Location,
    })
    res
      .status(200)
      .json({ produto: produto._id, mensagem: 'Produto criado com sucesso' })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

const produto_update = async (req, res) => {
  const id = req.params.id
  const { nome, marca, volume, preco, categoria, genero, descricao } = req.body
  const file = req.file
  const result = await uploadFile(file)
  await unlinkFile(file.path)
  try {
    const produto = await Produto.findByIdAndUpdate(
      id,
      {
        nome: nome,
        marca: marca,
        volume: volume,
        preco: preco,
        categoria: categoria,
        genero: genero,
        descricao: descricao,
        imagem: result.Location,
      },
      { runValidators: true }
    )

    res.status(200).json({
      produto: produto._id,
      mensagem: 'Produto atualizado com sucesso',
    })
  } catch (err) {
    //const errors = handleErrors(err)
    res.status(400).json({ errors: err.message })
  }
}

const produto_delete = async (req, res) => {
  const id = req.params.id
  try {
    const produto = await Produto.findById(id)
    await Produto.findByIdAndDelete(id)
    res.status(200).json({ message: 'Produto deletado com sucesso' })
  } catch (err) {
    res.status(404).json({ message: 'Produto não encontrado' })
  }
}

const produto_getAll = async (req, res) => {
  try {
    const produtos = await Produto.find().sort({ nome: 1 })
    if (produtos.length === 0) {
      res.status(404).json({ message: 'Nenhum produto encontrado' })
      return
    }
    res.status(200).json(produtos)
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Algum erro ocorreu ao buscar todos os produtos',
    })
  }
}

const produto_filter_categoria = async (req, res) => {
  const param = Object.values(req.params)[0]

  try {
    const produtos = await Produto.find({ categoria: param }).sort({ nome: 1 })
    if (produtos.length === 0) {
      res.status(404).json({ message: 'Nenhum produto encontrado' })
      return
    }
    res.status(200).json(produtos)
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Algum erro ocorreu ao buscar todos os produtos',
    })
  }
}
const produto_filter_genero = async (req, res) => {
  const param = Object.values(req.params)[0]

  try {
    const produtos = await Produto.find({ genero: param }).sort({ nome: 1 })
    if (produtos.length === 0) {
      res.status(404).json({ message: 'Nenhum produto encontrado' })
      return
    }
    res.status(200).json(produtos)
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Algum erro ocorreu ao buscar todos os produtos',
    })
  }
}
const produto_filter_marca = async (req, res) => {
  const param = Object.values(req.params)[0]

  try {
    const produtos = await Produto.find({ marca: param }).sort({ nome: 1 })
    if (produtos.length === 0) {
      res.status(404).json({ message: 'Nenhum produto encontrado' })
      return
    }
    res.status(200).json(produtos)
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Algum erro ocorreu ao buscar todos os produtos',
    })
  }
}

module.exports = {
  produto_details,
  produto_cria_post,
  produto_update,
  produto_delete,
  produto_getAll,
  produto_filter_categoria,
  produto_filter_genero,
  produto_filter_marca,
}
