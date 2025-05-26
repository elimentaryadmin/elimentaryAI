'use client';

import { Spin } from 'antd';
import { defaultIndicator } from '@/components/PageLoading';
import { AuthProvider } from '@/contexts/auth-context';

Spin.setDefaultIndicator(defaultIndicator);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
} 