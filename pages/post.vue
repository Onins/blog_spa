<template>
  <div>
    <Breadcrumbs :isCreate="getPostState.isCreate"/>
    <div class="input">
      <div class="input__wrapper l-container" v-if="getLogin == 'true'">
        <div class="input__edit">
          <button class="input__edit-link input__edit-link--save" @click="doPost">Save Post</button>
          <nuxt-link :to="'/'" v-if="getPostState.isCreate" class="input__edit-link">Cancel</nuxt-link>
          <nuxt-link :to="'/news/'+ getPostData.id" v-if="getPostState.isUpdate" class="input__edit-link">Cancel</nuxt-link>
        </div>
        <p class="input__date">2019.06.19</p>
        <textarea class="input__title" ref="ctitle" placeholder="Title" v-model="postTitle"/>
        <div class="input__image" style="background-image: url('https://via.placeholder.com/1120x540')">
          <button class="input__button">UPLOAD IMAGE</button>
        </div>
        <textarea class="input__content" placeholder="Content" ref="cinput" v-model="postContent"></textarea>
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
    ...mapGetters('input', ['getIsPosted']),
    ...mapGetters('post', ['getPostData', 'getPostState'])
  },

  data() {
    return {
      postTitle: "",
      postContent: "",
      postImage: ""
    }
  }, 

  watch: {
    getIsPosted: function () {
      if(this.getIsPosted != null) {        
        if (this.getIsPosted) {
          if(this.getPostState.isCreate) {
            this.$router.push('/');
            this.setNotification('Post created successfully.');
          }
          else {
            this.$router.push('/news/'+ this.getPostData.id);
            this.setNotification('Post updated successfully.');
          }
        }
        else {
          this.setNotification("Unable to post. Unauthorized login.");
        }
        this.setIsPosted(null);
      }      
    }
  },
  fetch() {
    this.postTitle = this.getPostData.title == undefined ? "" : this.getPostData.title;
    this.postContent = this.getPostData.content == undefined ? "" : this.getPostData.content;;

    if (this.postTitle) {
      this.setPostState({isCreate: false, isUpdate: true});
    }
    else {
      this.setPostState({isCreate: true, isUpdate: false});
    }
  },

  beforeRouteLeave: function(to, from, next) {
    this.setPostData([]);
    next();
  },
  methods: {
    ...mapActions('input',['createPost', 'updatePost']),
    ...mapMutations('input', ['setIsPosted']),
    ...mapMutations('post', ['setPostData', 'setPostState']),
    ...mapMutations('notification', ['setNotification']),
    
    doPost() {
      if(this.postTitle != "" && this.postContent != "") {
        if(this.getPostState.isUpdate) {
          this.updatePost({
            id: this.getPostData.id,
            image: this.postImage,
            title: this.postTitle,
            content: this.postContent,
            authHeader: this.getAuth
          });
        }
        else {
          this.createPost({            
            title: this.postTitle,
            content: this.postContent,
            authHeader: this.getAuth
          });
        }

        this.resetFields();
      }
    },

    resetFields() {
      this.postTitle = "";
      this.postContent = "";
    }
  }
}
</script>