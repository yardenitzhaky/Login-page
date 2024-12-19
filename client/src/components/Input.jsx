import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

// Input component definition
export default function Input({ type = 'text', label, className = '', icon, ...props }) {
  
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'

  return (
    <div className="flex flex-col space-y-1">
      {/* Render label if provided */}
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        {/* Icon on the left */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {icon === 'mail' && <Mail className="w-5 h-5 text-gray-400" />}
          {icon === 'lock' && <Lock className="w-5 h-5 text-gray-400" />}
        </div>
        <input
          // Toggle input type between text and password based on showPassword state
          type={isPassword && showPassword ? 'text' : type}
          className={`w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md bg-[#F5F5F5] focus:outline-none focus:border-gray-400 ${className}`}
          {...props}
        />
        {/* Show/Hide password icon */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  )
}