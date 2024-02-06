import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface LogoProps extends ComponentPropsWithoutRef<'h1'> {}

export const Logo = ({ className, ...props }: LogoProps) => {
  return (
    <h1
      className={twMerge(
        'text-lg text-xs-green transition-all hover:text-2xl',
        className,
      )}
      {...props}
    >
      XS
    </h1>
  )
}
