<template>
  <div class = "container box column">
        <div action="/cadastro" class="content">
            <h1 class="label">#{{numpedido}}</h1><hr>
            <div class="field">
                <h3>Produtos</h3>
                <div v-for="(produto,index) in produtos" :key="index">
                    {{index+1}}. {{produto}}
                </div>
            </div>

            <div class="field is-grouped columns">
                <div class="column">
                    <h5>Total sem descontos</h5>
                    <div class="field is-grouped">
                        <h4>R$</h4><h4>{{totprodutos}}</h4>
                    </div>
                </div>
                <div class="column">      
                    <h5>Total de desconto</h5>
                    <div class="field is-grouped">
                        <h4>R$</h4><h4>{{totdescontos}}</h4>
                    </div>
                </div>   
                <div class="column">      
                    <h5>Taxa de entrega</h5>
                    <div class="field is-grouped">
                        <h4>R$</h4><h4>{{taxaentrega}}</h4>
                    </div>
                </div>   
                <div class="column">      
                    <h5>Total do pedido</h5>
                    <div class="field is-grouped">
                        <h4>R$</h4><h4>{{totpedido}}</h4>
                    </div>
                </div>      
            </div>
            <div class="field is-grouped is-grouped-right">
                <div class="control">
                    <button class="button is-danger" @click="DeletarPedido">Deletar pedido</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: String,
        numpedido: Number,
        produtos: Array,
        totprodutos: String,
        totdescontos: String,
        taxaentrega: String,
        totpedido: String
    },

    methods: {
        DeletarPedido: function(){
            this.$emit('DeletarPedido', {id: this.id})
        }
    }

}
</script>

<style>

</style>