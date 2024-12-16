import React, { useState } from 'react'
import Input from '../shared/Input'
import Button from '../shared/Button'
import SocialAuth from './SocialAuth'

export default function LoginForm() {
  // State hooks for email and password 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Handle form submission 
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Logging in with:", email, password)
  }

  return (
    // Form element with submission handler
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center">
      <div className='w-full relative'>
        {/* Email input field */}
        <Input
          type="email"
          label="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon="mail"
        />
      </div>
      <div className="w-full relative">
        {/* Password input field */}
        <Input
          type="password"
          label="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon="lock"
        />
        {/* Forgot password link */}
        <div className="flex justify-end mt-1">
          <a
            href="#forgot-password"
            className="text-sm text-blue-300 hover:text-blue-900 hover:underline transition-colors"
          >
            Forgot password?
          </a>
        </div>
      </div>

      <Button type="submit" className="mt-2">Log in</Button>

      <div className="relative flex items-center w-full mt-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-gray-500">Or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="mt-4">
        <SocialAuth />
      </div>

      <div className="mt-4 text-sm text-center text-gray-500">
        Have no account yet?
      </div>

      <div className="mt-2">
        <Button variant="secondary" className="py-3 text-lg">
          Register
        </Button>
      </div>
    </form>
  )
}