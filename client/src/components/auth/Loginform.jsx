import React, { useState } from 'react'
import Input from '../shared/Input'
import Button from '../shared/Button'
import SocialAuth from './SocialAuth'
import { toast } from 'react-toastify';


export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [showRegister, setShowRegister] = useState(false)

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    console.log("Logging in with:", email, password)
  }

  const handleRegisterClick = () => {
    setShowRegister(true)
    
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    // Create formData object with the registration data
    const formData = {
      username: regEmail.split('@')[0], // Creating username from email
      email: regEmail,
      password: regPassword
    };

    try {
      // After successful registration
      const response = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        // Show toast with welcome message
        toast.success(data.welcomeMessage || 'Registration successful!');
        setShowRegister(false); // Hide registration form
        setRegEmail(''); // Clear form
        setRegPassword('');
      } else {
        toast.error(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col space-y-4 items-center">
      {!showRegister ? (
        // Login Form
        <form onSubmit={handleLoginSubmit} className="flex flex-col space-y-4 items-center w-full">
          {/* Login Fields */}
          <div className='w-full relative'>
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
            <Input
              type="password"
              label="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon="lock"
            />
            {/* Forgot password? to the right under the password field */}
            <div className="flex justify-end mt-1">
              <a
                href="#forgot-password"
                className="text-sm text-blue-300 hover:text-blue-900 hover:underline transition-colors"
              >
                Forgot password?
              </a>
            </div>
          </div>
  
          {/* Log in button */}
          <Button type="submit" className="mt-2">Log in</Button>
  
          {/* OR divider with lines */}
          <div className="relative flex items-center w-full mt-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
  
          {/* Social auth buttons */}
          <div className="mt-4">
            <SocialAuth />
          </div>
  
          {/* "Have no account yet?" above register button */}
          <div className="mt-4 text-sm text-center text-gray-500">
            Have no account yet?
          </div>
  
          <div className="mt-2">
            {/* Match the social auth styling by using variant="secondary" */}
            <Button variant="secondary" className="py-3 text-lg" onClick={handleRegisterClick}>
              Register
            </Button>
          </div>
        </form>
      ) : (
        // Registration Form
        <form onSubmit={handleRegisterSubmit} className="flex flex-col space-y-4 items-center w-full">
          {/* Registration Fields */}
          <div className='w-full relative'>
            <Input
              type="email"
              label="Registration Email"
              placeholder="Your Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              icon="mail"
            />
          </div>
          <div className='w-full relative'>
            <Input
              type="password"
              label="Registration Password"
              placeholder="Your Password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              icon="lock"
            />
          </div>
          <Button variant="secondary" type="submit" className="py-3 text-lg">
            Submit
          </Button>
  
          {/* Back to Login Button */}
          <Button 
            variant="text" 
            className="mt-2"
            onClick={() => setShowRegister(false)}
          >
            Back to Login
          </Button>
        </form>
      )}
    </div>
  )
}
