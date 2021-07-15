import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { useJwt } from "react-jwt";

import { api } from '../services/api';
import { useHistory } from 'react-router-dom';

type User = {
  email?: string;
  id?: string;
  imagem: string;
  nome: string;
}

type IAuthState = {
  token: string;
  user?: User;
}

type IAuthContextData  = {
  user?: User;
  token?: string
  signInWithGoogle(token: string): void;
  signOut(): void;
}

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const history = useHistory();

  let token = Cookie.get('@dlombello-withlogin:token');

  const { decodedToken, isExpired } = useJwt(String(token));

  const [data, setData] = useState(() => {
    api.defaults.headers.authorization = `Bearer ${token}`;

    if(token && isExpired){
      api.post('/refresh/token/google', {
        refresh_token: decodedToken.refresh_token
      }).then(response => {
        token = response.data; // retorna o token
      }).catch(() => {
        signOut();
        return;
      });
      
      return {token, user} as IAuthState;
    }
  });

  

  const signInWithGoogle = useCallback((token: string) => {
    // 1 hora em 1 dia -> 0.04166667
    Cookie.set('@dlombello-withlogin:token', token);

    api.defaults.headers.authorization = `Bearer ${token}`;

    api.get('/usuario').then(response => {
      setUser(response.data);
    });
  }, []);

  const signOut = useCallback(() => {
    Cookie.remove('@dlombello-withlogin:token');

    history.push('/');

    setData({} as IAuthState);
    return;
  }, [history]);

  useEffect(() => {
    api.get('/usuario').then(response => {
      setUser(response.data);
    });

    const token = Cookie.get('@dlombello-withlogin:token');
    setData({token} as IAuthState);

    if(!token) {
      history.push('/');
    }
    return;
  }, []);

  return (
    <AuthContext.Provider value={{user, token: data?.token, signOut, signInWithGoogle}}>
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