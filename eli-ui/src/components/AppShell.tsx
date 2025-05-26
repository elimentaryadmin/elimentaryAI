'use client';

import { Layout } from 'antd';
import clsx from 'clsx';

const { Content } = Layout;

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Layout className="adm-layout bg-white">
      <Content className="adm-content">{children}</Content>
    </Layout>
  );
} 