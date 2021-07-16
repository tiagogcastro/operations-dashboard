import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
  height: 100%;

  section {
    margin: 64px auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    > div {
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
    }

    #jspreadsheet {
      .jdropdown-container {
        background: var(--semi-blue);
        font-size: 3rem;

        .jdropdown-content {
          z-index: 10;
          border-radius: 0 0 8px 8px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          .jdropdown-item {
            font-size: 2.6rem;
            padding: 10px 0;
            cursor: pointer;

            transition: background 0.2s;

            &:hover {
              background: #c4c4c4;
            }
          }
        }

      }
      table {
        thead {
          tr {
            font-size: 3rem;
          }
        }
        
        tbody {
          tr {
            font-size: 3rem;
            td {
              z-index: 5;
              .jcalendar.jcalendar-container.jcalendar-focus {
                position: absolute;
                background: var(--semi-white);
                border: 1px solid var(--font-cyan-blue)
              }
            }

            td.editor {
              font-size: 3rem;
            }
          }
        }
      }
    }
  }
`;