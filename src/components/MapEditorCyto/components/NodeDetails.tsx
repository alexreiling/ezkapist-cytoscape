import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { NodeSingular } from 'cytoscape';
import { useNodeDataAndScratch, useLivePosition } from '../util';
import { setDataAndScratch } from '../../../Simulation/traverser';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
`;
const Label = styled.div`
  font-weight: bold;
`;
type MapNodeDetailsProps = {
  node: NodeSingular;
};

const NodeDetails: React.FC<MapNodeDetailsProps> = (props) => {
  const { node } = props;
  const { data, scratch, setData } = useNodeDataAndScratch(node);
  const [position] = useLivePosition(node);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let value: any = e.target.value;
    if (e.target.type === 'number') value = parseInt(e.target.value);
    let update = { ...data, [e.target.name]: value };
    setDataAndScratch(node, update);
  };
  console.log(position);

  return (
    <Wrapper>
      <Label>Name</Label>
      <input name='name' onChange={handleChange} value={data.name || ''} />
      <Label>X</Label>
      <input
        name='x'
        step='1'
        type='number'
        onChange={(e) => node.position('x', parseInt(e.target.value))}
        value={'' + Math.round(position.x)}
      />
      <Label>Y</Label>
      <input
        name='y'
        step='1'
        type='number'
        onChange={(e) => node.position('y', parseInt(e.target.value))}
        value={'' + Math.round(position.y)}
      />
      <Label>Sound Source</Label>
      <input
        name='audioUrl'
        onChange={handleChange}
        value={data.audioUrl || ''}
      />
    </Wrapper>
  );
};

export default NodeDetails;
