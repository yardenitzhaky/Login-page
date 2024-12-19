import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  variant = 'primary',
  className = '',
  disabled = false,
  isLoading = false,
  children,
  ...props
}) => {
  const variants = {
    primary: 'bg-[#5B5FED] hover:bg-[#4A4FD5] text-white focus:ring-[#5B5FED]',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-200',
    text: 'bg-transparent text-[#5B5FED] hover:underline focus:ring-transparent'
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center
        rounded-full font-medium transition-colors
        focus:outline-none focus:ring-2 focus:ring-offset-2
        w-[185px] h-[40px]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `.trim()}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </div>
      ) : children}
    </button>
  );
};

export default Button;