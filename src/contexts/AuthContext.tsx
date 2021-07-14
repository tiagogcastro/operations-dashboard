import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api';

type IAuthState = {
  token: string;
  user?: object;
}

type IAuthContextData  = {
  user?: object;
  data: object;
  token: string
  signInWithGoogle(token: string): void;
  signOut(): void;
}

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export function AuthProvider({children}: AuthProviderProps) {
  const history = useHistory();

  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@dlombello-withlogin:token');
  
    if(!token) {
      history.push('/');
      
    }
    api.defaults.headers.authorization = `Bearer ${token}`;
    return {token} as IAuthState;
  });

  const signInWithGoogle = useCallback((token: string) => {
    localStorage.setItem('@dlombello-withlogin:token', token);
    
    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({
      token
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@dlombello-withlogin:token');

    setData({} as IAuthState);
    return;
  }, []);

  return (
    <AuthContext.Provider value={{data, token: data.token, signOut, signInWithGoogle}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}