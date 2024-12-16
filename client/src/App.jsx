import React, { useState } from 'react'
import Card from './components/shared/Card'
import WelcomePanel from './components/auth/WelcomePanel'
import LoginForm from './components/auth/LoginForm'
import LoginSuccess from './components/auth/LoginSuccess'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLoginSuccess = (user) => {
    if (user && user.username) {
      setLoggedInUser(user);
    }
  };

  const handleBack = () => {
    setLoggedInUser(null);
  };

  return (
    <div className="bg-[#5B5FED] text-[#333333] h-screen w-screen flex items-center justify-center">
      <Card>
        <div className="flex" style={{ width: '1000px' }}>
          <div className="w-3/5">
            <WelcomePanel />
          </div>
          <div className="w-2/5 p-6 flex flex-col justify-center overflow-auto">
            {loggedInUser ? (
              <LoginSuccess 
                username={loggedInUser.username} 
                onBack={handleBack}
              />
            ) : (
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            )}
            <ToastContainer 
              position='top-right'
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default App