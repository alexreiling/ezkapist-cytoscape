import React from 'react';
import styled from 'styled-components';
import { useCytoDataState } from '../../../util/cytoscapeReact';
import { handleInputChange } from '../../../util';
import { OutputNodeData } from '../../../../Flow/controllers/flow/OutputNodeController';
import { NodeSingular } from 'cytoscape';
import { DATA } from '../../../../Flow/config';
import Label from '../common/Label';
import Input from '../common/Input';

const Wrapper = styled.div``;

type OutputNodeDetailsProps = {
  node: NodeSingular;
};

const OutputNodeDetails: React.FC<OutputNodeDetailsProps> = (props) => {
  const { node } = props;
  const [flowData, setFlowData] = useCytoDataState<OutputNodeData>(
    node,
    DATA._flowData
  );
  const { text, name } = flowData;
  const handleChange = handleInputChange(flowData, setFlowData);
  return (
    <Wrapper>
      <Label>Text</Label>
      <Input
        type='input'
        onChange={handleChange}
        name='text'
        value={text}
        placeholder='Enter text...'
      />
    </Wrapper>
  );
};

export default OutputNodeDetails;
