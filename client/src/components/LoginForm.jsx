import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import SocialAuth from './SocialAuth';
import { toast } from 'react-toastify';

const API_URL = 'https://register-hca8e4dba2eafxec.israelcentral-01.azurewebsites.net';

// Main login form component that handles both login and registration
export default function LoginForm({ onLoginSuccess }) {
  // State variables 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Handle login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Attempting login to:', `${API_URL}/api/login`);
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          email,
          password
        }),
      });
  
      const data = await response.json();
      console.log('Login response:', data);
      
      if (response.ok) {
        onLoginSuccess(data.user);
        toast.success('Login successful!');
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error details:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Switch to registration form
  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  // Handle registration submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    
    // Create form data
    const formData = {
      username: regEmail.split('@')[0],
      email: regEmail,
      password: regPassword
    };
  
    try {
      console.log('Attempting registration to:', `${API_URL}/api/register`);
      console.log('Registration data:', formData);
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log('Registration response:', data);
      
      if (response.ok) {
        toast.success(data.welcomeMessage || 'Registration successful!');
        setShowRegister(false);
        setRegEmail('');
        setRegPassword('');
      } else {
        toast.error(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error details:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 items-center">
      {!showRegister ? (
        // Login Form
        <form onSubmit={handleLoginSubmit} className="flex flex-col space-y-4 items-center w-full">
          {/* Email input */}
          <div className="w-full relative">
            <Input
              type="email"
              label="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon="mail"
              disabled={isLoading}
            />
          </div>
          
          {/* Password input */}
          <div className="w-full relative">
            <Input
              type="password"
              label="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon="lock"
              disabled={isLoading}
            />
            <div className="flex justify-end mt-1">
              <a
                href="#forgot-password"
                className="text-sm text-blue-500 hover:text-blue-900 hover:underline transition-colors"
              >
                Forgot password?
              </a>
            </div>
          </div>
  
          {/* Login button */}
          <Button 
            type="submit" 
            className="mt-2"
            isLoading={isLoading}
            disabled={isLoading || !email || !password}
          >
            Log in
          </Button>
  
          {/* Divider */}
          <div className="relative flex items-center w-full mt-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
  
          {/* Social auth buttons */}
          <div className="mt-4">
            <SocialAuth 
              onLoginSuccess={onLoginSuccess}
              disabled={isLoading}
            />
          </div>
  
          {/* Register section */}
          <div className="mt-4 text-sm text-center text-gray-500">
            Have no account yet?
          </div>
  
          <div className="mt-2">
            <Button 
              variant="secondary" 
              className="py-3 text-lg" 
              onClick={handleRegisterClick}
              disabled={isLoading}
            >
              Register
            </Button>
          </div>
        </form>
      ) : (
        // Registration Form
        <form onSubmit={handleRegisterSubmit} className="flex flex-col space-y-4 items-center w-full">
          {/* Registration email */}
          <div className="w-full relative">
            <Input
              type="email"
              label="Registration Email"
              placeholder="Your Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              icon="mail"
              disabled={isRegistering}
            />
          </div>
          
          {/* Registration password */}
          <div className="w-full relative">
            <Input
              type="password"
              label="Registration Password"
              placeholder="Your Password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              icon="lock"
              disabled={isRegistering}
            />
          </div>
          
          {/* Submit button */}
          <Button 
            variant="secondary" 
            type="submit" 
            className="py-3 text-lg"
            isLoading={isRegistering}
            disabled={isRegistering || !regEmail || !regPassword}
          >
            Submit
          </Button>
  
          {/* Back to login */}
          <Button 
            variant="text" 
            className="mt-2"
            onClick={() => setShowRegister(false)}
            disabled={isRegistering}
          >
            Back to Login
          </Button>
        </form>
      )}
    </div>
  );
}