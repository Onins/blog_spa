export default function ({store}) {
  let state = localStorage.getItem("isLoggedIn");
  let auth = localStorage.getItem('auth');
  store.commit("user/setLogin", state);
  store.commit("user/setAuth", auth);
}