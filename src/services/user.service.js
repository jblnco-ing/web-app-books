import API from "../api";
const user = {
    isAuthenticated: false,
    token: null,
    tokenKey: 'token',
    signin: async (data, config={}) => {
      const response = await API.put(`user/${data.email}`, data, config);
      if (response.data) {
        user.isAuthenticated = true;
        user.token= response.data.sessionTokenBck
      }
      return response;
    },
    signout: async (config={}) => {
      user.isAuthenticated = false;
      user.token= null
    }
  };

  export default user;