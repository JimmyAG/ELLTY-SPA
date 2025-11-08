import { FC } from 'react'
import IconBase, { IconProps } from './IconBase'

const CloseIcon: FC<IconProps> = ({
  className,
  colorFill,
  height,
  stroke,
  strokeWidth,
  viewBox,
  width,
}) => {
  return (
    <IconBase
      className={className}
      colorFill={colorFill}
      height={height}
      stroke={stroke}
      strokeWidth={strokeWidth}
      viewBox={viewBox}
      width={width}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6 18L18 6M6 6l12 12'
      />
    </IconBase>
  )
}

export default CloseIcon
