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

      div {
        display: flex;
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
  overflow-x: scroll;
  flex-direction: column;
  border-left: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
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
  margin: 0 auto;
  width: 80%;
  max-width: 960px;
  display: table;
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

    .none {
      display: none;
    }

    span {
      padding: 2px 4px;
      display: table-cell;
      border-right: 1px solid #dddddd;
      border-bottom: 1px solid #dddddd;

      input {
        width: 120px;
        padding: 4px 12px;
      }

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        .buttonEdit {
          background: var(--semi-blue);
        }
        button.buttonDelete {
          background: var(--tomato);
        }

        button, p {
          color: var(--semi-white);
          padding: 12px;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
        }

        .button {
          background: none;
          padding: 0;
          margin: 0;
          img {
            width: 18px;

          }
        }
      }
    }
  }
`;