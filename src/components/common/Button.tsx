import React, { HTMLAttributes, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  cursor: pointer;
  padding: 8px 12px;
`;

type ButtonProps = ButtonHTMLAttributes<HTMLDivElement> & {};

const Button: React.FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;
  return <Wrapper {...rest}>{children}</Wrapper>;
};

export default Button;
