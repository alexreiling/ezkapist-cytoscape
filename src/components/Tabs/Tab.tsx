import { auto } from '@popperjs/core';
import React from 'react';
import { TabProps } from './types';
const Tab: React.FC<TabProps> = (props) => {
  const { focused } = props;
  return (
    <div
      style={{
        overflow: 'auto',
        flex: 1,
        display: focused ? 'initial' : 'none',
      }}
      className='tab'
    >
      {props.children}
    </div>
  );
};
export default Tab;
