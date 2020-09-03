import axios from 'axios'


export const state = () => ({
  isLoggedIn: false,
  isRegistered: null,
  regMessage: "",
  isModalOpen: false,
  authCode: ""
  
})

export const getters = {
  getLogin: (state) => state.isLoggedIn, 
  getAuth: (state) => state.authCode,
  getRegStat: (state) => state.isRegistered,
  getRegMsg: (state) => state.regMessage,
  getModalOpen: (state) => state.isModalOpen,
}

export const mutations = {
  setLogin: (state, getLogin) => (state.isLoggedIn = getLogin),
  setAuth: (state, getAuth) => (state.authCode = getAuth),
  setRegStat: (state, getRegStat) => (state.isRegistered = getRegStat),
  setRegMsg: (state, getRegMsg) => (state.regMessage = getRegMsg),
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
      if(response.data.errors == undefined) {
        commit('setRegMsg', "");
        commit('setRegStat', true);
      }
      else {
        commit('setRegMsg', response.data.errors[0].message);
        commit('setRegStat', false);
      }
    });
  }
}