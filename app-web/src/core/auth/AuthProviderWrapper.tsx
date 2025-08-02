'use client';

import { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';

interface AuthProviderWrapperProps {
  children: ReactNode;
  authConfig: any;
}

export function AuthProviderWrapper({ children, authConfig }: AuthProviderWrapperProps) {
  return (
    <AuthProvider authConfig={authConfig}>
      {children}
    </AuthProvider>
  );
} 