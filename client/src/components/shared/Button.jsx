import React from 'react'

export default function Button({ variant = 'primary', className = '', disabled, ...props }) {
  let baseClasses = `
    inline-flex items-center justify-center
    rounded-full font-medium transition-colors
    focus:outline-none focus:ring-2 focus:ring-offset-2
    w-[185px] h-[40px]
  `
  let variantClasses = ''

  switch (variant) {
    case 'primary':
      variantClasses = `
        bg-[#5B5FED] text-white
        hover:bg-[#4A4FD5]
        focus:ring-[#5B5FED]
        disabled:opacity-50 disabled:cursor-not-allowed
      `
      break
    case 'secondary':
      variantClasses = `
        bg-gray-200 text-gray-800
        hover:bg-gray-300
        focus:ring-gray-200
        disabled:opacity-50 disabled:cursor-not-allowed
      `
      break
    case 'text':
      variantClasses = `
        bg-transparent text-[#5B5FED] hover:underline focus:ring-transparent
        disabled:opacity-50 disabled:cursor-not-allowed
      `
      break
    default:
      variantClasses = ''
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      disabled={disabled}
      {...props}
    />
  )
}