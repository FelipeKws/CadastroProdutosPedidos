<template>
  <div>
    <div id="header">
      <BarraNavegacao/>
    </div>
    <Cadastro @AtualizaLista="AtualizarLista"/>
    <Carrinho @FinalizarCarrinho="FinalizarCompra" :produtos="pedidos.produtos" :totprodutos="pedidos.totprodutos" :totdescontos="pedidos.totdescontos" :taxaentrega="pedidos.taxaentrega" :totpedido="pedidos.totpedido"/>
    <div id="cards" class="columns" v-for="(produto) in produtos" :key="produto._id">
      <CardProduto :nome="produto.nome" :categoria="produto.categoria" :descricao="produto.descricao" :valor="produto.preco" :desconto="produto.desconto" @ComprarProduto="ComprarProduto($event)"/>
    </div>
  </div>
</template>

<script>
import BarraNavegacao from './components/BarraNavegacao.vue'
import Cadastro from './components/Cadastro.vue'
import CardProduto from './components/CardProduto.vue'
import axios from 'axios'
import Carrinho from './components/Carrinho.vue'
import Servico from './servico'

export default {
  name: 'App',
  data(){
      return {
      produtos: [],
      pedidos: {
        numPedido: Date.now(),
        produtos: [],
        totprodutos: 0,
        totdescontos: 0,
        taxaentrega: 0,
        totpedido: 0
      },
      error: ''
      }
  },
  created: function(){
      axios.get("http://localhost:3000/api/produtos").then(res => {
          this.produtos = res.data
      })
  },
  components: { 
    BarraNavegacao,
    Cadastro,
    CardProduto,
    Carrinho, 
  },
  methods: {
    AtualizarLista: function(){
      axios.get("http://localhost:3000/api/produtos").then(res => {
          this.produtos = res.data
      })
    },
    ComprarProduto: function($event){
      this.pedidos.produtos.push($event.nome);
      this.pedidos.totprodutos = Number(this.pedidos.totprodutos) + Number($event.valor);
      this.pedidos.totdescontos = Number(this.pedidos.totdescontos) + Number($event.desconto);
      this.pedidos.totpedido = Number(this.pedidos.totprodutos) - Number(this.pedidos.totdescontos);
      this.pedidos.taxaentrega = Number(this.pedidos.totpedido) * 0.03;
      this.pedidos.totpedido = Number(this.pedidos.totpedido) + Number(this.pedidos.taxaentrega);
    },
    FinalizarCompra: function(){
      console.log(this.pedidos)
      Servico.insertPedido(
        this.pedidos.numPedido, 
        this.pedidos.produtos,  
        this.pedidos.totdescontos, 
        this.pedidos.totprodutos,
        this.pedidos.taxaentrega, 
        this.pedidos.totpedido);

      /*alert("Pedido enviado para o servidor");

      this.pedidos.produtos = [];
      this.pedidos.totprodutos = 0;
      this.pedidos.totdescontos = 0;
      this.pedidos.taxaentrega = 0;
      this.pedidos.totpedido = 0*/
    }
  }
}
</script>

<style>
#header {
  margin-bottom: 2%;
}
#cards {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2%;
}
</style>
