export const state = () => ({
  allPosts: [],
  postLimit: 6,
  offset: 0,
  newsSelect: ""
})

export const getters = {
  getAllPosts: (state) => state.allPosts,
  getPostLimit: (state) => state.postLimit,
  getPostOffset: (state) => state.offset,
  getNewsSelect: (state) => state.newsSelect
}

export const mutations = {
  setPosts: (state, getAllPosts) => (state.allPosts = getAllPosts),
  setOffset: (state, getPostOffset) => (state.offset = getPostOffset),
  setNews: (state, getNewsSelect) => (state.newsSelect = getNewsSelect),
}
