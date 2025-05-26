// WARNING: This disables SSL certificate validation which can pose security risks.
// Only use this in development or in environments where you understand the risks.

// This function can be called at the entry point of your application
// to globally disable SSL certificate validation
export function configureSSLVerification(disableSSLVerification = false) {
    if (typeof process !== 'undefined' && disableSSLVerification) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      console.warn(
        'WARNING: SSL certificate validation is disabled. This is insecure and should only be used in development.'
      );
    }
  }
  
  // Alternative approach: Set this environment variable in your .env file
  // NODE_TLS_REJECT_UNAUTHORIZED=0