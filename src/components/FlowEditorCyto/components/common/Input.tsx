import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
type InputProps = InputHTMLAttributes<HTMLInputElement> & {};
const StyledInput = styled.input``;

const Input: React.FC<InputProps> = (props) => {
  const { value = '', ...rest } = props;
  return <StyledInput value={value} {...rest} />;
};
export default Input;
