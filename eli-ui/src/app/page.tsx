'use client';

import { useWithOnboarding } from '@/hooks/useCheckOnboarding';
import PageLoading from '@/components/PageLoading';

export default function Home() {
  const { loading } = useWithOnboarding();

  if (loading) {
    return <PageLoading visible />;
  }

  return null;
} 