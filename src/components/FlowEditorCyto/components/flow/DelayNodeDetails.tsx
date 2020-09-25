import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { useCytoDataState } from '../../../util/cytoscapeReact';
import { handleInputChange } from '../../../util';

import { NodeSingular } from 'cytoscape';
import { DATA } from '../../../../Flow/config';
import { DelayNodeData } from '../../../../Flow/controllers/flow/DelayNodeController';
import Label from '../common/Label';
import Input from '../common/Input';
const Wrapper = styled.div`
  display: flex;
`;

type DelayNodeDetailsProps = {
  node: NodeSingular;
};

const DelayNodeDetails: React.FC<DelayNodeDetailsProps> = (props) => {
  const { node } = props;
  const [flowData, setFlowData] = useCytoDataState<DelayNodeData>(
    node,
    DATA._flowData
  );
  const { delay = '' } = flowData;
  const handleChange = handleInputChange(flowData, setFlowData);
  return (
    <Wrapper>
      <Label>Delay [ms]</Label>
      <Input
        type='number'
        onChange={handleChange}
        name='delay'
        min='0'
        max='600000'
        step='100'
        value={delay}
      />
    </Wrapper>
  );
};

export default DelayNodeDetails;
