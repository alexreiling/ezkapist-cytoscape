import React from 'react';
import styled from 'styled-components';
import { Core } from 'cytoscape';
import Button from '../../common/Button';

const Wrapper = styled.div`
  display: flex;
`;

type ToolbarProps = {
  cy: Core;
};

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { cy, ...rest } = props;
  const createNode = () => {};
  return (
    <Wrapper {...rest}>
      <Button onClick={createNode}>Create Node</Button>
    </Wrapper>
  );
};

export default Toolbar;
