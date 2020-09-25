import React from 'react';
import styled from 'styled-components';
const StyledLabel = styled.div`
  font-weight: bold;
`;

const Label: React.FC = (props) => {
  const { children, ...rest } = props;
  return <StyledLabel {...rest}>{children}</StyledLabel>;
};

export default Label;
