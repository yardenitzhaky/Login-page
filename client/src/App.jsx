import React from 'react'
import Card from './components/shared/Card'
import WelcomePanel from './components/auth/WelcomePanel'
import LoginForm from './components/auth/LoginForm'

function App() {
  return (
    <div className="bg-[#5B5FED] text-[#333333] h-screen w-screen flex items-center justify-center">
      <Card>
        <div className="flex" style={{ width: '1000px', height: '500px' }}>
          <div className="w-3/5">
            <WelcomePanel />
          </div>
          <div className="w-2/5 p-6 flex flex-col justify-center">
            <LoginForm />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default App