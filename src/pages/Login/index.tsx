import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import App from '../../config/App';

import logoImg from '../../assets/images/logo.png';
import googleIcon from '../../assets/images/google-icon.svg';

import {
  Container,
  Background,
  Content,
  GoogleButton
} from './styles';

export function Login() {
  const { token } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if(token) {
      history.push('/token');
      return;
    }
  }, [history, token]);

  return (
    <Container>
      <Content>
        <div>
          <img src={logoImg} alt="Logo do dlombello"/>
          <h2>Acesse sua conta</h2>
          <GoogleButton 
            href={
              `https://dlp-usuarios-api.herokuapp.com/login/google${App.url}`}
          >
            <img src={googleIcon} alt="Logo da google"/> Continue com o google
          </GoogleButton>
        </div>
      </Content>
      <Background />
    </Container>
  );
}