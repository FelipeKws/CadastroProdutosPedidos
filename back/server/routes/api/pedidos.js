const express = require('express');
const mongodb = require('mongodb');
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa"); 

const router = express.Router();
const authConfig = {
    domain: "felipeks.us.auth0.com",
    audience: "https://vue-express-api.com"
};

const checkJwt = jwt({
    // Provide a signing key based on the key identifier in the header and the signing keys provided by your Auth0 JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),
  
    // Validate the audience (Identifier) and the issuer (Domain).
    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithms: ["RS256"]
});

//GET
router.get('/', async (req, res) => {
    const pedidos = await loadPedidosCollection();
    res.send(await pedidos.find({}).toArray());
});

//ADD
router.post('/', async(req, res) => {
    const pedidos = await loadPedidosCollection();
    await pedidos.insertOne({
        numped: req.body.numped,
        produtos: req.body.produtos,
        totdescont: req.body.totdescont,
        totproduto: req.body.totprodut,
        taxentrega: req.body.taxentrega,
        totpedido: req.body.totpedido
    });
    res.status(201).send();
});

//DELETE
router.delete('/:id', async (req, res) => {
    const pedidos = await loadPedidosCollection();
    pedidos.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})

async function loadPedidosCollection(){
    const client = await mongodb.MongoClient.connect(
    "mongodb+srv://Admin:Admin1234@mycluster.bnyv2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return client.db('prodPed').collection('pedidos');
}

module.exports = router;