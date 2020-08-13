import axios from 'axios'


export const state = () => ({
  isLoggedIn: false,
  isRegistered: false,
  isModalOpen: false,
  authCode: ""
  
})

export const getters = {
  getLogin: (state) => state.isLoggedIn, 
  getAuth: (state) => state.authCode,
  getRegStat: (state) => state.isRegistered,
  getModalOpen: (state) => state.isModalOpen,
}

export const mutations = {
  setLogin: (state, getLogin) => (state.isLoggedIn = getLogin),
  setAuth: (state, getAuth) => (state.authCode = getAuth),
  setRegStat: (state, getRegStat) => (state.isRegistered = getRegStat),
  setModalOpen: (state, getModalOpen) => (state.isModalOpen = getModalOpen)
}

export const actions = {
  async userLogin({commit}, data) {
    let jsonData = JSON.stringify({
      query: 'mutation {\n  authenticate(\n    email: "'+data.email+'",\n    password: "'+data.password+'"\n  )\n}',
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
  
    axios(config).then((response)=> {
      commit('setAuth', response.data.data.authenticate);
    });
  },
  async userRegister({commit}, data) {
    let jsonData = JSON.stringify({
      query: 'mutation {\n  register(\n    email: "'+data.email+'",\n    password: "'+data.password+'"\n  )\n}',
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
    .then((response)=> {
      commit('setRegStat', response.data.data.register);
    });
  }
}