const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const produtos = require('./routes/api/produtos');
const pedidos = require('./routes/api/pedidos');

app.use('/api/produtos', produtos);
app.use('/api/pedidos', pedidos);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server está rodando na porta ${port}`));
