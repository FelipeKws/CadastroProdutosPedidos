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
            <!-- Check that the SDK client is not currently loading before accessing is methods -->
            <div v-if="!$auth.loading">
              <!-- show login when not authenticated -->
              <a v-if="!$auth.isAuthenticated" @click="login" class="button is-danger"><strong>Entrar</strong></a>
              <!-- show logout when authenticated -->
              <a v-if="$auth.isAuthenticated" @click="logout" class="button is-light"><strong>Sair</strong></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    },
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
