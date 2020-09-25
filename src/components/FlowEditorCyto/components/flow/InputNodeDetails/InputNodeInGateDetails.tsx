import React from 'react';
import styled from 'styled-components';
import { NodeSingular } from 'cytoscape';

const Wrapper = styled.div``;

type InputNodeInGateDetailsProps = {
  node: NodeSingular;
};

const InputNodeInGateDetails: React.FC<InputNodeInGateDetailsProps> = (
  props
) => {
  const { node } = props;

  return <Wrapper>{node.id()}</Wrapper>;
};

export default InputNodeInGateDetails;
