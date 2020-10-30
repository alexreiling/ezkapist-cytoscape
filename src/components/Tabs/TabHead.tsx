import clsx from 'clsx';
import React from 'react';
import { Close } from './Icons';

type TabHeadProps = {
  title: string;
  selected?: boolean;
  focused?: boolean;
  onUserFocus: () => any;
  onClose: () => any;
};

const TabHead: React.FC<TabHeadProps> = (props) => {
  return (
    <div
      className={clsx('tab-head', {
        focused: props.focused,
      })}
      onClick={() => props.onUserFocus()}
    >
      <div title='test'>{props.title}</div>
      <Close
        title='Close'
        onClick={(e) => {
          e.stopPropagation();
          props.onClose();
        }}
      />
    </div>
  );
};

export default TabHead;
