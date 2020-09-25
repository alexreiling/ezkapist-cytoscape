import React, { useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import styled from 'styled-components';
import { Asset } from '../../types';
import ExplorerReact from '../Explorer';
import { Item } from '../Explorer/types';

const Wrapper = styled.div``;
const ContextMenu = styled.div`
  padding: 12px 18px;
  background: grey;
`;
type ExplorerViewProps = {
  items: Asset[];
  focusedItem?: Asset;
  onFocus: (item: Asset) => any;
};

const ExplorerView: React.FC<ExplorerViewProps> = (props) => {
  const { items, focusedItem } = props;
  const [contextMenuVisible, setContextMenuVisible] = useState(false);

  const virtualElementRef = useRef<any>(null);
  const popperElementRef = useRef<any>(null);
  const { styles, attributes, forceUpdate } = usePopper(
    virtualElementRef.current,
    popperElementRef.current,
    {
      placement: 'right-start',
      // modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    }
  );
  const handleRightClick = (item: Item, e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    console.log(item);
    virtualElementRef.current = {
      getBoundingClientRect: () => ({
        width: 0,
        height: 0,
        top: y,
        right: x,
        bottom: y,
        left: x,
      }),
    };
    if (forceUpdate) forceUpdate();
    console.log(virtualElementRef.current.valueOf());
    setContextMenuVisible(true);
    const closeContextMenu = () => {
      console.log('closing');
      document.removeEventListener('click', closeContextMenu);
      setContextMenuVisible(false);
    };
    document.addEventListener('click', closeContextMenu);
    e.preventDefault();
  };
  return (
    <Wrapper>
      <ExplorerReact
        items={items.map((item) => ({ ...item, payload: item }))}
        focusedId={focusedItem?.id}
        onUserFocus={(item) => props.onFocus(item.payload)}
        onRightClick={handleRightClick}
        createAssetPopover={<div>Hi</div>}
      />
      <ContextMenu
        ref={popperElementRef}
        style={{
          ...styles.popper,
          display: contextMenuVisible ? 'block' : 'none',
        }}
        {...attributes.popper}
      >
        Hello
      </ContextMenu>
    </Wrapper>
  );
};

export default ExplorerView;
