<template>
  <div>
    <div class="login">
      <button @click="toggleModal()" class="login-link" v-if="getLogin == 'false'">{{ modalText }}</button>

      <button @click="logout()" class="login-link" v-if="getLogin == 'true'">LOGOUT</button>
    </div>
    <div class="login-modal" :class="{'open': isModalOpen}">
      <!-- Login -->
      <div class="login-modal__wrapper" v-if="formSelected == 'login'">
        <p class="login-modal__header">LOGIN</p>
        <span class="login-modal__error">{{ loginError }}</span>
        <form ref="login" @submit.prevent="onSubmit" id="login" class="login-modal__form">
          <label for="login-email" class="login__label">Email</label>
          <input type="email" id="login-email" v-model="loginEmail" class="login__input">
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
        <span class="login-modal__error">{{ regError }}</span>
        <form ref="register" @submit.prevent="onSubmit" id="reg" class="login-modal__form">
          <label for="reg-email" class="login__label">Email</label>
          <input type="email" id="reg-email" v-model="regEmail" class="login__input">
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
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'

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

  computed: {
    ...mapGetters('user', ['getAuth', 'getRegStat', 'getLogin'])
  },

  watch: {
    getAuth: function () {
      if (this.getAuth) {
        localStorage.setItem('isLoggedIn', true);
        this.setLogin("true");
      }
    }
  },

  methods: {
    ...mapMutations('user', ['setAuth', 'setLogin']),
    ...mapActions('user', ['userRegister', 'userLogin']),

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
      let notEmpty;

      if(this.loginEmail != "" && this.loginPass != "") {        
        this.loginError = "";
        notEmpty = true;
      }
      else {
        this.loginError = "Input email and password.";
        return false;
      }


      if(notEmpty) {
        this.userLogin({
          email: this.regEmail,
          pass: this.regPass
        })
        
        this.resetFields();
        this.toggleModal();        
      }
    },
    submitRegister() {
      let notEmpty;
      let matchPass;

      if(this.regEmail != "" && this.regPass != "" && this.regConfirm != "") {        
        this.regError = "";
        notEmpty = true;
      }
      else {
        this.regError = "Please fill in all fields.";
        return false;
      }

      if (this.regPass == this.regConfirm) {
        this.regError = "";
        matchPass = true;
      }
      else{
        this.regError = "Passwords must match!";
        matchPass = false;
      }


      if(notEmpty && matchPass) {
        this.userRegister({
          email: this.regEmail,
          pass: this.regPass
        })

        this.resetFields();
        this.toggleModal();
      }
    },

    logout(){
      localStorage.setItem('isLoggedIn', false);
      this.setAuth(false);
      this.setLogin("false");
    },

    resetFields() {
      this.regError = "";
      this.regEmail = "";
      this.regPass = "";
      this.regConfirm = "";
      this.loginError = "";
      this.loginEmail = "";
      this.loginPass = "";
    }
  }
}
</script>

