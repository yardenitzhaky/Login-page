import React, { useState } from 'react'
import WelcomePanel from './components/WelcomePanel'
import LoginForm from './components/LoginForm'
import LoginSuccess from './components/LoginSuccess'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null)

  // Handle successful login
  const handleLoginSuccess = (user) => {
    if (user && user.username) {
      setLoggedInUser(user)
    }
  }

  // Handle back action to log out the user
  const handleBack = () => {
    setLoggedInUser(null)
  }

  return (
    <div className="bg-[#5B5FED] text-[#333333] h-screen w-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex" style={{ width: '1000px' }}>
          <div className="w-3/5">
            {/* Welcome panel component */}
            <WelcomePanel />
          </div>
          <div className="w-2/5 p-6 flex flex-col justify-center overflow-auto">
            {loggedInUser ? (
              // Show login success component if user is logged in
              <LoginSuccess
                username={loggedInUser.username}
                onBack={handleBack}
              />
            ) : (
              // Show login form component if no user is logged in
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            )}
            {/* Toast notifications container */}
            <ToastContainer
              position='top-right'
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App