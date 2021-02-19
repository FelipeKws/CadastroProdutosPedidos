<template>
    <div id="card" class="card column">
        <header class="card-header">
            <h2 class="card-header-title">
            {{nome}}
            </h2>
            <h3 class="card-header-icon">
            {{categoria}}
            </h3>
        </header>
        <div class="card-content">
            <div class="content">
                {{descricao}}
                <br>
                <hr>
                <div class="field is-grouped columns">
                    <div class="column is-1">
                        <h5>Preço</h5>
                        <div class="field is-grouped">
                            <h4>R$</h4><h4>{{valor}}</h4>
                        </div>
                    </div>
                    <div class="column">      
                        <h5>Desconto</h5>
                        <div class="field is-grouped">
                            <h4>R$</h4><h4>{{desconto}}</h4>
                        </div>
                    </div>          
                </div>
            </div>
        </div>
        <footer class="card-footer">
            <button v-if="$auth.isAuthenticated" class="card-footer-item is-success" @click="ComprarProduto()">Comprar</button>
        </footer>
    </div>
</template>

<script>
export default {
    props: {
        nome: String,
        categoria: String,
        descricao: String,
        valor: String,
        desconto: String
    },
    methods: {
        ComprarProduto: function(){
            this.$emit("ComprarProduto", {nome: this.nome, valor: this.valor, desconto: this.desconto});
        }
    }
}
</script>

<style>
    #card {
        width: 80%;
        margin-right: 1%;
    }
</style>