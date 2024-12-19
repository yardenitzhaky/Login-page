import React from 'react'
import Illustration from '../assets/welcome.png'
import Logo from '../assets/logo.png'

export default function WelcomePanel() {
  return (
    // Container
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 bg-[#4A4FD5]">
      {/* Small logo in top-left corner */}
      <div className="absolute top-4 left-4">
        <img
          src={Logo}
          alt="Company Logo"
          className="w-12 h-auto"
        />
      </div>

      {/* Welcome illustration */}
      <div className="mb-4">
        <img
          src={Illustration}
          alt="Welcome illustration"
          className="rounded-md w-80 h-auto"
        />
      </div>

      {/* Welcome message */}
      <h2 className="text-2xl font-bold text-white text-center">Welcome aboard my friend</h2>
      <p className="text-sm text-white text-center">just a couple of clicks and we start</p>
    </div>
  )
}