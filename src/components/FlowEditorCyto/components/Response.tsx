import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { NodeSingular } from 'cytoscape';
import { useCytoDataState } from '../../util/cytoscapeReact';
import { handleInputChange } from '../../util';

const Wrapper = styled.div``;

type ResponseProps = {
  node: NodeSingular;
};
interface ResponseType {
  key: string;
}
const Response: React.FC<ResponseProps> = (props) => {
  const { node } = props;
  const [gateData, setGateData] = useCytoDataState<ResponseType>(
    node,
    'ezkapist-gate'
  );
  const handleChange = handleInputChange(gateData, setGateData);
  return (
    <Wrapper>
      <div>Antwort</div>
      <input value={gateData.key || ''} name='key' onChange={handleChange} />
    </Wrapper>
  );
};

export default Response;
