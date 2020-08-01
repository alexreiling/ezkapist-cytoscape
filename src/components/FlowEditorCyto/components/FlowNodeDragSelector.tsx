import React, { DragEvent } from 'react';
import styled from 'styled-components';
import { SUPPORTED as supportedNodes } from '../../../Flow/config';

const Wrapper = styled.div``;
const Overflow = styled.div``;
const DragSourceProvider = styled.div``;

type FlowNodeDragSelectorProps = {};

const FlowNodeDragSelector: React.FC<FlowNodeDragSelectorProps> = (props) => {
  const handleDragStart = (e: DragEvent<HTMLDivElement>, nodeType: string) => {
    e.dataTransfer.setData('nodeType', nodeType);
  };
  return (
    <Wrapper>
      <div>Create Node</div>
      <Overflow>
        {supportedNodes.map((nodeDef) => {
          const { label, type } = nodeDef;
          return (
            <DragSourceProvider
              key={type}
              draggable
              onDragStart={(e) => handleDragStart(e, type)}
            >
              {label || type}
            </DragSourceProvider>
          );
        })}
      </Overflow>
    </Wrapper>
  );
};

export default FlowNodeDragSelector;
