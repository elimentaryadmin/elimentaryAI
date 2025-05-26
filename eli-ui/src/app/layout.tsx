import "@/styles/globals.css";
import "../styles/index.less";
import StyledComponentsRegistry from './registry';
import Providers from '@/components/Providers';
import AppShell from '@/components/AppShell';
import { ReactNode } from 'react';
import { GlobalConfigProvider } from '@/hooks/useGlobalConfig';
import ApolloProviderClient from '@/components/ApolloProviderClient';
import { PostHogProvider } from 'posthog-js/react';
import posthog from 'posthog-js';
import AntdSpinSetup from './AntdSpinSetup';

export const metadata = {
  title: 'Elimentary AI',
  description: 'ElimentaryAI Application',
  icons: {
    icon: '/public/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen">
        <AntdSpinSetup />
        <GlobalConfigProvider>
          <ApolloProviderClient>
            {/* <PostHogProvider client={posthog}> */}
              <main className="app min-h-screen">
                <StyledComponentsRegistry>
                  <Providers>
                    <AppShell>
                      {children}
                    </AppShell>
                  </Providers>
                </StyledComponentsRegistry>
              </main>
             {/* </PostHogProvider> */}
          </ApolloProviderClient>
        </GlobalConfigProvider>
      </body>
    </html>
  );
} 