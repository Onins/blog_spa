export const state = () => ({
  notification: [],
})

export const getters = {
  getNotification: (state) => state.notification
}

export const mutations = {
  setNotification: (state, getNotification) => (state.notification = getNotification)
}