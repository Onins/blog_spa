<template>
  <div>
    <Breadcrumbs :isCreate="isCreate"/>
    <div class="input">
      <div class="input__wrapper l-container" v-if="getLogin == 'true'">
        <div class="input__edit">
          <button class="input__edit-link input__edit-link--save" @click="doAddPost">Save Post</button>
          <nuxt-link :to="'/'" class="input__edit-link">Cancel</nuxt-link>
        </div>
        <p class="input__date">2019.06.19</p>
        <textarea class="input__title" ref="ctitle" placeholder="Title" v-model="createTitle"/>
        <div class="input__image" style="background-image: url('https://via.placeholder.com/1120x540')">
          <button class="input__button">UPLOAD IMAGE</button>
        </div>
        <textarea class="input__content" placeholder="Content" ref="cinput" v-model="createContent"></textarea>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'

export default {
  components: {
    Breadcrumbs
  },
   computed: {
    ...mapGetters('user', ['getAuth', 'getLogin']),
    ...mapGetters('input', ['getIsPosted'])
  },
  data() {
    return {
      isCreate: true,
      createTitle: "",
      createContent: ""
    }
  }, 

  watch: {
    getIsPosted: function () {
      if(this.getIsPosted != null) {        
        if (this.getIsPosted) {
          this.$router.push('/');
        }

        else {
          alert("Unable to create post. Unauthorized login");
        }

        this.setIsPosted(null);
      }      
    }
  },
  methods: {
    ...mapActions('input',['createPost']),
    ...mapMutations('input', ['setIsPosted']),
    
    doAddPost() {
      if(this.createTitle != "" && this.createContent != "") {
        this.createPost({
          title: this.createTitle,
          content: this.createContent,
          authHeader: this.getAuth
        });

        this.resetFields();
      }
    },

    resetFields() {
      this.createTitle = "";
      this.createContent = "";
    }

  }
}
</script>