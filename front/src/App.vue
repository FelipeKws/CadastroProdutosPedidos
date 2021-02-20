<template>
  <div>
    <div id="header">
      <BarraNavegacao @Produtos="ShowProdutos" @Pedidos="ShowPedidos" @Carrinho="ShowCarrinho" @CadProd="ShowCadProd"/>
    </div>
    <div v-if="flagCadProd === 1">
      <Cadastro v-if="$auth.isAuthenticated" @AtualizaLista="AtualizarLista"/>
      <AvisoLogin v-if="!$auth.isAuthenticated"/>
    </div>
    <div v-if="flagProduto === 1">
      <div id="cards" class="columns" v-for="(produto) in produtos" :key="produto._id">
        <CardProduto :nome="produto.nome" :categoria="produto.categoria" :descricao="produto.descricao" :valor="produto.preco" :desconto="produto.desconto" @ComprarProduto="ComprarProduto($event)"/>
      </div>
    </div>
    <div v-if="flagPedidos === 1">
      <div id="pedidos" class="columns" v-for="(pedido) in BDpedidos" :key="pedido._id">
        <CardPedidos v-if="$auth.isAuthenticated" :id="pedido._id" :numpedido="pedido.numped" :produtos="pedido.produtos" :totprodutos="pedido.totproduto" :totdescontos="pedido.totdescont" :taxaentrega="pedido.taxentrega" :totpedido="pedido.totpedido" @DeletarPedido="DeletarPedido($event)"/>
      </div>
      <AvisoLogin v-if="!$auth.isAuthenticated"/>
    </div>
    <div v-if="flagCarrinho === 1">
      <Carrinho v-if="$auth.isAuthenticated" @FinalizarCarrinho="FinalizarCompra" :produtos="pedidos.produtos" :totprodutos="pedidos.totprodutos" :totdescontos="pedidos.totdescontos" :taxaentrega="pedidos.taxaentrega" :totpedido="pedidos.totpedido"/>
      <AvisoLogin v-if="!$auth.isAuthenticated"/>
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
import CardPedidos from './components/CardPedidos.vue'
import AvisoLogin from './components/AvisoLogin.vue'

export default {
  name: 'App',
  data(){
      return {
      produtos: [],
      BDpedidos: [],
      pedidos: {
        numPedido: Date.now(),
        produtos: [],
        totprodutos: "0",
        totdescontos: "0",
        taxaentrega: "0",
        totpedido: "0"
      },
      flagProduto: 1,
      flagPedidos: 0,
      flagCarrinho: 0,
      flagCadProd: 0,
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
    CardPedidos,
    AvisoLogin, 
  },
  methods: {
    AtualizarLista: function(){
      this.ChamaProdutos();
    },
    ChamaPedidos: function(){
      axios.get("http://localhost:3000/api/pedidos").then(res => {
          this.BDpedidos = res.data
      });
    },
    ChamaProdutos: function(){
      axios.get("http://localhost:3000/api/produtos").then(res => {
          this.produtos = res.data
      })
    },
    ComprarProduto: function($event){
      this.pedidos.produtos.push($event.nome);
      this.pedidos.totprodutos = (Number(this.pedidos.totprodutos) + Number($event.valor)).toFixed(2);
      this.pedidos.totdescontos = (Number(this.pedidos.totdescontos) + Number($event.desconto)).toFixed(2);
      this.pedidos.totpedido = Number(this.pedidos.totprodutos) - Number(this.pedidos.totdescontos);
      this.pedidos.taxaentrega = (Number(this.pedidos.totpedido) * 0.03).toFixed(2);
      this.pedidos.totpedido = (Number(this.pedidos.totpedido) + Number(this.pedidos.taxaentrega)).toFixed(2);
      
      alert("Pedido adicionado ao carrinho.");
    },
    async FinalizarCompra(){
      const accessToken = await this.$auth.getTokenSilently()
      Servico.insertPedido(
        this.pedidos.numPedido, 
        this.pedidos.produtos,  
        this.pedidos.totdescontos, 
        this.pedidos.totprodutos,
        this.pedidos.taxaentrega, 
        this.pedidos.totpedido,
        accessToken);

      this.pedidos.produtos = [];
      this.pedidos.totprodutos = "0";
      this.pedidos.totdescontos = "0";
      this.pedidos.taxaentrega = "0";
      this.pedidos.totpedido = "0";

      alert("Pedido enviado para o servidor");
    },
    async DeletarPedido($event){
      const accessToken = await this.$auth.getTokenSilently()

      Servico.deletePedido(String($event.id), accessToken);
      
      this.ChamaPedidos();
      
      alert("Pedido para deletar enviado ao servidor");
    },
    ShowProdutos: function(){
      this.ChamaProdutos();

      this.flagProduto = 1;
      this.flagPedidos = 0;
      this.flagCarrinho = 0;
      this.flagCadProd = 0;
    },
    ShowPedidos: function(){
      this.ChamaPedidos();
      
      this.flagProduto = 0;
      this.flagPedidos = 1;
      this.flagCarrinho = 0;
      this.flagCadProd = 0;
    },
    ShowCarrinho: function(){
      this.flagProduto = 0;
      this.flagPedidos = 0;
      this.flagCarrinho = 1;
      this.flagCadProd = 0;
    },
    ShowCadProd: function(){
      this.flagProduto = 0;
      this.flagPedidos = 0;
      this.flagCarrinho = 0;
      this.flagCadProd = 1;
    },
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
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
#pedidos {
  margin-bottom: 2%;
}
</style>
