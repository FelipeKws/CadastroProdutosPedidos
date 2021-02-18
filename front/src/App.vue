<template>
  <div>
    <div id="header">
      <BarraNavegacao/>
    </div>
    <Cadastro/>
  </div>
</template>

<script>
import BarraNavegacao from './components/BarraNavegacao.vue'
import Cadastro from './components/Cadastro.vue'

export default {
  name: 'App',
  components: { 
    BarraNavegacao,
    Cadastro 
  },
}
</script>

<style>
#header {
  margin-bottom: 2%;
}
</style>
