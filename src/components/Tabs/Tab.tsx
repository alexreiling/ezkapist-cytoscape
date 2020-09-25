import React from 'react'
import { TabProps } from './types'
const Tab: React.FC<TabProps> = (props) => {
  const { selected } = props
  return (
    <div
      style={{
        display: selected ? 'initial' : 'none',
      }}
    >
      {props.children}
    </div>
  )
}
export default Tab
