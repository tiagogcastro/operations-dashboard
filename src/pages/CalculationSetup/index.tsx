import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

import { Header } from '../../components/Header';
import { SubHeader } from '../../components/SubHeader';

import {
  Container,
  Content
} from './styles';

type UserConfig = {
  dt_vd20k: 0 | 1;
  opcoes_vd20k: 0 | 1;
  vsub_FII: 0 | 1;
  vsub_isento: 0 | 1;
  outros_vd20k: 0 | 1;
  bdr_like_acao: 0 | 1;
  
  tributavel_daytrade: number;
  tributavel_fii: number;
  tributavel_normal: number;
  darf_total: number;

  calc_por_corretora: 0 | 1;
  darf_inicio: number;
  dia_liq_ptax: number;
  moeda_base: string;
}

type InputErrors = {
  text: string;
  className?: string;
}

export function CalculationSetup() {
  const {user} = useAuth();
  const [userConfig, setUserConfig] = useState<UserConfig>();
  const [loader, setLoader] = useState(false);
  const { register, handleSubmit } = useForm();
  const [inputErrors, setInputErrors] = useState<InputErrors>()

  const handleUpdateUserConfiguration = useCallback((data: UserConfig) => {
    setLoader(true);

    const config = {
      dt_vd20k:Boolean(data.dt_vd20k),
      opcoes_vd20k:Boolean(data.opcoes_vd20k),
      outros_vd20k:Boolean(data.outros_vd20k),
      vsub_FII:Boolean(data.vsub_FII),
      vsub_isento:Boolean(data.vsub_isento),
      bdr_like_acao: Boolean(data.bdr_like_acao),
      
      tributavel_daytrade:Number(data.tributavel_daytrade),
      tributavel_fii:Number(data.tributavel_fii),
      tributavel_normal:Number(data.tributavel_normal),
      darf_total:Number(data.darf_total),
      
      calc_por_corretora:Boolean(data.calc_por_corretora),
      darf_inicio: Number(data.darf_inicio),
      dia_liq_ptax: Number(data.dia_liq_ptax),
      moeda_base: data.moeda_base,
    };
    const date = new Date();

    const year = date.getFullYear();

    if(config.darf_inicio > year || config.darf_inicio < 2000) {
      console.log(config.darf_inicio)
      setInputErrors({text: 'Preencha o Ano de inicio dos calculos com uma data válida.', className: 'inputError'});
      setLoader(false);
      return;
    }

    api.put('/usuario/config', config).then(response => {
      setInputErrors({text: ''})
      setUserConfig(response.data);
      console.log(response.data);
      setLoader(false);

      api.get('/usuario/config').then(response => {
        setUserConfig(response.data);
      });
    });
  }, []);

  useEffect(() => {
    api.get('/usuario/config').then(response => {
      setUserConfig(response.data);
    });
  }, [])

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
            <aside>
              <h2>DARF - Configuração de Calculos</h2>
              <div>
                <div>
                  <label>Somar vendas de dayrade no limite 20k</label>
                  <select {...register("dt_vd20k")} defaultValue={userConfig?.dt_vd20k}>
                    <option value={1}>true</option>
                    <option value={0}>false</option>
                  </select>
                </div>
                <div>
                  <label>Somar vendas de opções classes no limite 20k</label>
                  <select {...register("opções_vd20k")} defaultValue={userConfig?.opcoes_vd20k}>
                    <option value={1}>true</option>
                    <option value={0}>false</option>
                  </select>
                </div>
                <div>
                  <label>Somar vendas de outras classes no limite 20k</label>
                  <select {...register("outros_vd20k")} defaultValue={userConfig?.outros_vd20k}>

                    <option value={1}>true</option>
                    <option value={0}>false</option>
                  </select>
                </div>
                <div>
                  <label>Venda de subscrição de FII tributar 20%</label>
                  <select {...register("vsub_FII")} defaultValue={userConfig?.vsub_FII}>
                    <option value={1}>true</option>
                    <option value={0}>false</option>
                  </select>
                </div>
                <div>
                  <label>Venda de subscrição de FII como isento</label>
                  <select {...register("vsub_isento")} defaultValue={userConfig?.vsub_isento}>
                    <option value={0}>false</option>
                    <option value={1}>true</option>
                  </select>
                </div>
                <div>
                  <label>Considerar BDR como Ação (isenções) </label>
                  <select {...register("bdr_like_acao")} defaultValue={userConfig?.bdr_like_acao}>
                    <option value={0}>false</option>
                    <option value={1}>true</option>
                  </select>
                </div>
              </div>
            </aside>

            <aside>
              <h2>DARF - Pârametros inicias</h2>
              <div>
                <div>
                  <label>Ano de início dos calculos DARF (ex. 2020)</label>
                  <input {...register("darf_inicio")} type="number" defaultValue={userConfig?.darf_inicio} />
                </div>
                <div>
                  <label>Prejuízo normal até inicio DARF (negativo)</label>
                  <input {...register("tributavel_normal")} type="text" defaultValue={userConfig?.tributavel_normal} />
                </div>
                <div>
                  <label>Prejuízo daytrade até inicio DARF (negativo)</label>
                  <input {...register("tributavel_daytrade")} type="text" defaultValue={userConfig?.tributavel_daytrade} />
                </div>
                <div>
                  <label>Prejuízo FII até inicio da DARF (negativo)</label>
                  <input {...register("tributavel_fii")} type="text" defaultValue={userConfig?.tributavel_fii} />
                </div>
                <div>
                  <label>Saldo de DARF a pagar até inicio DARF (positivo)</label>
                  <input {...register("darf_total")} type="text" defaultValue={userConfig?.darf_total} />
                </div>
              </div>
            </aside>

            <aside>
              <h2>Operações - Configuração de Calculos</h2>
              <div>
                <div>
                  <label>Moeda base de cálculos</label>
                  <input type="text" {...register("moeda_base")} defaultValue={userConfig?.moeda_base} maxLength={3} />
                </div>
                <div>
                  <label>Qtd de dias de liquidação PTAX</label>
                  <input {...register("dia_liq_ptax")} type="number" defaultValue={userConfig?.dia_liq_ptax} />
                </div>

                <div>
                  <label>Cálculo de operações por corretora</label>
                  <select {...register("calc_por_corretora")} defaultValue={userConfig?.calc_por_corretora}>
                    <option value={1}>true</option>
                    <option value={0}>false</option>
                  </select>
                </div>
              </div>
            </aside>
          </section>
          {inputErrors?.text && <p className={inputErrors.className}><strong>Erro:</strong> {inputErrors.text}</p>}
          <button type="submit">{loader ? 'Atualizando...' : 'Salvar configurações'}</button>
        </form>
      </Content>
    </Container>
  );
}