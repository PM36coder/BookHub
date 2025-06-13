import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

  //! here is token saved in local storage
  const [token, setToken] = useState(localStorage.getItem('Token'))
  const storeToken = (serverToken)=>{
    localStorage.setItem('Token',serverToken);
    setToken(serverToken)
    return true;
  }

  //!to check user is login or not
 let isLoggedIn = !!token

 //! for logout user 
 const logout = ()=>{
  localStorage.removeItem('Token')
  setToken(null)
 }

  return (
    <AuthContext.Provider value={{storeToken ,token , isLoggedIn,logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = ()=>{
  return useContext(AuthContext)
}