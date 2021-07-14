import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Header } from '../../components/Header';
import { SubHeader } from '../../components/SubHeader';
import { api } from '../../services/api';
import {
  Container,
  Content
} from './styles';

type User = {
  email?: string;
  id?: string;
  imagem: string;
  nome: string;
}

type UserConfig = {
  bdr_like_acao: 0 | 1;
  calc_por_corretora: 0 | 1;
  darf_inicio: number;
  darf_total: 0 | 1;
  dia_liq_ptax: number;
  dt_vd20k: 0 | 1;
  moeda_base: string;
  opcoes_vd20k: 0 | 1;
  outros_vd20k: 0 | 1;
  tributavel_daytrade: 0 | 1;
  tributavel_fii: 0 | 1;
  tributavel_normal: 0 | 1;
  vsub_FII: 0 | 1;
  vsub_isento: 0 | 1;
}

export function CalculationSetup() {
  const [user, setUser] = useState<User>();
  const [userConfig, setUserConfig] = useState<UserConfig>();
  const [loader, setLoader] = useState(false);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    api.get('/usuario').then(response => {
      setUser(response.data);
    });

    api.get('/usuario/config').then(response => {
      setUserConfig(response.data);
    });
  }, [])
  
  const handleUpdateUserConfiguration = useCallback((data: UserConfig) => {
    setLoader(true);

    const config = {
      bdr_like_acao: Boolean(data.bdr_like_acao),
      calc_por_corretora:Boolean(data.calc_por_corretora),
      darf_inicio: Number(data.darf_inicio),
      darf_total:Boolean(data.darf_total),
      dia_liq_ptax: Number(data.dia_liq_ptax),
      dt_vd20k:Boolean(data.dt_vd20k),
      moeda_base: data.moeda_base,
      opcoes_vd20k:Boolean(data.opcoes_vd20k),
      outros_vd20k:Boolean(data.outros_vd20k),
      tributavel_daytrade:Boolean(data.tributavel_daytrade),
      tributavel_fii:Boolean(data.tributavel_fii),
      tributavel_normal:Boolean(data.tributavel_normal),
      vsub_FII:Boolean(data.vsub_FII),
      vsub_isento:Boolean(data.vsub_isento),
    };
    
    api.put('/usuario/config', config).then(response => {
      setUserConfig(response.data);
     
      setLoader(false);
    });
  }, []);
    
  return (
    <Container>
      <Header 
        nome={user?.nome}
        imagem={user?.imagem}
      />
      <SubHeader />
      <Content>
        <h1>Configurações do usuário</h1>
        <form onSubmit={handleSubmit(handleUpdateUserConfiguration)}>
          <section>
            <div>
              <label>Moeda base</label>
              <input type="text" {...register("moeda_base")} defaultValue={userConfig?.moeda_base} maxLength={3} />
            </div>
            <div>
              <label>Dia liq ptax</label>
              <input {...register("dia_liq_ptax")} type="number" defaultValue={userConfig?.dia_liq_ptax} />
            </div>
            <div>
              <label>darf_inicio</label>
              <input {...register("darf_inicio")} type="number" defaultValue={userConfig?.darf_inicio} maxLength={4} />
            </div>
            <div>
              <label>Calculo por corretora</label>
              <select {...register("calc_por_corretora")} defaultValue={userConfig?.calc_por_corretora}>
                <option value={1}>true</option>
                <option value={0}>false</option>
              </select>
            </div>
            <div>
              <label>dt_vd20k</label>
              <select {...register("dt_vd20k")} defaultValue={userConfig?.dt_vd20k}>
                <option value={1}>true</option>
                <option value={0}>false</option>
              </select>
            </div>
            <div>
              <label>opções_vd20k</label>
              <select {...register("opções_vd20k")} defaultValue={userConfig?.opcoes_vd20k}>
                <option value={1}>true</option>
                <option value={0}>false</option>
              </select>
            </div>
            <div>
              <label>Vsub_FII</label>
              <select {...register("vsub_FII")} defaultValue={userConfig?.vsub_FII}>
                <option value={1}>true</option>
                <option value={0}>false</option>
              </select>
            </div>
            <div>
              <label>vsub_isento</label>
              <select {...register("vsub_isento")} defaultValue={userConfig?.vsub_isento}>
                <option value={0}>false</option>
                <option value={1}>true</option>
              </select>
            </div>
            <div>
              <label>bdr_like_acao</label>
              <select {...register("bdr_like_acao")} defaultValue={userConfig?.bdr_like_acao}>
                <option value={0}>false</option>
                <option value={1}>true</option>
              </select>
            </div>
            
            <div>
              <label>tributavel_normal</label>
              <select {...register("tributavel_normal")}  defaultValue={userConfig?.tributavel_normal}>
                <option value={0}>false</option>
                <option value={1}>true</option>
              </select>
            </div>
            <div>
              <label>tributavel_daytrade</label>
              <select {...register("tributavel_daytrade")} defaultValue={userConfig?.tributavel_daytrade}>
                <option value={0}>false</option>
                <option value={1}>true</option>
              </select>
            </div>
            <div>
              <label>tributavel_fii</label>
              <select {...register("tributavel_fii")} defaultValue={userConfig?.tributavel_fii}>
                <option value={0}>false</option>
                <option value={1}>true</option>
              </select>
            </div>
            <div>
              <label>darf_total</label>
              <select {...register("darf_total")} defaultValue={userConfig?.darf_total}>
                <option value={0}>false</option>
                <option value={1}>true</option>
              </select>
            </div>
          </section>
          <button type="submit">{loader ? 'Atualizando...' : 'Salvar configurações'}</button>
        </form>
      </Content>
    </Container>
  );
}