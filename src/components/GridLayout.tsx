import styled from 'styled-components';

const GridLayout = styled.div`
  display: grid;
  border: 1px solid red;
  grid-template-areas:
    'menu sidebar main'
    'menu sidebar sub';
  grid-template-rows: min-content 1fr;
  grid-template-columns: max-content max-content 1fr;
  width: 100%;
  height: 100%;
  #menu {
    border: 1px solid limegreen;
    grid-area: menu;
    overflow: hidden;
  }
  #explorer {
    border: 1px solid blue;
    grid-area: sidebar;
    overflow: auto;
    resize: horizontal;

    min-width: 120px;
    max-width: 50vw;
  }
  #tabs {
    border: 1px solid yellow;
    grid-area: main;
    overflow: auto;
    resize: vertical;

    min-height: 30vh;
    max-height: 90vh;
  }
  #footer {
    border: 1px solid grey;
    grid-area: sub;
  }
`;
export default GridLayout;
