import clsx from 'clsx';
import React from 'react';
import styled, { css } from 'styled-components';
import { Icons } from './Icons';

const Wrapper = styled.div`
  display: flex;
  cursor: pointer;
  &.collapsed svg {
    transform: rotate(-90deg);
  }
`;
const Chevron = styled(Icons.Chevron)<{ rotated?: boolean }>`
  transition: all 0.3s ease-in-out;
`;
type HeaderProps = {
  label?: string;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => any;
};

const Header: React.FC<HeaderProps> = (props) => {
  const { label, setCollapsed, collapsed } = props;
  return (
    <Wrapper
      className={clsx('header', { collapsed })}
      onClick={() => setCollapsed(!collapsed)}
      style={{ display: 'flex', width: '100%', alignItems: 'center' }}
    >
      <Chevron />

      <div className='label'>{label || 'Untitled'}</div>
      <div style={{ marginLeft: 'auto' }}>
        {/* <Popper
        visible={popperVisible}
        ref={popperElementRef}
        style={styles.popper}
        {...attributes.popper}
      >
        {createAssetPopover}
        <div ref={setArrowElement} style={styles.arrow} />
      </Popper> */}
      </div>
      {/* <Toolbar>{onCreate && <AddFileIcon onClick={handleCreate} />}</Toolbar> */}
    </Wrapper>
  );
};

export default Header;
