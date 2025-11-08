import clsx from 'clsx'
import { ComponentProps, FC, ReactNode, SVGProps } from 'react'
import ButtonSpinner from './icons/ButtonSpinner'

type BaseStyles = {
  outline: string
  solid: string
}

type VariantStyles = {
  outline: {
    blue: string
    white: string
  }
  solid: {
    blue: string
    white: string
  }
}

export interface BaseButtonProps extends ComponentProps<'button'> {
  children?: ReactNode
  className?: string
  colour?: keyof {
    blue: string
    white: string
  }
  loading?: boolean
  type?: 'button' | 'submit'
  variant?: keyof BaseStyles
  isCircular?: boolean
}

export interface ButtonSVGProps extends SVGProps<HTMLOrSVGElement> {
  SVGClassName?: string
  SVGHeight?: number
  SVGViewBox?: string
  SVGWidth?: number
}

export type ButtonProps = BaseButtonProps & ButtonSVGProps

const baseStyles: BaseStyles = {
  solid:
    'group inline-flex items-center justify-center text-sm font-medium focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer',
  outline:
    'group inline-flex ring-1 items-center justify-center text-sm focus:outline-none',
}

const variantStyles: VariantStyles = {
  solid: {
    blue: 'bg-blue-500 text-white hover:bg-blue-300 hover:text-slate-100 focus-visible:outline-slate-900',
    white:
      'bg-white text-slate-900 hover:bg-gray-50 active:bg-gray-100 active:text-slate-600 focus-visible:outline-white',
  },
  outline: {
    blue: 'bg-indigo-50 ring-slate-400 text-blue-500 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300',
    white:
      'ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white',
  },
}

export const spinnerFill: VariantStyles = {
  solid: {
    blue: '#03071D',
    white: '#000',
  },
  outline: {
    blue: '#03071D',
    white: '#000',
  },
}

export type Variant = keyof typeof spinnerFill
export type Colour = keyof (typeof spinnerFill)[Variant]

export const Button: FC<ButtonProps> = ({
  children,
  className,
  colour,
  disabled,
  loading,
  SVGHeight,
  SVGViewBox,
  SVGWidth,
  variant,
  isCircular,
  ...props
}) => {
  const defaultClassName = clsx(
    baseStyles[variant || 'solid'],
    variantStyles[variant || 'solid'][colour || 'blue'],
    className,
    { 'opacity-50 cursor-not-allowed': disabled },
    isCircular ? 'rounded-full p-2' : 'rounded-md py-2 px-4'
  )

  return (
    <button className={defaultClassName} disabled={disabled} {...props}>
      {loading && (
        <ButtonSpinner
          colour={colour || 'blue'}
          SVGHeight={SVGHeight}
          SVGViewBox={SVGViewBox}
          SVGWidth={SVGWidth}
          variant={variant || 'solid'}
        />
      )}
      {children}
    </button>
  )
}
