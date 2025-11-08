import { FC } from 'react'
import IconBase, { IconProps } from './IconBase'

const BurgerMenuIcon: FC<IconProps> = ({
  height,
  stroke,
  strokeWidth,
  viewBox,
  width,
}) => {
  return (
    <IconBase
      height={height}
      stroke={stroke}
      strokeWidth={strokeWidth}
      viewBox={viewBox}
      width={width}
    >
      <path
        fillRule='evenodd'
        d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
        clipRule='evenodd'
      />
    </IconBase>
  )
}

export default BurgerMenuIcon
