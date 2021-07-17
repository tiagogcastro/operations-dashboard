import { useCallback, useEffect, useState } from 'react';

import { useNewOperation } from '../../contexts/NewOperationsContext';
import { useAuth } from '../../contexts/AuthContext';

import { api } from '../../services/api';

import { Header } from '../../components/Header';
import { SubHeader } from '../../components/SubHeader';
import { Jexcel } from '../../components/Jexcel';

import spreadsheetImage from '../../assets/images/spreadsheet.svg';

import {
  Container,
  Content,
  Section,
  Table,
  NotOperation
} from './styles';
import { parse } from 'path';

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
  const {newOperations} = useNewOperation();

  const [operations, setOperations] = useState<Operation[]>([]);

  const [deleteAllOperationsLoader, setDeleteAllOperationsLoader] = useState(false);
  const [recalculateOperationsLoader, setRecalculateOperationsLoader] = useState(false);
  
  const [operationsError, setOperationsError] = useState('');
  const [classNameText, setclassNameText] = useState('');

  const [selectToDeleteOperation, setSelectToDeleteOperation] = useState(['']);
  const [selectedToEdit, setselectedToEdit] = useState(['']);

  const handleDeleteAllOperations = useCallback(() => {
    const confirmation = window.confirm('Tem certeza que deseja deletar todas as operações?');
    if(confirmation) {
      api.delete('/operacoes/excluir/todas').then(response => {
        console.log(response.data);
        setOperations(response.data);
      }).catch((error)=> {
        setOperationsError(error.response.data.error);
      });
    }
  }, []);

  const handleRecalculateOperations = useCallback(() => {
    setRecalculateOperationsLoader(true);

    api.put('/operacoes/recalcular').then(response => {
      setRecalculateOperationsLoader(false);
    }).catch((error) => {
      setOperationsError(error.response.data.error);
    });
  }, []);

  const handleEditOperation = useCallback((operation_id: string) => {
    if(selectedToEdit.includes(operation_id)) {
      const index = selectedToEdit.indexOf(operation_id);
      selectedToEdit.splice(index, index);
      setselectedToEdit([...selectedToEdit]);
      console.log(selectedToEdit);
      return;
    }
    setselectedToEdit([...selectedToEdit, operation_id]);
  }, [selectedToEdit]);

  // const handleSelectToDeleteOperation = useCallback((operation_id: string) => {
  //   if(selectToDeleteOperation.includes(operation_id)) {
  //     const index = selectToDeleteOperation.indexOf(operation_id);
  //     selectToDeleteOperation.splice(index, index);
  //     setSelectToDeleteOperation([...selectToDeleteOperation]);
  //     console.log(selectToDeleteOperation);
  //     return;
  //   }
  //   setSelectToDeleteOperation([...selectToDeleteOperation, operation_id]);
  // }, [selectToDeleteOperation]);

  const handleDeleteOperation = useCallback((operation_id: string) => {
    const data = {
      id: operation_id
    };
    api.delete('/operacoes/excluir', ).then(response => {
    });
  }, []);

  const handleSaveOperation = useCallback(async (operation_id: string, operation: Operation) => {
    const data = {
      date: operation.date,
      evento: operation.evento,
      qtd: operation.qtd,
      preco: operation.preco,
      taxas: operation.taxas,
      moeda: operation.moeda,
      irrf: operation.irrf,
      observacao: operation.observacao,
    };
    await api.put(`/operacoes/atualizar/${operation_id}`, data).then(response => {
      const index = selectedToEdit.indexOf(operation_id);
      selectedToEdit.splice(index, index);
      setselectedToEdit([...selectedToEdit]);
    }).catch((error) => {
      setOperationsError(error.response.data.error);
    });
    
  }, []);

  useEffect(() => {
    api.get('/operacoes').then(response => {
      setOperations(response.data.result);
    }).catch((error) => {
      setOperationsError(error.response.data.error);
    });
  }, [newOperations, handleDeleteAllOperations, handleDeleteOperation, handleRecalculateOperations]);

  return (
    <Container>
      <Header 
        nome={user?.nome}
        imagem={user?.imagem}
      />
      <SubHeader />
      <Content>
        <Jexcel/>

        <h1>Minhas Operações</h1>
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
          {operationsError && <p>{operationsError}</p>}
          <Section>
            <Table>
              <thead>
                <tr>
                  <td>ativo</td>
                  <td>date</td>
                  <td>evento</td>
                  <td>qtd</td>
                  <td>preco</td>
                  <td>taxas</td>
                  <td>corretora</td>
                  <td>irrf</td>
                  <td>moeda</td>
                  <td>observacao</td>
                  <td>daytrade</td>
                  <td>classe</td>
                  <td>fluxo_caixa</td>
                  <td>volume</td>
                  <td>lucro</td>
                  <td>qtd_atual</td>
                  <td>pm_atual</td>
                  <td>qtd_ant</td>
                  <td>pm_ant</td>
                  <td>ptax</td>
                  <td>pm_fx</td>
                  <td>pm_ptax</td>
                  <td></td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {operations.map((operation) => (
                  <tr key={operation.id}>
                    <td>{operation.ativo}</td>
                    <td>
                      <input 
                        type="date" 
                        defaultValue={operation.date.toString()} 
                        disabled={!selectedToEdit.includes(operation.id)}
                        />
                    </td>
                    <td> 
                      <input 
                        type="text" 
                        disabled={!selectedToEdit.includes(operation.id)} 
                        defaultValue={operation.evento}
                        placeholder="Evento"
                        />
                    </td>
                    <td> 
                      <input 
                        type="number" 
                        disabled={!selectedToEdit.includes(operation.id)} 
                        defaultValue={operation.qtd}
                        placeholder="Qtd"
                      />
                    </td>
                    <td> 
                      <input 
                        type="number" 
                        disabled={!selectedToEdit.includes(operation.id)} 
                        defaultValue={operation.preco}
                        placeholder="Preço"
                      />
                    </td>
                    <td> 
                      <input 
                        type="number" 
                        disabled={!selectedToEdit.includes(operation.id)} 
                        defaultValue={operation.taxas}
                        placeholder="Taxas"
                      />
                    </td>
                    <td>{operation.corretora}</td>
                    <td> 
                      <input 
                        type="number" 
                        disabled={!selectedToEdit.includes(operation.id)} 
                        defaultValue={operation.irrf}
                        placeholder="irrf"
                      />
                    </td>
                    <td> 
                      <input 
                        type="text" 
                        disabled={!selectedToEdit.includes(operation.id)} 
                        defaultValue={operation.moeda}
                        placeholder="Moeda"
                      />
                    </td>
                    <td> 
                      <input 
                        type="text" 
                        disabled={!selectedToEdit.includes(operation.id)} 
                        defaultValue={operation.observacao}
                      />
                    </td>
                    <td>{operation.daytrade ? 'True' : 'False'}</td>
                    <td>{operation.classe}</td>
                    <td>{operation.fluxo_caixa.toFixed(4)}</td>
                    <td>{operation.volume.toFixed(4)}</td>
                    <td>{operation.lucro.toFixed(4)}</td>
                    <td>{operation.qtd_atual.toFixed(4)}</td>
                    <td>{operation.pm_atual.toFixed(4)}</td>
                    <td>{operation.qtd_ant.toFixed(4)}</td>
                    <td>{operation.pm_ant.toFixed(4)}</td>
                    <td>{operation.ptax.toFixed(4)}</td>
                    <td>{operation.pm_fx.toFixed(4)}</td>
                    <td>{operation.pm_ptax.toFixed(4)}</td>
                    <td>
                      {selectedToEdit.includes(operation.id) ? (

                        <button 
                        type="button" 
                        className="buttonSave" 
                        onClick={() => handleSaveOperation(operation.id, operation)}>
                          Salvar
                      </button>
                      ) : (
                      <button 
                        type="button" 
                        className="buttonEdit" 
                        onClick={() => handleEditOperation(operation.id)}>
                          Editar
                      </button>
                      )}
                    </td>
                    <td>
                      <button
                        type="button" 
                        className="buttonDelete" 
                        onClick={() => handleDeleteOperation(operation.id)}>
                          Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>
        </>
        )}
      </Content>
    </Container>
  );
}
// id
