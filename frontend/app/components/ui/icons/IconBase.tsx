import React from 'react'
import { FC, ReactNode } from 'react'

export interface IconProps {
  children?: ReactNode
  className?: string
  colorFill?: string
  height?: string | number
  stroke?: string
  strokeWidth?: string | number
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit' | undefined
  strokeLinejoin?: 'round' | 'inherit' | 'miter' | 'bevel' | undefined
  viewBox?: string
  width?: string | number
}

type IconBaseProps = IconProps & Partial<React.SVGProps<SVGSVGElement>>

const IconBase: FC<IconBaseProps> = ({
  children,
  className,
  colorFill,
  height,
  stroke,
  strokeWidth,
  viewBox,
  width,
  ...props
}) => {
  return (
    <svg
      className={className}
      fill={colorFill || 'currentColor'}
      height={height || '24'}
      stroke={stroke}
      strokeWidth={strokeWidth}
      viewBox={viewBox || '0 0 24 24'}
      width={width || '24'}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      {children}
    </svg>
  )
}

export default IconBase
