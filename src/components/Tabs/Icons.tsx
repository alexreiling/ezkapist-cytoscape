import React, { HTMLAttributes } from 'react'
export const Close = (props: HTMLAttributes<SVGElement>) => {
  const { title, ...rest } = props
  return (
    <svg
      stroke="black"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <title>{title}</title>
      <line x1="0" y1="0" x2="24" y2="24" />
      <line x1="0" y1="24" x2="24" y2="0" />
    </svg>
  )
}
