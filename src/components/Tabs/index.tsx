import React from 'react'
import styled from 'styled-components'
import TabHead from './TabHead'
import { TabsProps } from './types'

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  display: flex;
  background-color: #131510;
`

const Body = styled.div`
  display: flex;
`

// FC
export const Tabs: React.FC<TabsProps> = (props) => {
  const { onClose, onUserFocus, children } = props
  const handleFocus = (index: number, data?: any) => {
    if (onUserFocus) onUserFocus(index, data)
  }
  return (
    <Wrapper>
      <Header>
        {children.map((tab, index) => (
          <TabHead
            onUserFocus={() => handleFocus(index, tab.props.data)}
            onClose={() => {
              if (onClose) onClose(index, tab.props.data)
            }}
            title={tab.props.title}
            selected={tab.props.selected}
            key={index}
          />
        ))}
      </Header>
      <Body>{children}</Body>
    </Wrapper>
  )
}
export { default as Tab } from './Tab'
export default Tabs
