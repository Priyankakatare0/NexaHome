import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth()

  // If still loading authentication status, show nothing
  if (isLoading) {
    return null
  }

  // If user is not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // User is authenticated, show protected content
  return children
}

export default ProtectedRoute