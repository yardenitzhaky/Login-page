import React from 'react'
import Button from '../shared/Button'
import { Facebook, Globe } from 'lucide-react'

export default function SocialAuth() {
  return (
    // Container for social auth buttons
    <div className="flex space-x-2">
      {/* Google auth button */}
      <Button variant="secondary" className="flex-1 space-x-2">
        <Globe className="w-5 h-5" />
        <span>Google</span>
      </Button>
      {/* Facebook auth button */}
      <Button variant="secondary" className="flex-1 space-x-2">
        <Facebook className="w-5 h-5" />
        <span>Facebook</span>
      </Button>
    </div>
  )
}