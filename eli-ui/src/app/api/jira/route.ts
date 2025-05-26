import { NextResponse } from 'next/server'
import axios from 'axios'
import { API_CONFIG } from '@/config/api'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const projectKey = searchParams.get('projectKey')

    if (!projectKey) {
      return NextResponse.json(
        { error: 'Project key is required' },
        { status: 400 }
      )
    }

    const response = await axios.get(
      `${API_CONFIG.JIRA_API.BASE_URL}${API_CONFIG.JIRA_API.ENDPOINTS.GET_ISSUES_BY_PROJECT}?projectKey=${projectKey}`,
      {
        headers: API_CONFIG.JIRA_API.HEADERS
      }
    )

    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error in JIRA proxy:', error)
    if (axios.isAxiosError(error) && error.response) {
      console.error('JIRA API error response:', error.response.data)
    }
    return NextResponse.json(
      { error: 'Failed to fetch JIRA tickets' },
      { status: 500 }
    )
  }
} 