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
        <li class="news-item" v-for="(news, i) in this.newsBlog" :key="i">
          <nuxt-link to="/post">
            <div class="news-item__image" style="background-image: url('https://via.placeholder.com/150')"></div>
            <span class="news-item__date" v-if="news.createdAt != null">{{ (news.createdAt).match(/^([\S]+)/g).toString().replace(/[[\]]/g,'') }}</span>
            <p class="news-item__text">{{ news.title }}</p>
          </nuxt-link>
        </li>
      </ul>
      <div class="news__load-more" v-if="this.disableLoad == false">
        <button @click="$fetch" class="news__load-button">LOAD MORE</button>
      </div>
    </div>
  </div>
</template>

<script>
// import {mapActions, mapState} from 'vuex'
import { createNamespacedHelpers } from 'vuex'
import axios from 'axios'
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('posts')

export default {
  computed: {
    ...mapState(['allPosts']),
    ...mapGetters(['getAllPosts', 'getPostOffset', "getPostLimit"])
  },

  data() {
    return {
      newsBlog: [],
      tempBlog: [],
      loadCount: 0,
      disableLoad: false
    }
  },

  methods: {
    ...mapMutations(["setPosts", "setOffset"])
  },

  async fetch() {
    let data = JSON.stringify({
      query: 'query{\n  posts(\n    pagination: {\n      limit: '+this.getPostLimit+',\n      offset: '+this.getPostOffset+'\n    }\n  ){\n    id, title, image, createdAt\n  }\n}',
      variables: {}
    });

    let config = {
      method: 'post',
      url: 'http://localhost:4000/graphql',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    await axios(config)
    .then((response)=>{
      this.tempBlog.push(response.data.data.posts)
      this.setPosts(Array.prototype.concat.apply([], this.tempBlog));
      this.newsBlog = this.getAllPosts;
      
      //Increase post offset
      this.setOffset(this.getPostOffset + 6);

      //Disalbe load more if there are no more post
      
      if(this.tempBlog[this.loadCount].length < 6) {
        this.disableLoad = true;
      }
      this.loadCount += 1;
      
    })  
  },

  mounted() {
    
  }
  
}
</script>

<style scoped>

</style>
