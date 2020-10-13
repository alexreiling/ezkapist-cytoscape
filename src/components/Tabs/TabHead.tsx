import clsx from 'clsx';
import React from 'react';
import styled, { css } from 'styled-components';
import { Close } from './Icons';

export const Wrapper = styled.div<{ selected?: boolean }>`
  cursor: pointer;
  display: flex;
  min-width: 100px;
  max-width: 150px;
  flex: 1;
  border-right: 1px solid #252526;
  padding: 4px 12px 4px 24px;

  /* Close Button */
  svg {
    width: 12px;
    stroke: white;
    margin-left: auto;
    display: none;
  }
  :hover {
    svg {
      display: inline-block;
    }
  }
`;

type TabHeadProps = {
  title: string;
  selected?: boolean;
  focused?: boolean;
  onUserFocus: () => any;
  onClose: () => any;
};

const TabHead: React.FC<TabHeadProps> = (props) => {
  return (
    <Wrapper
      className={clsx('item', {
        focused: props.focused,
      })}
      onClick={() => props.onUserFocus()}
      selected={props.selected}
    >
      <div title='test'>{props.title}</div>
      <Close
        title='Close'
        onClick={(e) => {
          e.stopPropagation();
          props.onClose();
        }}
      />
    </Wrapper>
  );
};

export default TabHead;
