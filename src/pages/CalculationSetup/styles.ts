import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Content = styled.div`
  max-width: 900px;
  margin: 64px auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > h1 {
    font-size: 2.4rem;
    margin-bottom: 3.2rem;
    width: 100%;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin: 32px auto 64px;

    section {
      margin: 0 auto;
      width: 100%;
      display: grid;
      gap: 72px;
      grid-template-columns: 1fr 1fr;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;

      aside {
        h2 {
          font-size: 1.6rem;
          margin-bottom: 1.4rem;
          width: 100%;
        }
        > div {

          div {
            display: grid;
            grid-template-columns: 200px 1fr;
            /* display: flex; */
            align-items: center;
            justify-content: center;
            width: 100%;
            gap: 16px;
            margin-bottom: 1.6rem;

            label {
              width: 100%;
              font-size: 16px;
            }

            input, select {
              font-size: 16px;
              width: 80%;
              border-radius: 8px;
              padding: 12px;
              border: 1px solid #999;
            }

            option {
              font-size: 16px;
              padding: 16px;
            }
          }
        }
      }
    }

    .inputError {
      strong {
        font-size: 16px;
      }
      color: red;
      font-size: 14px;
    }

    > button {
      margin-top: 3rem;
      border-radius: 8px;
      background: var(--semi-blue);
      font-size: 1.6rem;
      padding: 16px;
      max-width: 230px;
      width: 100%;
      transition: filter 0.2s;
      
      &:hover {
        filter: brightness(90%)
      }
    }
  }
`;