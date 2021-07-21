import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { decodeToken } from "react-jwt";

import { api } from '../services/api';
import { useHistory } from 'react-router-dom';
import {AxiosError} from 'axios';

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
    
  const signOut = useCallback(() => {
    Cookie.remove('@dlombello-withlogin:token');

    history.push('/');

    setData({} as IAuthState);
    return;
  }, [history]);

  useEffect(() => {
    const token = Cookie.get('@dlombello-withlogin:token');
    if(!token) {
      setData({} as IAuthState);
      history.push('/');
      return;
    }
    api.interceptors.response.use((response) => response, async (error: AxiosError) => {
      const DecodedToken = await decodeToken(token);  

      if(error.response?.status === 401) {
        history.push('/');
        return;
      //   api.post('/refresh/token/google', {
      //     refresh_token: DecodedToken.refresh_token
      //   }).then(response => {
      //     Cookie.set('@dlombello-withlogin:token', response.data);
      //     api.defaults.headers.authorization = `Bearer ${response.data}`;
      //     setData({token: response.data}); // retorna o token
      //   }).catch(() => {
      //     signOut();
      //     return;
      //   });
      // }
    });

    api.get('/usuario').then(response => {
      setUser(response.data);
    });

  }, [history, signOut]);

  const [data, setData] = useState(() => {
    let token = Cookie.get('@dlombello-withlogin:token');
    api.defaults.headers.authorization = `Bearer ${token}`;
   
    return {token, user} as IAuthState;
  });

  const signInWithGoogle = useCallback((token: string) => {
    // 1 hora em 1 dia -> 0.04166667
    Cookie.set('@dlombello-withlogin:token', token);

    api.defaults.headers.authorization = `Bearer ${token}`;

    api.get('/usuario').then(response => {
      setUser(response.data);
    });
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