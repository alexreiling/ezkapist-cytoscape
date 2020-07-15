import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';
import { Core, NodeCollection } from 'cytoscape';
import MainLoop from 'mainloop.js';
import { initSim, startSim, stopSim, cleanUpSim } from '../../../Simulation';
const Wrapper = styled.div``;

type HeaderProps = {
  cy: Core;
};

const Header: React.FC<HeaderProps> = (props) => {
  const { cy } = props;
  useEffect(() => {
    return () => cleanUpSim(cy);
  }, []);
  const handleSave = () => {
    let graph = {
      nodes: cy.nodes('.static, .traverser').jsons(),
      edges: cy.edges().jsons(),
    };
    localStorage.setItem('graph', JSON.stringify(graph));
  };
  const handleStart = () => {
    initSim(cy);
    console.log(cy.$('.sound-source'));
    startSim(cy);
  };
  const handleStop = () => {
    stopSim(cy);
  };
  return (
    <Wrapper>
      <Button onClick={handleSave}>Save</Button>
      <Button onClick={handleStart}>Start</Button>
      <Button onClick={handleStop}>Stop</Button>
    </Wrapper>
  );
};

export default Header;
