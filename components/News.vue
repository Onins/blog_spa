<template>
  <div class="news">
    <div class="news__wrapper l-container">
      <div class="news-header">
        <h3 class="news-header__text">NEWS</h3>
        <div class="news-header__post">
          <a href="" class="news-header__post-link">Create New Post</a>
        </div>
      </div>
      <ul class="news-list" >
        <li  v-for="(news, i) in this.getAllPosts" :key="i">
          <nuxt-link class="news-item" to="/post" @click="setId(news.id)">
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
// import {mapActions, mapState} from 'vuex'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers('news')

export default {
  computed: {
    ...mapGetters(['getAllPosts', 'getPostOffset', "getPostLimit", "getLoadMoreState"])
  },

  middleware: 'newsList',

  data() {
    return {
      loadCount: 0      
    }
  },

  methods: {
    ...mapMutations(["setPosts", "setOffset", "setNews"]),
    ...mapActions(["loadNews"]),

    setId(id) {
      this.setNews(id);
    },

    loadMore(){
      this.loadNews({
        count: this.loadCount, 
        offset: this.getPostOffset
      });
    }
  }
  
}
</script>

<style scoped>

</style>
