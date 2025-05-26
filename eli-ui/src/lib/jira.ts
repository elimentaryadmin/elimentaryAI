import axios from "axios";
import { API_CONFIG } from "@/config/api";

interface JiraTicketFields {
  project: {
    key: string;
  };
  summary: string;
  description: string;
  issuetype: {
    name: string;
  };
  assignee?: {
    name: string;
  };
  labels?: string[];
  priority?: {
    name: string;
  };
  status?: {
    name: string;
  };
}

interface CreateJiraTicketParams {
  summary: string;
  description: string;
  issueType?: string;
  assignee?: string;
  labels?: string[];
  projectKey?: string;
  priority?: string;
  status?: string;
  includeDetails?: boolean;
}

interface ApiResponse<T = any> {
  success: boolean;
  error?: string;
  data?: T;
}

// Map issue types to their JIRA IDs
const ISSUE_TYPE_MAP: { [key: string]: string } = {
  'Task': '10001',
  'Bug': '10002',
  'Story': '10003',
  'Epic': '10004'
};

export async function createJiraTicket({
  summary,
  description,
  issueType = "Task",
  assignee = "",
  labels = ["Underwriting", "Policy"],
  projectKey = "MAQ",
  priority = "High",
  status = "Open",
  includeDetails = true
}: CreateJiraTicketParams): Promise<ApiResponse> {
  try {
    console.log('Creating JIRA ticket with params:', {
      summary,
      description,
      issueType,
      assignee,
      labels,
      projectKey,
      priority,
      status,
      includeDetails
    });

    // Convert labels to proper case
    const formattedLabels = labels.map(label => 
      label.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ')
    );

    console.log('Formatted labels:', formattedLabels);

    // Create the request body exactly as JIRA expects it
    const jiraRequest: { fields: JiraTicketFields } = {
      fields: {
        project: {
          key: projectKey
        },
        summary: summary,
        description: description,
        issuetype: {
          name: issueType
        }
      }
    };

    // Only add optional fields if they have values
    if (formattedLabels.length > 0) {
      jiraRequest.fields.labels = formattedLabels;
    }
    if (assignee) {
      jiraRequest.fields.assignee = { name: assignee };
    }
    if (priority) {
      jiraRequest.fields.priority = { name: priority };
    }
    if (status) {
      jiraRequest.fields.status = { name: status };
    }

    console.log('Final JIRA request payload:', JSON.stringify(jiraRequest, null, 2));

    const response = await axios.post(
      `${API_CONFIG.JIRA_API.BASE_URL}/createIssue`,
      jiraRequest,
      {
        headers: API_CONFIG.JIRA_API.HEADERS
      }
    );

    console.log('JIRA API response:', JSON.stringify(response.data, null, 2));

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error creating JIRA ticket:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('JIRA API error response:', error.response.data);
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create JIRA ticket",
    };
  }
}

export async function getJiraTickets(projectKey: string = 'MAQ'): Promise<ApiResponse> {
  try {
    const response = await axios.get(
      `${API_CONFIG.JIRA_API.BASE_URL}${API_CONFIG.JIRA_API.ENDPOINTS.GET_ISSUES_BY_PROJECT}?projectKey=${projectKey}`,
      {
        headers: API_CONFIG.JIRA_API.HEADERS
      }
    );

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching JIRA tickets:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch JIRA tickets'
    };
  }
} 