import React from 'react';
import styled from 'styled-components';
import { NodeSingular } from 'cytoscape';
import Response from './Response';

const Wrapper = styled.div``;

type DetailsProps = {
  node: NodeSingular;
};

const Details: React.FC<DetailsProps> = (props) => {
  const { node } = props;
  return (
    <Wrapper>
      Node Details
      <div>{node.id()}</div>
      <div>Prompt</div>
      <input></input>
      <div>Out Gates</div>
      {node.children('.out').map((out) => {
        return <Response key={out.id()} node={out} />;
      })}
    </Wrapper>
  );
};

export default Details;
