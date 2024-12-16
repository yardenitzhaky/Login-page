import React from 'react'

export default function Card({ children }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {children}
    </div>
  )
}