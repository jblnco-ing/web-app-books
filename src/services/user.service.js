import API from "../api";
const user = {
    isAuthenticated: false,
    token: null,
    tokenKey: 'token',
    signin: (data, config={}) => {
      return API.put(`user/${data.email}`, data, config)
      .then(response =>{
        if (response?.data) {
          user.isAuthenticated = true;
          user.token= response.data.sessionTokenBck
        }
        return response;
      });
    },
    signout: async () => {
      user.isAuthenticated = false;
      user.token= null
    }
  };

  export default user;