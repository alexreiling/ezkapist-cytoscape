import React from 'react';
import styled from 'styled-components';
import TabHead from './TabHead';
import { TabsProps } from './types';

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// FC
export const Tabs: React.FC<TabsProps> = (props) => {
  const { onClose, onUserFocus, children } = props;
  const handleFocus = (index: number, data?: any) => {
    if (onUserFocus) onUserFocus(index, data);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
      className='react-tabs'
    >
      <div
        style={{ display: 'flex', width: '100%', overflow: 'auto' }}
        className='header'
      >
        {children.map((tab, index) => (
          <TabHead
            onUserFocus={() => handleFocus(index, tab.props.data)}
            onClose={() => {
              if (onClose) onClose(index, tab.props.data);
            }}
            title={tab.props.title}
            focused={tab.props.focused}
            key={index}
          />
        ))}
      </div>
      <div
        style={{ display: 'flex', overflow: 'auto', height: '100%' }}
        className='body'
      >
        {children}
      </div>
    </div>
  );
};
export { default as Tab } from './Tab';
export default Tabs;
