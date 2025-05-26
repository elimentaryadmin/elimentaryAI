// WARNING: This disables SSL certificate validation which can pose security risks.
// Only use this in development or in environments where you understand the risks.

// Custom fetch function that ignores SSL certificate errors
export async function customFetch(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    // In Node.js environments, we can use the node-fetch or https options
    if (typeof window === 'undefined') {
      // Server-side (Node.js) implementation
      const { Agent } = await import('https');
      
      const httpsAgent = new Agent({
        rejectUnauthorized: false // This is the key option that allows self-signed certificates
      });
      
      // Create a new options object with the agent
      const newOptions = {
        ...options,
        agent: httpsAgent
      };
      
      // Use the native fetch with our custom agent
      return fetch(url, newOptions);
    } else {
      // Client-side (browser) implementation - browsers handle this differently
      // and we can't override certificate validation in the browser
      return fetch(url, options);
    }
  }