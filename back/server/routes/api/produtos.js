const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//GET Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

//ADD Post
router.post('/', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        nome: req.body.nome,
        descricao: req.body.descricao,
        categoria: req.body.categoria,
        preco: req.body.preco,
        desconto: req.body.desconto
    });
    res.status(201).send("Cadastro realizado com sucesso");
});

//DELETE Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})

async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect(
    "mongodb+srv://Admin:Admin1234@mycluster.bnyv2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return client.db('prodPed').collection('produtos');
}

module.exports = router;