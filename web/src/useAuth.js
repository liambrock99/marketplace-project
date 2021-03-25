import { useState, useContext, createContext } from 'react';
// https://usehooks.com/useAuth/  

const authContext = createContext();


export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  }
  
  const logout = () => {
    setUser(false);
  }

  return {
    user,
    login,
    logout
  }

}