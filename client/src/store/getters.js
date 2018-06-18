const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  username: state => state.user.username,
  roles: state => state.user.roles,
  email: state => state.user.email,
  ojInfo: state => state.ojInfo.ojInfo,
  gatewayItems: state => state.gateway.itemList
}
export default getters
