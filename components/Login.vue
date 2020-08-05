<template>
  <div>
    <div class="login">
      <button @click="toggleModal()" class="login-link">{{ modalText }}</button>
    </div>
    <div class="login-modal" :class="{'open': isModalOpen}">
      <!-- Login -->
      <div class="login-modal__wrapper" v-if="formSelected == 'login'">
        <p class="login-modal__header">LOGIN</p>
        <span class="login-modal__error">{{ loginError }}</span>
        <form ref="login" @submit.prevent="onSubmit" id="login" class="login-modal__form">
          <label for="login-email" class="login__label">Email</label>
          <input type="text" id="login-email" v-model="loginEmail" class="login__input">
          <label for="login-pass" class="login__label">Password</label>
          <input type="password" id="login-pass" v-model="loginPass" class="login__input">
          <input type="button" @click="submitLogin" class="login__button" value="LOGIN">
          <p class="login__text">No account yet? 
            <span class="login__link" @click="switchForm('register')">REGISTER HERE</span>
          </p>
        </form>
      </div>
      <!-- Register -->
      <div class="login-modal__wrapper" v-if="formSelected == 'register'">
        <p class="login-modal__header">REGISTER</p>
        <form ref="register" @submit.prevent="onSubmit" id="reg" class="login-modal__form">
          <label for="reg-email" class="login__label">Email</label>
          <input type="text" id="reg-email" v-model="regEmail" class="login__input">
          <label for="reg-pass" class="login__label">Password</label>
          <input type="password" id="reg-pass" v-model="regPass" class="login__input">
          <label for="reg-confirm" class="login__label">Confirm Password</label>
          <input type="password" id="reg-confirm" v-model="regConfirm" class="login__input">
          <input type="button" @click="submitRegister" class="login__button" value="REGISTER">
          <p class="login__text">Already have an account? 
            <span class="login__link" @click="switchForm('login')">LOGIN HERE</span>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isModalOpen: false,
      modalText: 'LOGIN',
      formSelected: 'login',
      loginError: '',
      loginEmail: '',
      loginPass: '',
      regError: '',
      regEmail: '',
      regPass: '',
      regConfirm: ''
    }
  },

  methods: {
    toggleModal() {
      if (this.isModalOpen) {
        this.isModalOpen = false;
        this.modalText = "LOGIN"
      }
      else {
        this.formSelected = 'login'
        this.isModalOpen = true;
        this.modalText = "CLOSE"
      }

      this.resetFields();
    },

    switchForm(data) {
      this.resetFields();
      this.formSelected = data;
    },

    submitLogin() {
      if(this.loginEmail != "" && this.loginPass != "") {        
        this.loginError = "";
      }
      else {
        this.loginError = "Input email and password";
        return false;
      }      
    },

    resetFields() {
      this.regError = "";
      this.regEmail = "";
      this.regPass = "";
      this.regConfirm = "";
      this.loginError = "";
      this.loginEmail = "";
      this.loginPass = "";
    },

    submitRegister() {
      console.log("register")
    }

  }
}
</script>

<style scoped>

</style>
