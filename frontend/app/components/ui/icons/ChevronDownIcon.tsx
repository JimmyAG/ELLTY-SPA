import { FC } from 'react'
import IconBase, { IconProps } from './IconBase'

const ChevronDownIcon: FC<IconProps> = ({ className, height, width }) => {
  return (
    <IconBase width={width} height={height} className={className}>
      <path
        d='M19 9L12 16L5 9'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </IconBase>
  )
}

export default ChevronDownIcon
