import React from 'react';
import styled, { css } from 'styled-components';
import { NodeSingular } from 'cytoscape';
import { useCytoDataState } from '../../../../util/cytoscapeReact';
import {
  InputNodeData,
  InputNodeOutGateData,
} from '../../../../../Flow/controllers/flow/InputNodeController';
import { DATA } from '../../../../../Flow/config';
import Input from '../../common/Input';
import { handleInputChange } from '../../../../util';

const Wrapper = styled.div<Pick<InputNodeOutGateDetailsProps, 'selected'>>`
  ${(p) =>
    p.selected &&
    css`
      font-weight: bold;
    `}
`;

type InputNodeOutGateDetailsProps = {
  node: NodeSingular;
  selected?: boolean;
};

const InputNodeOutGateDetails: React.FC<InputNodeOutGateDetailsProps> = (
  props
) => {
  const { node } = props;
  const [flowData, setFlowData] = useCytoDataState<InputNodeOutGateData>(
    node,
    DATA._flowData
  );
  const handleChange = handleInputChange(flowData, setFlowData);

  const { buttonText, name } = flowData;

  return (
    <Wrapper selected={node.selected()}>
      <Input
        name='name'
        value={name}
        placeholder='Name this gate...'
        onChange={handleChange}
      />
      <div>Button</div>
      <Input
        name='buttonText'
        value={buttonText}
        placeholder='Enter a response...'
        onChange={handleChange}
      />
    </Wrapper>
  );
};

export default InputNodeOutGateDetails;
