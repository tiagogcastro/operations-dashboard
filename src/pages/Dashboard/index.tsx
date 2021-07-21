import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

import { Header } from '../../components/Header';
import { SubHeader } from '../../components/SubHeader';

import spreadsheetImage from '../../assets/images/spreadsheet.svg';

import {
  Container,
  Content,
  NotCarteira,
  Section,
  Table
} from './styles';

type Carteira = {
  date_ini: Date;

  ativo: string
  classe: string;
  corretora: string;
  market_cod: string;
  moeda: string;
  setor: string;
  subsetor: string;

  change: number;
  changepct: number;
  fator_pts: number;
  pm: number;
  pm_fx: number;
  pm_ptax: number;
  price: number;
  qtd: number;
  vlr_investido: number;
};

export function Dashboard() {
  const history = useHistory();
  const location = useLocation();
  const {signInWithGoogle, token, user} = useAuth();
  const paramsToken = location.search.replace('?jwt=', '');

  const [carteira, setCarteira] = useState<Carteira[]>([]);

  useEffect(() => {
    if(paramsToken) {
      signInWithGoogle(paramsToken);
    }
    api.get(`/carteira`).then(response => {
      setCarteira(response.data);
    });

  }, [paramsToken, token, history, signInWithGoogle]);

  const parseToLocaleString = useCallback((operation_field: string | number) => {
    return operation_field ? operation_field.toLocaleString('Pt-br', {maximumFractionDigits: 4}) : 0;
  }, []);

  const carteiraUpdated = useMemo(() => {
    return carteira.map((carteira, index) => {
      return {
        ...carteira,
        id: `${index}.${Math.random()}${Date.now().toFixed(6)}`,
        change: parseToLocaleString(carteira.change),
        changepct: parseToLocaleString(carteira.changepct),
        pm: parseToLocaleString(carteira.pm),
        pm_fx: parseToLocaleString(carteira.pm_fx),
        pm_ptax: parseToLocaleString(carteira.pm_ptax),
        price: parseToLocaleString(carteira.price),
        qtd: parseToLocaleString(carteira.qtd),
        vlr_investido: parseToLocaleString(carteira.vlr_investido),
      }
    })
  }, [carteira, parseToLocaleString]);
  
  return (
    <Container>
      <Header 
        nome={user?.nome}
        imagem={user?.imagem}
      />
      <SubHeader />
      <Content>
        <div>
          <h1>Carteira</h1>
        </div>
        {!carteira.length ? (
        <NotCarteira>
          <img src={spreadsheetImage} alt="Imagem de spreadsheet" />
          <div>
            <h2>Me parece que você não tem nenhum dado na Carteira</h2>
            <h3>Crie alguns agora mesmo!</h3>
          </div>
        </NotCarteira>
        ) : (

        <Section>
          <Table>
            <div className="thead">
              <div className="tr">
                <span>ativo</span>
                <span>change</span>
                <span>changepct</span>
                <span>classe</span>
                <span>corretora</span>
                <span>date_ini</span>
                <span>fator_pts</span>
                <span>market_cod</span>
                <span>moeda</span>
                <span>pm</span>
                <span>pm_fx</span>
                <span>pm_ptax</span>
                <span>price</span>
                <span>qtd</span>
                <span>setor</span>
                <span>subsetor</span>
                <span>vlr_investido</span>
              </div>
            </div>

            <div className="tbody">
              {carteiraUpdated?.map(carteira => (
                <div className="tr" key={carteira.id}>
                  <span>{carteira.ativo}</span>
                  <span>{carteira.change}</span>
                  <span>{carteira.changepct}</span>
                  <span>{carteira.classe}</span>
                  <span>{carteira.corretora}</span>
                  <span>{carteira.date_ini}</span>
                  <span>{carteira.fator_pts}</span>
                  <span>{carteira.market_cod}</span>
                  <span>{carteira.moeda}</span>
                  <span>{carteira.pm}</span>
                  <span>{carteira.pm_fx}</span>
                  <span>{carteira.pm_ptax}</span>
                  <span>{carteira.price}</span>
                  <span>{carteira.qtd}</span>
                  <span>{carteira.setor}</span>
                  <span>{carteira.subsetor}</span>
                  <span>{carteira.vlr_investido}</span>
                </div>
              ))}
            </div>
          </Table>
        </Section>
        )}

      </Content>
    </Container>
  )
}