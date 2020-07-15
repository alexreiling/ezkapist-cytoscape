import React, { useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import { NodeSingular, EventObject } from 'cytoscape';
import {
  getDataAndScratch,
  setDataAndScratch,
  TraverserAutoRouting,
  TraverserState,
} from '../../../Simulation/traverser';
import { useNodeDataAndScratch, useLivePosition } from '../util';
import Button from '../../common/Button';
import { makeAudioListener } from '../../../Simulation';

const autoRoutingOptions = Object.keys(TraverserAutoRouting).filter(
  (key) => !isNaN(Number(TraverserAutoRouting[key as any]))
);
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
`;
const Label = styled.div`
  font-weight: bold;
`;

type TraverserDetailsProps = {
  traverser: NodeSingular;
};

const TraverserDetails: React.FC<TraverserDetailsProps> = (props) => {
  const { traverser } = props;
  const { data, scratch, setData } = useNodeDataAndScratch(traverser);
  const [position] = useLivePosition(traverser);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let value: any = e.target.value;
    if (e.target.type === 'number') value = parseFloat(e.target.value);
    else if (e.target.name === 'state')
      //@ts-ignore
      value = e.target.checked ? TraverserState.Moving : TraverserState.Idle;
    let update = { ...data, [e.target.name]: value };
    setDataAndScratch(traverser, update);
    setData(update);
  };

  return (
    <Wrapper>
      <Button onClick={() => makeAudioListener(traverser)}>
        Make Listener
      </Button>
      <Label>Name</Label>
      <input
        name='name'
        onChange={handleChange}
        value={data.name || ''}
        placeholder='Name this traverser...'
      />{' '}
      <Label>X</Label>
      <div>{Math.round(position.x)}</div>
      <Label>Y</Label>
      <div>{Math.round(position.y)}</div>
      <Label>Speed [m/s]</Label>
      <input
        min='0'
        name='speed'
        type='number'
        onChange={handleChange}
        value={data.speed}
      />
      <Label>Auto Routing</Label>
      <select
        data-type='numeric'
        name='autoRouting'
        onChange={handleChange}
        value={data.autoRouting}
      >
        {autoRoutingOptions.map((mode) => (
          <option key={mode} value={TraverserAutoRouting[mode as any]}>
            {mode}
          </option>
        ))}
      </select>
      <Label>Movement</Label>
      <input
        name='state'
        type='checkbox'
        checked={data.state === TraverserState.Moving}
        onChange={handleChange}
      />
      <Label>Location</Label>
      <div>{scratch.loc?.id() || '-'}</div>
      <Label>Destination</Label>
      <div>{scratch.dest?.id() || '-'}</div>
    </Wrapper>
  );
};

export default TraverserDetails;
