import React from 'react'
import Button from '../shared/Button'
import { Facebook, Globe } from 'lucide-react'

export default function SocialAuth({ onLoginSuccess }) {
  const handleSocialLogin = () => {
    // Simply trigger login success with a basic user object
    onLoginSuccess({ username: 'User' })
  }

  return (
    // Container for social auth buttons
    <div className="flex space-x-2">
      {/* Google auth button */}
      <Button 
        variant="secondary" 
        className="flex-1 space-x-2"
        onClick={handleSocialLogin}
      >
        <Globe className="w-5 h-5" />
        <span>Google</span>
      </Button>
      {/* Facebook auth button */}
      <Button 
        variant="secondary" 
        className="flex-1 space-x-2"
        onClick={handleSocialLogin}
      >
        <Facebook className="w-5 h-5" />
        <span>Facebook</span>
      </Button>
    </div>
  )
}