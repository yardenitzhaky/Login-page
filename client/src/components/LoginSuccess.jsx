import React from 'react';
import { PartyPopper } from 'lucide-react';
import Button from './Button';

// LoginSuccess component displays a success message after a successful login
export default function LoginSuccess({ username, onBack }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
      {/* PartyPopper icon */}
      <PartyPopper size={64} className="text-green-500" />
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome back, {username}!
      </h1>
      <p className="text-xl text-gray-600">
        You have successfully logged in.
      </p>
      {/* Button to navigate back to the login screen */}
      <Button 
        variant="secondary"
        className="mt-6"
        onClick={onBack}
      >
        Back to Login
      </Button>
    </div>
  );
}