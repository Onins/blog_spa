<template>
  <div class="l-container">
    <div class="header">
      <Logo/>
      <Login/>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue"
import Login from "~/components/Login.vue"

export default {
  components: {
    Logo,
    Login
  }
}
</script>

<style scoped>

</style>
