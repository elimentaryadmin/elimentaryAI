import { Metadata } from 'next';
import { GlobalConfigProvider } from '@/components/GlobalConfigProvider';
import { PostHogProvider } from '@/components/PostHogProvider';
import { ApolloProvider } from '@/components/ApolloProvider';
import { SpinConfig } from '@/components/SpinConfig';
import { AuthProvider } from '@/components/AuthProvider';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';

require('../styles/index.less');

export const metadata: Metadata = {
  title: 'Elimentary AI',
  description: 'Elimentary AI Platform',
  icons: {
    icon: '/public/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <AuthProvider>
            <GlobalConfigProvider>
              <ApolloProvider>
                <PostHogProvider>
                  <SpinConfig />
                  <main className="elimentary-app">
                    {children}
                  </main>
                </PostHogProvider>
              </ApolloProvider>
            </GlobalConfigProvider>
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
