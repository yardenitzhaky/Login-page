import React from 'react'
import Button from './Button'
import { Facebook, Globe } from 'lucide-react'

// SocialAuth component for handling social login 
export default function SocialAuth({ onLoginSuccess, disabled }) {
  const handleSocialLogin = () => {
    // Simulate a successful login and call the onLoginSuccess callback
    onLoginSuccess({ username: 'User' })
  }

  return (
    <div className="flex space-x-2">
      <Button 
        variant="secondary" 
        className="flex-1 space-x-2"
        onClick={handleSocialLogin}
        disabled={disabled}
      >
        <Globe className="w-5 h-5" />
        <span>Google</span>
      </Button>
      <Button 
        variant="secondary" 
        className="flex-1 space-x-2"
        onClick={handleSocialLogin}
        disabled={disabled}
      >
        <Facebook className="w-5 h-5" />
        <span>Facebook</span>
      </Button>
    </div>
  )
}