<template>
    <div class = "container box">
        <div action="/cadastro" method="POST" class="content">
            <h1 class="label">Cadastro de produtos</h1><hr>
            <div class="field">
                <label class="label">Nome</label>
                <div class="control">
                    <input class="input" type="text" name="nome" placeholder="Batata frita" v-model="nomeField">
                </div>
            </div>

            <div class="field">
                <label class="label">Descrição</label>
                <div class="control">
                    <textarea class="textarea" name="descricao" placeholder="Digite a descrição do produto" v-model="descricaoField"></textarea>
                </div>
            </div>

            <div class="field is-grouped columns">
                <div class="column">
                    <label class="label">Preço</label>
                    <div class="field has-addons">
                        <p class="control">
                            <a class="button is-static">
                                R$
                            </a>
                        </p>
                        <div class="control">
                            <input class="input" type="number" name="preco" v-model="precoField" placeholder="10,50">
                        </div>
                    </div>
                </div>
                <div class="column">
                    <label class="label">Desconto</label>
                    <div class="field has-addons">
                        <p class="control">
                            <a class="button is-static">
                                R$
                            </a>
                        </p>
                        <div class="control">
                            <input class="input" type="number" name="desconto" v-model="descontoField" placeholder="3,22">
                    </div>
                    </div>
                </div>
                <div class="column">
                    <label class="label">Categoria</label>
                    <div class="control">
                        <div class="select" >
                        <select name="categoria" v-model="categoriaField">
                            <option></option>
                            <option>Comida</option>
                            <option>Vestuario</option>
                            <option>Serviços</option>
                            <option>Produto</option>
                        </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-grouped is-grouped-right">
                <div class="control">
                    <button class="button is-primary" @click="cadastrarProduto">Cadastrar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Servico from '../servico';

export default {
    data(){
        return{
            nomeField: "",
            descricaoField: "",
            categoriaField: "",
            precoField: "",
            descontoField: "",
            Cadastro: {}
        }
    },
    methods: {
        async cadastrarProduto() {
            await Servico.insertProduto(this.nomeField, this.descricaoField, this.categoriaField, this.precoField, this.descontoField);
        }
    }
};
</script>

<style scoped>

</style>