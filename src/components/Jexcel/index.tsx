import { useCallback, useEffect, useRef, useState } from 'react';
import jspreadsheet from 'jspreadsheet-ce';

import { api } from '../../services/api';

import {Events} from '../../config/Events';

import "../../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css";
import {
  Container,
  Content,
  JexcelTable
} from './styles';
import { useNewOperation } from '../../contexts/NewOperationsContext';

export type NewOperation = {
  ativo: string
  corretora: string
  date: Date;
  evento: string;
  id_op: number;
  irrf: number;
  moeda: string;
  observacao: string;
  preco: number;
  qtd: number;
  taxas: string;
}

export type JexcelHandles = {
  newOperations: NewOperation[]
}

export function Jexcel() {
  const jRef: any = useRef(null);
  const {setNewOperations} = useNewOperation();

  const [newOperationLoader, setNewOperationLoader] = useState(false);
  
  const [error, setError] = useState('');
  
  const eventos = Events.planilha.operacoes;
  const corretoras = (Object.keys(Events.corretoras)).toString().toUpperCase().split(",");
  const moedas = Events.moedas;

  const options: any = {
    minDimensions: [1, 1],
    columns: [
      { title: "ativo", type: "text", width: 150 },
      { title: "date", type: "calendar", width: 120 },
      { title: "evento", type: "dropdown", width: 120, source: eventos },
      { title: "qtd", type: "text", width: 120 },
      { title: "preco", type: "text", width: 120 },
      { title: "taxas", type: "text", width: 120 },
      { title: "corretora", type: "dropdown", width: 100, source: corretoras },
      { title: "irrf", type: "numeric", width: 120 },
      { title: "moeda", type: "dropdown", width: 120, source: moedas },
      { title: "observacao", type: "text", width: 120 }
    ],
    columnSorting: true,
    // pagination: 10,
    search: false,
    filters: false,
    allowComments: false
  };

  useEffect(() => {
    if (!jRef.current.jspreadsheet) {
      jspreadsheet(jRef.current, options)
    }
  }, [options]);

  const handleAddNewRow = () => {
    jRef.current.jexcel.insertRow();
  };

  const handleSendNewOperations = useCallback(async (operations: NewOperation[], xml_tr:any) => {
    setNewOperationLoader(true)

    api.post('/operacoes', operations).then(response => {
      setNewOperations(response.data);
      setNewOperationLoader(false);
      
      setError('');
      
      jRef.current.jexcel.insertRow(1);
      jRef.current.jexcel.deleteRow(0, xml_tr.length -2);
      return;
    }).catch((error) => {
      setNewOperationLoader(false);
      
      if(error.response?.status === 400) {
        if(error.response.data.error.op_normal[0][0]) {
          setError(error.response.data.error.op_normal[0][0]); 
          return;
        } else {
          console.log(error.response.data.error.op_normal[0][1])
          setError(error.response.data.error.op_normal[0][1]); 
          return;
        }
      } else if(error.response?.status === 402) {
        setError(error.response.data.error[0][1]);
        return;
      } else {
        setError('Erro desconhecido.');
        return;
      }
    });

  }, [setNewOperations]);
  
  const handleInsertNewOperations = async () => {
    var table = jRef.current.jexcel.table;

    var xml_tr = table.getElementsByTagName("tr");
    var result: NewOperation[] = [];
    var header: any[] = [];

    for (var i = 0; i < xml_tr.length; i++) {
      var xml_td = xml_tr[i].getElementsByTagName("td");
      var row: any = {};

      for (var j = 0; j < xml_td.length; j++) {
        let value = xml_td[j].childNodes[0];
        if (value) {
          value = (value.nodeValue).replace('.', '').replace(',', '.');
          result = result.map(r => {
            return {
              ...r,
              irrf: Number(r.irrf),
            };
          });
          if (value.indexOf("/") > 0) {
            value = value.slice(0, 10).split("/").reverse().join("-");
          } else {
            value = parseFloat(value) || value
          }
        } else {
          value = "";
        }

        if (i === 0) {
          if (j === 0) {
            value = "id_op";
          }
          header.push(value);
        } else {
          row[header[j]] = value;
        }
      }

      if (i === 0) {
        continue;
      }

      result.push(row);
    }
    if(result.length === 0) {
      return;
    }

    await handleSendNewOperations(result, xml_tr);

  }

  return (
    <Container>
    <Content>
      <h1>Criar Operações</h1>
      <aside>
        <button type="button" onClick={handleAddNewRow}> Adicionar linha </button>
        <button type="button" disabled={newOperationLoader} onClick={handleInsertNewOperations}> {newOperationLoader ? 'Carregando...': 'Inserir Operações'} </button>
      </aside>
      {error && <p>{error}</p>}
    </Content>
    <JexcelTable ref={jRef} id="jspreadsheet" />
  </Container>
  );
}