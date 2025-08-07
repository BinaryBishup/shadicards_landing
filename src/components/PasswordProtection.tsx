'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'

interface PasswordProtectionProps {
  correctPassword: string
  brideName: string
  groomName: string
  children: React.ReactNode
}

export default function PasswordProtection({ 
  correctPassword, 
  brideName, 
  groomName,
  children 
}: PasswordProtectionProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === correctPassword) {
      setIsUnlocked(true)
      setError(false)
    } else {
      setError(true)
      setPassword('')
    }
  }

  if (isUnlocked) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Lock Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-dancing text-center text-gray-800 mb-2">
            {brideName} & {groomName}'s Wedding
          </h1>
          <p className="text-center text-gray-600 mb-8">
            This wedding website is password protected
          </p>

          {/* Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  error ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Enter the wedding password"
                required
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">
                  Incorrect password. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-shadow"
            >
              View Wedding Website
            </button>
          </form>

          {/* Help Text */}
          <p className="text-center text-sm text-gray-500 mt-6">
            If you don't have the password, please contact the couple.
          </p>
        </div>
      </div>
    </div>
  )
}