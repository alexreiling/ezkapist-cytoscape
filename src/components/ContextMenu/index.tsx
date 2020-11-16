import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import styled from 'styled-components';
import { COLORS } from '../../config';

const Wrapper = styled.div`
  /* Auto Layout */

  display: flex;
  flex-direction: column;
  padding: 4px 0px;

  width: 220px;

  /* Background/bg3 */

  background: ${COLORS.background.shades[3]};
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  > div {
    cursor: pointer;
    padding: 8px 12px;
    &:hover {
      background-color: ${COLORS.background.shades[6]};
      color: white;
    }
  }
`;

export type ContextMenuProps = {
  pos?: {
    x: number;
    y: number;
  };
  hide?: boolean;
  onDestroy?: () => any;
};

const virtualElement = (x: number = 0, y: number = 0) => ({
  getBoundingClientRect: () => ({
    width: 0,
    height: 0,
    top: y,
    right: x,
    bottom: y,
    left: x,
  }),
});
const ContextMenu: React.FC<ContextMenuProps> = (props) => {
  const { pos, hide, onDestroy, children } = props;
  const virtualElementRef = useRef<any>(null);
  const [popperElementRef, setPopperElementRef] = useState<any>(null);
  const { styles, attributes, forceUpdate } = usePopper(
    virtualElementRef.current,
    popperElementRef,
    {
      placement: 'right-start',
      // modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    }
  );

  useEffect(() => {
    if (hide) return;
    const closeContextMenu = () => {
      console.log('closing');
      document.removeEventListener('click', closeContextMenu);
      if (onDestroy) onDestroy();
    };
    document.addEventListener('click', closeContextMenu);
  }, [hide]);
  useEffect(() => {
    virtualElementRef.current = virtualElement(pos?.x, pos?.y);
    if (forceUpdate) forceUpdate();
  }, [pos]);

  return (
    <Wrapper
      ref={setPopperElementRef}
      {...attributes.popper}
      style={{
        ...styles.popper,
        display: hide ? 'none' : 'block',
      }}
    >
      {children}
    </Wrapper>
  );
};

export default ContextMenu;
