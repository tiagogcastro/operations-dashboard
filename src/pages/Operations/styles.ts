import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto 64px;

`;

export const Content = styled.div`
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
  padding: 0 0 128px;
  
  > h1 {
    font-size: 3.2rem;
  }

  > p {
    color: red;
    font-size: 1.6rem;
    text-align: right;
    margin: 1rem 0;
  }

  div {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    align-items: center;


    > button {
      font-size: 1.6rem;
      background: var(--semi-blue);
      color: var(--semi-white);
      border-radius: 8px;
      padding: 8px 14px;
      margin: 2rem 0 1rem;
      transition: filter 0.2s;

      &:hover {
        filter: brightness(90%);
      }
    }

    button.delete {
      background: var(--tomato);
    }

  }
`;

export const Section = styled.section`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-x: scroll;
  flex-direction: column;

`;

export const NotOperation = styled.section`
  display: flex;
  width: 100%;
  max-width: 1260px;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 48px;
  margin-top: 72px;

  img {
    max-width: 500px;
    width: 90%;
  }
  > div {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    h2 {
      font-size: 3rem;
      max-width: 90%;
      margin-bottom: 1.6rem;
    }
    
    h3 {
      font-size: 2rem;
      max-width: 90%;
    }
  }
`;

export const Table = styled.table`
  margin: 1.6rem auto 0;
  width: 80%;
  max-width: 1260px;
  padding: 12px 24px;

  thead {
    font-size: 3.2rem;
    tr {
      background-color: #009879;
      color: #ffffff;
      text-align: left;

      td {
        padding: 12px;
      }
    }
  }

  td {
    border-right: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;

    &:nth-child(2) {
      width: 50%;
    }

    p {
      max-width: 50%;
    }
  }

  tbody {
    font-size: 3.2rem;

    tr.selectedToDelete {
      border: 1px solid red;
    }
    tr {
      button {
        color: var(--semi-white);
        padding: 12px;
      }

      button.buttonSave {
        background: green;
      }
      button.buttonEdit {
        background: var(--semi-blue);
      }
      button.buttonDelete {
        background: var(--tomato);
      }

      td {
        padding: 8px 12px;

        input {
          font-size: 1.2rem;
          padding: 12px;
        }
      }
    }
  }
`;