interface ErrorMapping {
  code: string;
  message: string;
  action?: string;
}

const ERROR_MAPPINGS: Record<string, ErrorMapping> = {
  // JIRA API Errors
  "JIRA_API_ERROR": {
    code: "JIRA_API_ERROR",
    message: "Unable to connect to JIRA. Please check your connection and try again.",
    action: "Please ensure you have proper JIRA access and try again."
  },
  "JIRA_AUTH_ERROR": {
    code: "JIRA_AUTH_ERROR",
    message: "Authentication failed. Please check your JIRA credentials.",
    action: "Please verify your JIRA credentials and try again."
  },
  "JIRA_PERMISSION_ERROR": {
    code: "JIRA_PERMISSION_ERROR",
    message: "You don't have permission to create tickets in this project.",
    action: "Please contact your administrator for proper JIRA access."
  },
  "JIRA_VALIDATION_ERROR": {
    code: "JIRA_VALIDATION_ERROR",
    message: "Invalid ticket data. Please check the form and try again.",
    action: "Please review the form fields and ensure all required information is provided."
  },
  "JIRA_RATE_LIMIT": {
    code: "JIRA_RATE_LIMIT",
    message: "Too many requests. Please wait a moment and try again.",
    action: "Please wait a few minutes before trying again."
  },

  // Network Errors
  "NETWORK_ERROR": {
    code: "NETWORK_ERROR",
    message: "Network connection error. Please check your internet connection.",
    action: "Please ensure you have a stable internet connection and try again."
  },
  "TIMEOUT_ERROR": {
    code: "TIMEOUT_ERROR",
    message: "Request timed out. Please try again.",
    action: "Please try again in a few moments."
  },

  // Validation Errors
  "INVALID_SUMMARY": {
    code: "INVALID_SUMMARY",
    message: "Invalid ticket summary.",
    action: "Please provide a valid summary for the ticket."
  },
  "INVALID_DESCRIPTION": {
    code: "INVALID_DESCRIPTION",
    message: "Invalid ticket description.",
    action: "Please provide a valid description for the ticket."
  },
  "INVALID_ASSIGNEE": {
    code: "INVALID_ASSIGNEE",
    message: "Invalid assignee selected.",
    action: "Please select a valid assignee from the list."
  },
  "INVALID_PRIORITY": {
    code: "INVALID_PRIORITY",
    message: "Invalid priority selected.",
    action: "Please select a valid priority from the list."
  },
  "INVALID_TICKET_TYPE": {
    code: "INVALID_TICKET_TYPE",
    message: "Invalid ticket type selected.",
    action: "Please select a valid ticket type from the list."
  },

  // Business Logic Errors
  "NO_LOANS_SELECTED": {
    code: "NO_LOANS_SELECTED",
    message: "No loans selected for review.",
    action: "Please select at least one loan to create a ticket."
  },
  "INVALID_LOAN_DATA": {
    code: "INVALID_LOAN_DATA",
    message: "Invalid loan data provided.",
    action: "Please ensure all loan data is valid and try again."
  },
  "DUPLICATE_TICKET": {
    code: "DUPLICATE_TICKET",
    message: "A similar ticket already exists.",
    action: "Please check existing tickets or modify the current ticket details."
  }
};

export function mapBackendError(error: any): ErrorMapping {
  // If error is already in our mapping format, return it
  if (error?.code && ERROR_MAPPINGS[error.code]) {
    return ERROR_MAPPINGS[error.code];
  }

  // If error is a string, try to match it with our mappings
  if (typeof error === 'string') {
    const mappedError = ERROR_MAPPINGS[error];
    if (mappedError) {
      return mappedError;
    }
  }

  // If error is an Error object, try to extract code from message
  if (error instanceof Error) {
    const errorCode = error.message.split(':')[0]?.trim();
    if (errorCode && ERROR_MAPPINGS[errorCode]) {
      return ERROR_MAPPINGS[errorCode];
    }
  }

  // Default error mapping
  return {
    code: "UNKNOWN_ERROR",
    message: "An unexpected error occurred. Please try again.",
    action: "If the problem persists, please contact support."
  };
}

export function getErrorMessage(error: any): string {
  const mappedError = mapBackendError(error);
  return mappedError.message;
}

export function getErrorAction(error: any): string | undefined {
  const mappedError = mapBackendError(error);
  return mappedError.action;
}

export function getErrorCode(error: any): string {
  const mappedError = mapBackendError(error);
  return mappedError.code;
} 