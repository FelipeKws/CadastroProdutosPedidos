<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" @click="Produtos">
          Produtos
        </a>

        <a class="navbar-item" @click="Pedidos">
          Pedidos
        </a>

        <a class="navbar-item" @click="Carrinho">
          Carrinho
        </a>

        <a class="navbar-item" @click="CadProd">
          Cadastro de produtos
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-danger">
              <strong>Cadastre-se</strong>
            </a>
            <a class="button is-light">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    Produtos: function(){
      this.$emit('Produtos')
    },
    Pedidos: function(){
      this.$emit('Pedidos')
    },
    Carrinho: function(){
      this.$emit('Carrinho')
    },
    CadProd: function(){
      this.$emit('CadProd')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
