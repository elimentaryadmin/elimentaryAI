// src/app/AntdSpinSetup.tsx
'use client';

import { Spin } from 'antd';
import { defaultIndicator } from '@/components/PageLoading';

Spin.setDefaultIndicator(defaultIndicator);

export default function AntdSpinSetup() {
  return null;
}