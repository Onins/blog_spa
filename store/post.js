import axios from 'axios';

export const state = () => ({
  postData: [],
  postId: ''
})

export const getters = {
  getPostData: (state) => state.postData,
  getPostId: (state) => state.postId
}

export const mutations = {
  setPostData: (state, getPostData) => (state.postData = getPostData),
  setPostId: (state, getPostId) => (state.postId = getPostId)
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
  async getPostContent({state, commit}) {
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
  }
}
