import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function Input({ type = 'text', label, className = '', ...props }) {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        <input
          type={isPassword && showPassword ? 'text' : type}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-[#F5F5F5] focus:outline-none focus:border-gray-400 ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  )
}