import {
  Container,
  Content
} from './styles';

import { Link } from 'react-router-dom';

export function SubHeader() {
  return (
    <Container>
      <Content>
        <Link to="/token">Carteira</Link>
        <Link to="/operacoes">Operações</Link>
        {/* <Link to="/proventos">Proventos</Link> */}
        {/* <Link to="/eventos">Eventos</Link>   */}
        {/* <Link to="/cei">Cei</Link>   */}
        {/* <Link to="/ajuda">Ajuda</Link>   */}
      </Content>
    </Container>
  );
}