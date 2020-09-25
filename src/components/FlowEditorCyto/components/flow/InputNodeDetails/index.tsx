import React from 'react';
import styled from 'styled-components';
import { NodeSingular, NodeCollection } from 'cytoscape';
import { useCytoDataState } from '../../../../util/cytoscapeReact';
import { handleInputChange } from '../../../../util';
import { InputNodeData } from '../../../../../Flow/controllers/flow/InputNodeController';
import { DATA } from '../../../../../Flow/config';
import InputNodeInGateDetails from './InputNodeInGateDetails';
import InputNodeOutGateDetails from './InputNodeOutGateDetails';
import Dropdown from '../../common/Dropdown';
import Label from '../../common/Label';
import Input from '../../common/Input';
const Wrapper = styled.div``;

type InputNodeDetailsProps = {
  node: NodeSingular;
};

const InputNodeDetails: React.FC<InputNodeDetailsProps> = (props) => {
  const { node } = props;
  let parent = node.isParent() ? node : (node.parent() as NodeSingular);
  const [flowData, setFlowData] = useCytoDataState<InputNodeData>(
    parent,
    DATA._flowData
  );
  const { prompt, name } = flowData;
  const handleChange = handleInputChange(flowData, setFlowData);
  const inGates = parent.children(`.input-in-gate`);
  const outGates = parent.children(`.input-out-gate`);

  return (
    <Wrapper>
      <Label>Name</Label>
      <Input
        name='name'
        value={name}
        placeholder='Name this node...'
        onChange={handleChange}
      />
      <Label>Prompt</Label>
      <Input
        name='prompt'
        value={prompt}
        placeholder='Enter a prompt...'
        onChange={handleChange}
      />
      <Dropdown
        headerComponent={<div>Inputs</div>}
        open={inGates.some((n) => (n as NodeSingular).selected())}
      >
        {inGates.map((child) => (
          <InputNodeInGateDetails key={child.id()} node={child} />
        ))}
      </Dropdown>
      <Dropdown
        headerComponent={<div>Choices</div>}
        open={outGates.some((n) => (n as NodeSingular).selected())}
      >
        {outGates.map((child) => (
          <InputNodeOutGateDetails key={child.id()} node={child} />
        ))}
      </Dropdown>
    </Wrapper>
  );
};

export default InputNodeDetails;
