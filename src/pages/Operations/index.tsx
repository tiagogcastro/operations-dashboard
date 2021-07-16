import react, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import jspreadsheet from 'jspreadsheet-ce';
import "../../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css";
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

import { Header } from '../../components/Header';
import { SubHeader } from '../../components/SubHeader';

import Events from '../../config/Events';

import {
  Container,
  Content
} from './styles';

type Operation = {
  ativo: string
  corretora: string
  date: Date;
  evento: string;
  id_op: number;
  irrf: string;
  moeda: string;
  observacao: string;
  preco: number;
  qtd: number;
  taxas: string;
}

export function Operations() {
  const { user } = useAuth();
  const [newOperations, setNewOperations] = useState<Operation[]>();
  const [loader, setLoader] = useState(false);
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
      { title: "irrf", type: "text", width: 120 },
      { title: "moeda", type: "dropdown", width: 120, source: moedas },
      { title: "observacao", type: "text", width: 120 }
    ],
    columnSorting: true,
    // pagination: 10,
    search: false,
    filters: false,
    allowComments: false
  };

  const jRef: any = useRef(null);

  useEffect(() => {
    if (!jRef.current.jspreadsheet) {
      jspreadsheet(jRef.current, options)
    }
  }, [options]);

  const addRow = () => {
    jRef.current.jexcel.insertRow();
  };

  const handleSendNewOperations = useCallback(async (operations: Operation[]) => {
    console.log(operations);
    const response = await api.post('/operacoes', operations);
    console.log(response.data);
  }, []);
  
  const insert = async () => {
    var table = jRef.current.jexcel.table;

    var xml_tr = table.getElementsByTagName("tr");
    var result: Operation[] = [];
    var header: any[] = [];

    for (var i = 0; i < xml_tr.length; i++) {
      var xml_td = xml_tr[i].getElementsByTagName("td");
      var row: any = {};

      for (var j = 0; j < xml_td.length; j++) {
        let value = xml_td[j].childNodes[0];
        if (value) {
          value = (value.nodeValue).replace('.', '').replace(',', '.');
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
          if(!value) {
            setError('Preencha todos os campos.');
            return;
          } 
        }
      }

      if (i === 0) {
        continue;
      }
      if (row.ativo) {
        result.push(row);
      }
    }

    if(result.length === 0) {
      return;
    }
    setNewOperations(result);
    console.log(result);
    setLoader(true)
    const response = await api.post('/operacoes', result);
    setLoader(false);
    setError('');
    console.log(response.data);
  }

  return (
    <Container>
      <Header 
        nome={user?.nome}
        imagem={user?.imagem}
      />
      <SubHeader />
      <Content>
        <section>
          <div>
            <h1>Operações</h1>
            <aside>
              <button  type="button" onClick={addRow}> Adicionar linha </button>
              <button type="button" disabled={loader} onClick={insert}> {loader ? 'Carregando...': 'Inserir Operações'} </button>
            </aside>
            {error && <p>{error}</p>}
          </div>
          <div ref={jRef} id="jspreadsheet" />
        </section>
      </Content>
    </Container>
  );
}