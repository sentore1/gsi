import { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center',
        {
          // Variants
          'bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow-md':
            variant === 'primary',
          'bg-gray-600 hover:bg-gray-700 text-white shadow-sm':
            variant === 'secondary',
          'bg-accent-400 hover:bg-accent-500 text-gray-900 shadow-sm':
            variant === 'accent',
          'border-2 border-primary-600 text-primary-600 hover:bg-primary-50':
            variant === 'outline',
          'text-gray-700 hover:bg-gray-100': variant === 'ghost',
          
          // Sizes
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
          
          // Width
          'w-full': fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
