import React from 'react'
import Card from './components/shared/Card'
import WelcomePanel from './components/auth/WelcomePanel'
import LoginForm from './components/auth/Loginform'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  return (
    <div className="bg-[#5B5FED] text-[#333333] h-screen w-screen flex items-center justify-center">
      <Card>
        <div className="flex" style={{ width: '1000px' }}>
          <div className="w-3/5">
            <WelcomePanel />
          </div>
          <div className="w-2/5 p-6 flex flex-col justify-center overflow-auto">
            <LoginForm />
            <ToastContainer position='top-right'/>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default App