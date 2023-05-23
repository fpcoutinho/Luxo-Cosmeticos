const Produto = require('../models/produto')

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

  try {
    const produto = await Produto.create({
      nome,
      marca,
      volume,
      preco,
      categoria,
      genero,
      descricao,
      imagem: file.path.slice(7, file.path.length),
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
        imagem: file.path.slice(7, file.path.length),
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
    //unlink dando erro por algum motivo, mas vamos ter que encontrar outra forma de hospedar mesmo
    //fs.unlinkSync(produto.imagem)
    console.log(produto)
    await Produto.findByIdAndDelete(id)
    res.status(200).json({ message: 'Produto deletado com sucesso' })
  } catch (err) {
    res.status(404).json({ message: 'Produto não encontrado' })
  }
}

const produto_getAll = async (req, res) => {
  try {
    const produtos = await Produto.find().sort({ nome: 1 })
    res.status(200).json(produtos)
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Algum erro ocorreu ao buscar todos os produtos',
    })
  }
}

const produto_Filter = async (req, res) => {
  const param = req.params.param
  try {
    const produtos = await Produto.find({ param: param }).sort({ nome: 1 })
    if (produtos.length === 0)
      res.status(404).json({ message: 'Nenhum produto encontrado' })
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
  produto_Filter,
}
