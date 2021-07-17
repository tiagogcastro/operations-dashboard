import styled from 'styled-components';

export const Container = styled.section`
  margin: 64px auto;
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

  table {
    font-size: 2rem;
    thead {
      tr {
        font-size: 3rem;
      }
    }
    
    tbody {
      div {
        display: block;
        gap: 0;
      }
      tr {
        font-size: 3rem;
        td {
          .jdropdown {
            .jdropdown-container {
              position: relative;
              .jdropdown-content {
                z-index: 10;
                position: absolute;
                border-radius: 0 0 8px 8px;
                box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                width: 100%;
                
                .jdropdown-item {
                  font-size: 12px;
                  width: 100%;
                  padding: 10px;
                  cursor: pointer;
                  background: var(--semi-blue);
                  color: var(--semi-white);
                  transition: background 0.2s;
                  font-size: 2rem;
                  border-bottom: 1px solid #c4c4c4;

                  &:hover {
                    background: #c4c4c4;
                  }
                }
              }
            }
          }
          z-index: 5;
          .jcalendar.jcalendar-container.jcalendar-focus {
            position: absolute;
            background: var(--semi-white);
            border: 1px solid var(--font-cyan-blue);
          }
        }

        td.editor {
          /* font-size: 3rem; */
        }
      }
    }
  }
`;