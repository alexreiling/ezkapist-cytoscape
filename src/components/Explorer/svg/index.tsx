import React from 'react'
type AddFileIconProps = {
  strokeWidth?: number
  stroke?: string
}

const AddFile = (props: any) => (
  <div className={props.className}>
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 11H11V19H8V11H0V8H8V3V0H11V3V5V8H19V11ZM22.5 17.5V19H24H37V38H11V25H8V38V41H11H37H40V38V19V17.5L38.6286 16L25.5 1.64062L24 0H22.5H17V3H22.5V17.5ZM25.5 6.08659L34.5637 16H25.5V6.08659Z"
      />
    </svg>
  </div>
)
export const Icons = {
  AddFile,
}
