import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
`;
export const Sidebar = styled.div`
  width: 25%;
`;
export const Main = styled.div`
  display: flex;
  height: 100%;
  > #cy {
    height: 400px;
    flex: 1;
    border: 1px solid black;
  }
`;
