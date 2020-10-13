import styled, { css } from 'styled-components';

const GridLayout = styled.div<{ debug?: boolean }>`
  display: grid;
  grid-template-areas:
    'menu sidebar main'
    'menu sidebar sub';
  grid-template-rows: min-content 1fr;
  grid-template-columns: max-content max-content 1fr;
  width: 100%;
  height: 100%;
  #menu {
    grid-area: menu;
    overflow: hidden;
  }
  #explorer {
    grid-area: sidebar;
    overflow: auto;
    resize: horizontal;

    min-width: 120px;
    max-width: 50vw;
  }
  #tabs {
    grid-area: main;
    overflow: auto;
    resize: vertical;
    height: 50vh;
    min-height: 30vh;
    max-height: 90vh;
  }
  #footer {
    grid-area: sub;
  }
  ${(p) =>
    p.debug &&
    css`
      > * {
        border: 1px solid yellow;
      }
    `}
`;
export default GridLayout;
