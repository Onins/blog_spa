<template>
  <div class="news">
    <div class="news__wrapper l-container">
      <div class="news-header">
        <h3 class="news-header__text">NEWS</h3>
        <div class="news-header__post">
          <nuxt-link :to="'/post'" class="news-header__post-link" v-if="getLogin == 'true'">Create New Post</nuxt-link>
        </div>
      </div>
      <ul class="news-list" >
        <li v-for="(news, i) in this.getAllPosts" :key="i">
          <nuxt-link class="news-item" :to="'/news/'+ news.id">
            <div class="news-item__image" style="background-image: url('https://via.placeholder.com/150')"></div>
            <span class="news-item__date" v-if="news.createdAt != null">{{ (news.createdAt).match(/^([\S]+)/g).toString().replace(/[[\]]/g,'') }}</span>
            <p class="news-item__text">{{ news.title }}</p>
          </nuxt-link>
        </li>
      </ul>
      <div class="news__load-more" v-if="this.getLoadMoreState == false">
        <button @click="loadMore()" class="news__load-button">LOAD MORE</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('news',['getAllPosts', 'getPostOffset', 'getLoadMoreState']),
    ...mapGetters('user', ['getAuth', 'getLogin'])
  },

  data() {
    return {
      loadCount: 0      
    }
  },

  beforeRouteEnter (to, from, next) { 
    next(vm => { 
      this.setOffset(6);
      console.log('set6');
      next();
    }) 
  },

  methods: {
    ...mapMutations('news', ['setPosts', 'setOffset']),
    ...mapActions('news',['loadNews']),

    loadMore(){
      this.loadNews({
        count: this.loadCount, 
        offset: this.getPostOffset,
        limit: 6
      });
    }
  }
  
}
</script>

<style scoped>

</style>
