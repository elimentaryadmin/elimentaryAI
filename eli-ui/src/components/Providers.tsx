'use client';

import { Spin } from 'antd';
import { defaultIndicator } from '@/components/PageLoading';

Spin.setDefaultIndicator(defaultIndicator);

export default function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
} 