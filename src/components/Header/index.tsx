import {
  Container,
  Content
} from './styles';

import logoImg from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

type HeaderProps = {
  email?: string;
  id?: string;
  imagem?: string;
  nome?: string;
}

export function Header(props: HeaderProps) {
  const { signOut } = useAuth();
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
    {dropdown && <div id="close_dropdown" onClick={() => setDropdown(false)}></div>}
    <Container>
      <Content dropdown={dropdown}>
        <Link to="/token"><img src={logoImg} alt="Logo da dlombello" /></Link>
        <div onClick={() => setDropdown(!dropdown)}>
          <img src={props.imagem} alt={props.nome} />
          <span>{props.nome}</span>
          <div className="dropdown-menu">
            <Link to="/perfil">Perfil</Link>
            <Link to="/config-calculo">Configurações</Link>
            <button onClick={signOut}>Sair</button>
          </div>
        </div>
      </Content>
    </Container>
    </>
  );
}