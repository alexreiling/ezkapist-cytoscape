import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const Wrapper = styled.div``;
export type TextPrompt = {
  prompt: string;
  options: {
    key: string;
    label: string;
  }[];
};
type FlowOutputProps = {
  textPrompt?: TextPrompt;
  callback?: (key: string) => any;
};

const FlowOutput: React.FC<FlowOutputProps> = (props) => {
  const { textPrompt, callback } = props;
  const handleCallback = (key: string) => {
    if (callback) callback(key);
  };
  if (textPrompt)
    return (
      <Wrapper>
        <div>{textPrompt.prompt}</div>
        {textPrompt.options.map((option) => {
          const { key, label } = option;
          return <Button onClick={() => handleCallback(key)}>{label}</Button>;
        })}
      </Wrapper>
    );
  else return null;
};

export default FlowOutput;
