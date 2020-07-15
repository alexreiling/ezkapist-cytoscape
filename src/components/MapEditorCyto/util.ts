import { Core, NodeSingular, EventObject, Position } from 'cytoscape';
import { getDataAndScratch } from '../../Simulation/traverser';
import { useState, useEffect, useCallback } from 'react';

export const initFromLocalStorage = (cy: Core) => {
  try {
    let data = localStorage.getItem('graph') as string;
    cy.add(JSON.parse(data));
    cy.$(':selected').unselect();
  } catch (error) {
    console.log(error);
  }
};

export function useNodeDataAndScratch(node: NodeSingular) {
  const { data: initData, scratch: initScratch } = getDataAndScratch(node);
  const [data, setData] = useState(initData);
  const [scratch, setScratch] = useState(initScratch);

  useEffect(() => {
    const updateScratch = (e: EventObject) => {
      setScratch(getDataAndScratch(e.target).scratch);
    };
    const updateData = (e: EventObject) => {
      setData(getDataAndScratch(e.target).data);
    };
    node.addListener('scratch', updateScratch);
    node.addListener('data', updateData);

    return () => {
      node.removeListener('scratch', undefined, updateScratch);
      node.removeListener('data', undefined, updateData);
    };
  }, [node]);

  return {
    data,
    setData,
    scratch,
    setScratch,
  };
}
export function useLivePosition(node: NodeSingular) {
  const [position, setPosition] = useState(node.position());
  useEffect(() => {
    const handlePositionChange = (e: EventObject) => {
      setPosition({ ...e.target.position() });
    };
    node.addListener('position', handlePositionChange);
    return () => {
      node.removeListener('position', undefined, handlePositionChange);
    };
  }, [node]);

  return [position];
}
