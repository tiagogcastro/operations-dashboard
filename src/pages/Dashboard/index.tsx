import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

import { Header } from '../../components/Header';
import { SubHeader } from '../../components/SubHeader';

import {
  Container,
  Content
} from './styles';

export function Dashboard() {
  const history = useHistory();
  const location = useLocation();
  const {signInWithGoogle, token, user} = useAuth();
  const paramsToken = location.search.replace('?jwt=', '');

  // const [user, setUser] = useState<User>();

  useEffect(() => {
    if(paramsToken) {
      signInWithGoogle(paramsToken);
      return;
    }
    // api.get(`/operacoes`).then(response => {
    //   console.log(response.data);
    // });

  }, [paramsToken, token, history, signInWithGoogle]);

  return (
    <Container>
      <Header 
        nome={user?.nome}
        imagem={user?.imagem}
      />
      <SubHeader />
      <Content>
        
      </Content>
    </Container>
  )
}