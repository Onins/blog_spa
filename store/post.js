import axios from 'axios';

export const state = () => ({
  postData: [],
  postId: '',
  postState: {
    isCreate: true,
    isUpdate: false
  },
  lastPost: ''
})

export const getters = {
  getPostData: (state) => state.postData,
  getPostId: (state) => state.postId,
  getPostState: (state) => state.postState,
  getLastPost: (state) => state.lastPost

}

export const mutations = {
  setPostData: (state, getPostData) => (state.postData = getPostData),
  setPostId: (state, getPostId) => (state.postId = getPostId),
  setPostState: (state, getPostState) => (state.postState = getPostState),
  setLastPost: (state, getLastPost) => (state.lastPost = getLastPost)
}

export const actions = {
  async postComment({state}, data) {
    let jsonData = JSON.stringify({
      query: 'mutation {\n  addComment(\n		postId: '+ state.postId +',\n    content: "'+data+'") {\n    id,\n    postId,\n    content,\n    createdAt\n  }\n}',
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
  },
  async fetchPostContent({state, commit}) {
    let result;
    let data = JSON.stringify({
      query: 'query{\n  post(\n   id: '+ state.postId +'\n  ){\n    id, title, content, image, createdAt, comments {\n      id, content, createdAt\n    }\n  }\n}',
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

    axios(config)
    .then((response)=>{
      result = response.data.data.post;
      commit('setPostData', result);
    })
  },

  async fetchLastPost({commit}) {
    let result;
    let data = JSON.stringify({
      query: 'query{\n  posts(\n    pagination: {\n      limit: 1,\n      offset: 0\n    }\n  ){\n    id, title, content, image, createdAt, comments {\n      id, content\n    }\n  }\n}',
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

    axios(config)
    .then((response)=>{
      result = response.data.data.posts;
      commit('setLastPost', result);
    })
  }
}
