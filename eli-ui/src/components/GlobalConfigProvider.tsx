'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { getUserConfig, UserConfig } from '@/utils/env';
import { trackUserTelemetry } from '@/utils/telemetry';

type ContextProps = {
  config?: UserConfig | null;
};

const GlobalConfigContext = createContext<ContextProps>({});

export function GlobalConfigProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [config, setConfig] = useState<UserConfig | null>(null);

  useEffect(() => {
    getUserConfig()
      .then((config) => {
        setConfig(config);
        // telemetry setup
        const cleanup = trackUserTelemetry(router, config);
        return cleanup;
      })
      .catch((error) => {
        console.error('Failed to get user config', error);
      });
  }, [router]);

  const value = {
    config,
  };

  return (
    <GlobalConfigContext.Provider value={value}>
      {children}
    </GlobalConfigContext.Provider>
  );
}

export function useGlobalConfig() {
  return useContext(GlobalConfigContext);
} 