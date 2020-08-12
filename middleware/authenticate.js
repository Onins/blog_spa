export default function ({store}) {
  let state = localStorage.getItem("isLoggedIn");
  store.commit("user/setLogin", state);
}