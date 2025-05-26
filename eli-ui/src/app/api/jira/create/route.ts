import { NextResponse } from 'next/server'
import axios from 'axios'
import { API_CONFIG } from '@/config/api'

// Map issue types to their JIRA IDs
const ISSUE_TYPE_MAP: { [key: string]: string } = {
  'Task': '10001',
  'Bug': '10002',
  'Story': '10003',
  'Epic': '10004'
};

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('API Route - Received request body:', JSON.stringify(body, null, 2))
    
    // Ensure the request body has the required fields
    if (!body.fields?.project?.key || !body.fields?.summary) {
      console.error('API Route - Missing required fields:', {
        hasProjectKey: !!body.fields?.project?.key,
        hasSummary: !!body.fields?.summary
      });
      return NextResponse.json(
        { error: 'Missing required fields: project key or summary' },
        { status: 400 }
      )
    }

    // Create a clean request body with only the required fields
    const jiraRequest = {
      fields: {
        project: {
          key: body.fields.project.key
        },
        summary: body.fields.summary,
        description: body.fields.description || '',
        issuetype: {
          name: body.fields.issuetype?.name || "Task"
        }
      }
    }

    // Add optional fields if they exist
    if (body.fields.labels?.length > 0) {
      jiraRequest.fields.labels = body.fields.labels
    }
    if (body.fields.assignee?.name) {
      jiraRequest.fields.assignee = { name: body.fields.assignee.name }
    }
    if (body.fields.priority?.name) {
      jiraRequest.fields.priority = { name: body.fields.priority.name }
    }
    if (body.fields.status?.name) {
      jiraRequest.fields.status = { name: body.fields.status.name }
    }

    console.log('API Route - Sending formatted request to JIRA:', JSON.stringify(jiraRequest, null, 2))

    const response = await axios.post(
      `${API_CONFIG.JIRA_API.BASE_URL}/createIssue`,
      jiraRequest,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    console.log('API Route - JIRA API response:', JSON.stringify(response.data, null, 2))

    return NextResponse.json(response.data)
  } catch (error) {
    console.error('API Route - Error in JIRA create proxy:', error)
    if (axios.isAxiosError(error) && error.response) {
      console.error('API Route - JIRA API error response:', error.response.data)
    }
    return NextResponse.json(
      { error: 'Failed to create JIRA ticket' },
      { status: 500 }
    )
  }
} 