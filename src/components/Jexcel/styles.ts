import styled from 'styled-components';

export const Container = styled.section`
  margin: 16px auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Content = styled.section`
  width: 100%;

  > h1 {
    font-size: 3.2rem;
  }

  > p {
    color: red;
    font-size: 1.6rem;
    text-align: right;
    margin: 1rem 0;
  }

  aside {
    display: flex;
    justify-content: space-between;
    width: 100%;
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
  }
`;

export const JexcelTable = styled.div`

  tr {
    td {
      font-size: 2rem;
    }
  }
  
  tbody {
    div {
      display: block;
      gap: 0;
      font-size: 1.2rem;
    }
    tr {
      font-size: 3rem;
      
    }
  }
`;