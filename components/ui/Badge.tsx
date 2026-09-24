import { ReactNode } from 'react'
import clsx from 'clsx'
import { CheckCircle2 } from 'lucide-react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'gray' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  icon?: boolean
}

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  icon = false,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full',
        {
          // Variants
          'bg-primary-100 text-primary-700': variant === 'primary',
          'bg-green-600 text-white': variant === 'success',
          'bg-yellow-100 text-yellow-700': variant === 'warning',
          'bg-red-100 text-red-700': variant === 'error',
          'bg-gray-100 text-gray-700': variant === 'gray',
          'bg-accent-100 text-accent-800': variant === 'accent',
          
          // Sizes
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-2.5 py-1 text-sm': size === 'md',
          'px-3 py-1.5 text-base': size === 'lg',
        }
      )}
    >
      {icon && <CheckCircle2 className="w-4 h-4 mr-1" />}
      {children}
    </span>
  )
}
