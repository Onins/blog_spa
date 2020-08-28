export const state = () => ({
  sliderWidth: 0,
  sliderPosts: []
})

export const getters = {
  getSliderWidth: (state) => state.sliderWidth,
  getSliderPosts: (state) => state.sliderPosts
}

export const mutations = {
  setSliderWidth: (state, getSliderWidth) => (state.sliderWidth = getSliderWidth),
  setSliderPosts: (state, getSliderPosts) => (state.sliderPosts = getSliderPosts)
}