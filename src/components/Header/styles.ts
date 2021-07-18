import styled, { css } from 'styled-components';

export const Container = styled.header`
  width: 100%;
  background: #222;
  padding: 12px 16px;
`;

type ContentProps = {
  dropdown: boolean;
}

export const Content = styled.header<ContentProps>`
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  > a img {
    max-width: 100px;
  }

  div {
    display: flex;
    align-items: center;
    gap: 16px;
    position: relative;

    &:hover {
      cursor: pointer;
    }
    .dropdown-menu {
      display: none;
      position: absolute;
      background-color: var(--full-white);
      min-width: 160px;
      top: 36px;
      left: 0;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
      border-radius: 8px;

      button {
        background: none;
      }
      a, button {
        color: var(--font-cyan-blue);
        padding: 12px 16px;
        font-size: 1.6rem;
        width: 100%;
        text-align: left;
        text-decoration: none;
        display: block;
        border-radius: 8px;
        &:hover {
          background-color: var(--semi-white);
        }
      }
    }

    ${props => props.dropdown && css`
      .dropdown-menu {
        display: block;
      }
    `}

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    span {
      color: #f4f4f4;
      font-size: 1.6rem;

      img {
        width: 24px;
        height: 24px;
      }
    }
  }
`;