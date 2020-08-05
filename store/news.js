import axios from 'axios'

export const state = () => ({
  allPosts: [],
  batchPosts: [],
  postLimit: 6,
  offset: 6,
  loadMoreState: false,
  newsSelect: ""
})

export const getters = {
  getAllPosts: (state) => state.allPosts,
  getBatchPosts: (state) => state.batchPosts,
  getPostLimit: (state) => state.postLimit,
  getPostOffset: (state) => state.offset,
  getNewsSelect: (state) => state.newsSelect,
  getLoadMoreState: (state) => state.loadMoreState
}

export const mutations = {
  setPosts: (state, getAllPosts) => (state.allPosts = getAllPosts),
  setBatchPosts: (state, getBatchPosts) => (state.batchPosts = getBatchPosts),
  setOffset: (state, getPostOffset) => (state.offset = getPostOffset),
  setNews: (state, getNewsSelect) => (state.newsSelect = getNewsSelect),
  setLoadMoreState: (state, getLoadMoreState) => (state.loadMoreState = getLoadMoreState)
}

export const actions = {
  async loadNews({commit, state}, data) {
    let jsonData = JSON.stringify({
      query: 'query{\n  posts(\n    pagination: {\n      limit: 6,\n      offset: '+data.offset+'\n    }\n  ){\n    id, title, image, createdAt\n  }\n}',
      variables: {}
    });
  
    let config = {
      method: 'post',
      url: 'http://localhost:4000/graphql',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : jsonData
    };
  
    axios(config)
    .then((response)=>{
      let tempNews = [];
      if(response.data.data.posts.length < 6) {
        commit('setLoadMoreState', true);
      }
      tempNews.push(state.allPosts);
      tempNews.push(response.data.data.posts);
      commit('setPosts', Array.prototype.concat.apply([], tempNews));      
    })
}
}
