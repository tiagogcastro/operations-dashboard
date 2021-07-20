import styled from 'styled-components';

export const Container = styled.div`

`;

export const Content = styled.div`
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 32px 128px;
  
  > p {
    color: red;
    font-size: 1.6rem;
    text-align: right;
    margin: 1rem 0;
  }

  > div {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
    width: 100%;
    margin: 1rem 0;

    > h1 {
      font-size: 3.2rem;
    }
  }
`;

export const Section = styled.section`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-x: auto;
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

export const Table = styled.div`
  width: 100%;
  display: table;
  border: 1px solid #dddddd;
  border-bottom: none;
  border-collapse: separate;

  .thead {
    display: table-header-group;

    .tr {
      background-color: #009879;
      color: #ffffff;
      text-align: left;

      span {
        padding: 4px 8px;
      }
    }
  }
  .tbody {
    display: table-row-group;
  }

  .tr {
    display: table-row;

    span, input {
      font-size: 1.2rem;
      text-align: center;
    }

    span {
      padding: 6px 4px;
      display: table-cell;
      border-right: 1px solid #dddddd;
      border-bottom: 1px solid #dddddd;
      white-space: nowrap;
    }
  }
`;