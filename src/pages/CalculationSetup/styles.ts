import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Content = styled.div`
  max-width: 700px;
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
    margin: 0 auto 64px;

    section {
      margin: 0 auto;
      width: 100%;
      display: grid;
      gap: 24px;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    div {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;
      width: 100%;

      label {
        width: 100%;
        font-size: 16px;
        margin-bottom: 1rem;
      }

      input, select {
        font-size: 16px;
        width: 100%;
        border-radius: 8px;
        padding: 16px;
        border: 1px solid #999;
      }

      option {
        font-size: 16px;
        padding: 16px;
      }
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