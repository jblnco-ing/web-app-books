import React, { useContext, createContext } from "react";
import userService from "../services/user.service";
import useLocalStorage from "./useLocalStorage";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useLocalStorage('user',null);
  
  const signin = (email, password) => {
    const data = {
        email,
      };
      const config = {
        headers: {
          app: 'APP_BCK',
          password
        }
      }  
    return userService.signin(data,config)
    .then(response=>{
        const {token, isAuthenticated}=userService;
        const data={...response.data,token,isAuthenticated}
        setUser(data);
        return response;
    });
  };
  
  const signout = () => userService.signout()
    .then((response)=>{
        setUser(null);
        return response;
    },
    error=>console.log(error));
  
  return {
    user,
    signin,
    signout,
  };
}