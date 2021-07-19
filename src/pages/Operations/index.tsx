import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useNewOperation } from '../../contexts/NewOperationsContext';
import { useAuth } from '../../contexts/AuthContext';

import { api } from '../../services/api';

import { Header } from '../../components/Header';
import { SubHeader } from '../../components/SubHeader';
import { Jexcel } from '../../components/Jexcel';

import spreadsheetImage from '../../assets/images/spreadsheet.svg';
import checkImage from '../../assets/images/check.png';
import closeImage from '../../assets/images/close.png';

import {
  Container,
  Content,
  Section,
  Table,
  NotOperation,
} from './styles';
import { Form } from '@unform/web';
import { Input } from '../../components/Input';

type Operation = {
  id: string;
  ativo: string;
  date: Date;
  evento: string;
  qtd: number;
  preco: number;
  taxas: number;
  corretora: string;
  moeda: string;
  irrf: number;
  observacao: string;
  daytrade: false;
  classe: string
  fluxo_caixa: number;
  volume: number;
  lucro: number;
  qtd_atual: number;
  pm_atual: number;
  qtd_ant: number;
  pm_ant: number;
  ptax: number;
  pm_fx: number;
  pm_ptax: number;
}

export function Operations() {
  const { user } = useAuth();
  const formRef = useRef(null)

  const {newOperations} = useNewOperation();

  const [operations, setOperations] = useState<Operation[]>([]);

  const [deleteAllOperationsLoader, setDeleteAllOperationsLoader] = useState(false);
  const [recalculateOperationsLoader, setRecalculateOperationsLoader] = useState(false);
  
  const [operationsError, setOperationsError] = useState('');

  const [selectedToEdit, setselectedToEdit] = useState(['']);

  const handleDeleteAllOperations = useCallback(() => {
    setDeleteAllOperationsLoader(true);
    const confirmation = window.confirm('Tem certeza que deseja deletar todas as operações?');
    if(confirmation) {
      api.delete('/operacoes/excluir/todas').then(response => {
        setDeleteAllOperationsLoader(false)
      }).catch((error)=> {
        setDeleteAllOperationsLoader(false)
        // setOperationsError(error.response.data.error);
      });
    }
  }, []);

  const handleRecalculateOperations = useCallback(() => {
    setRecalculateOperationsLoader(true);

    api.put('/operacoes/recalcular').then(response => {
      setRecalculateOperationsLoader(false);
      api.get('/operacoes').then(response => {
        setOperations(response.data.result);
      }).catch((error) => {
        // setOperationsError(error.response.data.error);
      });
    }).catch((error) => {
      // setOperationsError(error.response.data.error);
    });
  }, []);

  const handleEditOperation = useCallback((operation_id: string) => {
    if(selectedToEdit.includes(operation_id)) {
      const index = selectedToEdit.indexOf(operation_id);

      selectedToEdit.splice(index, index);

      setselectedToEdit([...selectedToEdit]);
      return;
    }
    setselectedToEdit([...selectedToEdit, operation_id]);
  }, [selectedToEdit]);

  const handleCloseOperation = useCallback((operation_id: string) => {
    const index = selectedToEdit.indexOf(operation_id);

    selectedToEdit.splice(index, index);

    setselectedToEdit([...selectedToEdit]);
    
  }, [selectedToEdit]);

  const handleDeleteOperation = useCallback((operation_id: string) => {
    const confirmation = window.confirm('Tem certeza que deseja deletar esta operação?');

    if(confirmation) {
      api.delete(`/operacoes/excluir/${operation_id}` ).then(response => {
        api.get('/operacoes').then(response => {
          setOperations(response.data.result);
        }).catch((error) => {
          // setOperationsError(error.response.data.error);
        });
      }).catch((error) => {
        // setOperationsError(error.error)
      });
    }
  }, []);

  const handleSaveOperation = useCallback((data: Operation): any => {
    const dataParsed = {
      date: data.date,
      evento: data.evento,
      irrf: Number(data.irrf),
      moeda: data.moeda,
      preco: Number(data.preco),
      qtd: Number(data.qtd),
      taxas: Number(data.taxas),
      observacao: data.observacao,
    };

    api.put(`/operacoes/atualizar/${data.id}`, dataParsed).then(response => {

      const index = selectedToEdit.indexOf(data.id);

      selectedToEdit.splice(index, index);

      setselectedToEdit([...selectedToEdit]);

      api.get('/operacoes').then(response => {
        setOperations(response.data.result);
      }).catch((error) => {
        // setOperationsError(error.response.data.error);
      });
    }).catch((error) => {
      // setOperationsError(error.response.data.error);
    });
  }, [selectedToEdit]);

  useEffect(() => {
    api.get('/operacoes').then(response => {
      setOperations(response.data.result);
    }).catch((error) => {
      // setOperationsError(error.response.data.error);
    });
  }, [newOperations, handleSaveOperation]);

  const parseToLocaleString = useCallback((operation_field: string | number) => {
    return operation_field ? operation_field.toLocaleString('Pt-br', {maximumFractionDigits: 4}) : 0;
  }, []);

  const operationsUpdated = useMemo(() => {
    return operations.map(operation => {
      return {
        ...operation,
        fluxo_caixa: parseToLocaleString(operation.fluxo_caixa),
        volume: parseToLocaleString(operation.volume),
        lucro: parseToLocaleString(operation.lucro),
        qtd_atual: parseToLocaleString(operation.qtd_atual),
        pm_atual: parseToLocaleString(operation.pm_atual),
        qtd_ant: parseToLocaleString(operation.qtd_ant),
        pm_ant: parseToLocaleString(operation.pm_ant),
        ptax: parseToLocaleString(operation.ptax),
        pm_fx: parseToLocaleString(operation.pm_fx),
        pm_ptax: parseToLocaleString(operation.pm_ptax),
      }
    })
  }, [operations, parseToLocaleString]);

  return (
    <Container>
      <Header 
        nome={user?.nome}
        imagem={user?.imagem}
      />
      <SubHeader />
      <Content>
        <Jexcel/>

        {!operations.length ? (
          <NotOperation>
            <img src={spreadsheetImage} alt="Imagem de spreadsheet" />
            <div>
              <h2>Me parece que você não tem nenhuma operação</h2>
              <h3>Crie algumas agora mesmo!</h3>
            </div>
          </NotOperation>
        ) : (
        <>
          <div>
            <h1>Minhas Operações</h1>
            <div>
              <button 
                type="button" 
                disabled={recalculateOperationsLoader} 
                onClick={handleRecalculateOperations}> 
                {recalculateOperationsLoader ? 'Carregando...': 'Recalcular'} 
              </button>
              <button  
                className="delete"
                type="button" 
                disabled={deleteAllOperationsLoader} 
                onClick={handleDeleteAllOperations}> 
                {deleteAllOperationsLoader ? 'Carregando...': 'Excluir todas'} 
              </button>
            </div>
          </div>
          {operationsError && <p>{operationsError}</p>}
          <Section>
              <Table>
                <div className="thead"> {/* thead*/}
                  <div className="tr"> {/* tr*/}
                    <span>ativo</span>
                    <span>date</span>
                    <span>evento</span>
                    <span>qtd</span>
                    <span>preco</span>
                    <span>taxas</span>
                    <span>corretora</span>
                    <span>irrf</span>
                    <span>moeda</span>
                    <span>observacao</span>
                    <span>daytrade</span>
                    <span>classe</span>
                    <span>fluxo_caixa</span>
                    <span>volume</span>
                    <span>lucro</span>
                    <span>qtd_atual</span>
                    <span>pm_atual</span>
                    <span>qtd_ant</span>
                    <span>pm_ant</span>
                    <span>ptax</span>
                    <span>pm_fx</span>
                    <span>pm_ptax</span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="tbody"> {/* tbody */}
                  {operationsUpdated.map((operation) => (
                    <Form ref={formRef} onSubmit={handleSaveOperation} className="tr" key={operation.id}> {/* tr*/}
                      <span>{operation.ativo}</span>
                      <span>
                        <Input 
                          type="date" 
                          defaultValue={operation.date.toString()} 
                          disabled={!selectedToEdit.includes(operation.id)}
                          name="date"
                          />
                      </span>
                      <span> 
                        <Input 
                          type="text" 
                          disabled={!selectedToEdit.includes(operation.id)} 
                          defaultValue={operation.evento}
                          placeholder="Evento"
                          name="evento"
                          />
                      </span>
                      <span> 
                        <Input 
                          type="text" 
                          disabled={!selectedToEdit.includes(operation.id)} 
                          defaultValue={operation.qtd ? operation.qtd : 0}
                          placeholder="0"
                          name="qtd"
                        />
                      </span>
                      <span> 
                        <Input 
                          type="text" 
                          disabled={!selectedToEdit.includes(operation.id)} 
                          defaultValue={operation.preco ? operation.preco : 0}
                          placeholder="0"
                          name="preco"
                        />
                      </span>
                      <span> 
                        <Input 
                          type="text" 
                          disabled={!selectedToEdit.includes(operation.id)} 
                          defaultValue={operation.taxas ? operation.taxas : 0}
                          placeholder="0"
                          name="taxas"
                        />
                      </span>
                      <span>{operation.corretora}</span>
                      <span> 
                        <Input 
                          type="text" 
                          disabled={!selectedToEdit.includes(operation.id)} 
                          defaultValue={operation.irrf ? operation.irrf : 0}
                          placeholder="0"
                          name="irrf"
                        />
                      </span>
                      <span> 
                        <Input 
                          type="text" 
                          disabled={!selectedToEdit.includes(operation.id)} 
                          defaultValue={operation.moeda ? operation.moeda : 'BRL'}
                          placeholder="BRL"
                          maxLength={3}
                          name="moeda"
                        />
                      </span>
                      <span> 
                        <Input 
                          type="text" 
                          disabled={!selectedToEdit.includes(operation.id)} 
                          defaultValue={operation.observacao}
                          name="observacao"
                        />
                      </span>
                      <span>{operation.daytrade ? 'True' : 'False'}</span>
                      <span>{operation.classe}</span>
                      <span>{operation.fluxo_caixa}</span>
                      <span>{operation.volume}</span>
                      <span>{operation.lucro}</span>
                      <span>{operation.qtd_atual}</span>
                      <span>{operation.pm_atual}</span>
                      <span>{operation.qtd_ant}</span>
                      <span>{operation.pm_ant}</span>
                      <span>{operation.ptax}</span>
                      <span>{operation.pm_fx}</span>
                      <span>{operation.pm_ptax}</span>
                      <span>
                        {selectedToEdit.includes(operation.id) ? (
                        <div>
                          <button 
                            type="submit" 
                            className="button" 
                          >
                            <img src={checkImage} alt="Check" />
                          </button>
                          <button 
                            type="button" 
                            className="button" 
                            onClick={() => handleCloseOperation(operation.id)}>
                              <img src={closeImage} alt="Close" />
                          </button>
                        </div>
                        ) : (
                          <div>
                            <p 
                              className="buttonEdit" 
                              onClick={() => handleEditOperation(operation.id)}>
                                Editar
                            </p>
                          </div>
                        )}
                      </span>
                      <span>
                        <div>
                          <button
                            type="button" 
                            className="buttonDelete" 
                            onClick={() => handleDeleteOperation(operation.id)}>
                              Excluir
                          </button>
                        </div>
                      </span>
                      <Input 
                        type="text"
                        className="none"
                        disabled
                        value={operation.id}
                        name="id" />
                    </Form> 
                  ))}
                </div>
              </Table>
          </Section>
        </>
        )}
      </Content>
    </Container>
  );
}
// id
