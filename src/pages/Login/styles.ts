import styled from 'styled-components';
import backgroundLogin from '../../assets/images/background-login.jpeg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 460px;

  margin: 0 auto;
  padding: 6rem;

  div {
    width: 100%;
    margin: 2rem auto 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;

    > img {
      max-width: 200px;
    }

    h2 {
      font-size: 2.2rem;
      margin: 4rem 0 2rem;
    }

    span {
      font-size: 1.6rem;
      margin-bottom: 1.2rem;
    }
  }
`;

export const GoogleButton = styled.a`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  padding: 8px;
  background: #ea4335;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  cursor: pointer;
  border: 0;
  transition: all 0.2s;

  img {
    margin-right: 8px;
  }

  &:hover {
    filter: brightness(0.9);
  }
`;

export const Background = styled.img`
  flex: 1;
  background: url(${backgroundLogin}) no-repeat center;
  background-size:cover;
`;