'use client';

import { Spin } from 'antd';
import { defaultIndicator } from './PageLoading';

export function SpinConfig() {
  Spin.setDefaultIndicator(defaultIndicator);
  return null;
} 