import { FC } from 'react'
import IconBase, { IconProps } from './IconBase'

const EyeIcon: FC<IconProps> = ({ colorFill, height, viewBox, width }) => {
  return (
    <IconBase height={height} viewBox={viewBox} width={width}>
      <path
        d='M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'
        fill={colorFill || '#333'}
      />
    </IconBase>
  )
}

export default EyeIcon
