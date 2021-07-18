import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  background: #111;
  padding: 16px;
`;

export const Content = styled.header`
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;

  a {
    font-size: 1.6rem;
    transition: color 0.2s;
  
    &:hover {
      color: #1690F4;
    }
  }  
`;