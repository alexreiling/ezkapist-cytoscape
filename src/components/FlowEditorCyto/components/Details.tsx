import React, { useState, ReactElement, Component } from 'react';
import styled from 'styled-components';
import { NodeSingular } from 'cytoscape';
import Response from './Response';
import { DATA, SCRATCH } from '../../../Flow/config';
import NodeController, {
  FlowNodeController,
} from '../../../Flow/controllers/NodeController';
import DelayNodeDetails from './flow/DelayNodeDetails';
import OutputNodeDetails from './flow/OutputNodeDetails';
import InputNodeDetails from './flow/InputNodeDetails/index';

const Wrapper = styled.div``;
type DetailsProps = {
  node: NodeSingular;
};

const Details: React.FC<DetailsProps> = (props) => {
  const { node } = props;
  const controller = node.scratch(SCRATCH.controller) as FlowNodeController;
  let view: ReactElement | undefined;
  switch (node.data(DATA._nodeType)) {
    case 'delay':
      view = <DelayNodeDetails node={node} />;
      break;
    case 'output':
      view = <OutputNodeDetails node={node} />;
      break;
    case 'input':
      view = <InputNodeDetails node={node} />;
      break;
    case 'input-in-gate':
      view = <InputNodeDetails node={node} />;
      break;
    case 'input-out-gate':
      view = <InputNodeDetails node={node} />;
      break;
    default:
      break;
  }
  return (
    <Wrapper>
      Node Details
      {view && view}
      <div>Out Gates</div>
      {node.children('.out').map((out) => {
        return <Response key={out.id()} node={out} />;
      })}
    </Wrapper>
  );
};

export default Details;
