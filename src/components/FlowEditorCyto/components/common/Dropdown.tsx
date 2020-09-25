import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;
const Header = styled.div`
  cursor: pointer;
  :hover {
    color: blue;
  }
`;

type DropdownProps = {
  headerComponent: ReactElement;
  open?: boolean;
};

const Dropdown: React.FC<DropdownProps> = (props) => {
  const { children, headerComponent, open = false } = props;
  const [opened, setOpened] = useState(open);
  return (
    <Wrapper>
      <Header onClick={() => setOpened(!opened)}>{headerComponent}</Header>
      {opened && children}
    </Wrapper>
  );
};

export default Dropdown;
