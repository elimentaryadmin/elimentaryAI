'use client';

import { AuthProvider as Provider } from '@/contexts/auth-context';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
} 