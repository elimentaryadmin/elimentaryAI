"use client"

import { useState } from "react"
import { FileText, Table, MessageSquare, FileSpreadsheet, FileCode, Check, RefreshCw, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function IntegrationPanel() {
  const [showConnectForm, setShowConnectForm] = useState(false)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect with productivity tools to import and export data</CardDescription>
            </div>
            <Button onClick={() => setShowConnectForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Connect New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="connected">
            <TabsList className="mb-4">
              <TabsTrigger value="connected">Connected</TabsTrigger>
              <TabsTrigger value="available">Available</TabsTrigger>
            </TabsList>

            <TabsContent value="connected">
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {[
                    {
                      name: "Google Docs",
                      icon: FileText,
                      status: "Connected",
                      lastSync: "2 hours ago",
                      description: "Import and export documents",
                    },
                    {
                      name: "Google Sheets",
                      icon: Table,
                      status: "Connected",
                      lastSync: "1 day ago",
                      description: "Import and export spreadsheets",
                    },
                    {
                      name: "Slack",
                      icon: MessageSquare,
                      status: "Connected",
                      lastSync: "3 hours ago",
                      description: "Share insights and notifications",
                    },
                    {
                      name: "Excel Online",
                      icon: FileSpreadsheet,
                      status: "Connected",
                      lastSync: "5 days ago",
                      description: "Import and export Excel files",
                    },
                  ].map((integration, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                              <integration.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">{integration.name}</p>
                              <p className="text-sm text-muted-foreground">{integration.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Check className="h-3 w-3 text-green-500" />
                                {integration.status}
                              </Badge>
                              <p className="text-xs text-muted-foreground">Last sync: {integration.lastSync}</p>
                            </div>
                            <Button variant="outline" size="sm">
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Sync
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="available">
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {[
                    {
                      name: "Notion",
                      icon: FileCode,
                      description: "Import and export from Notion workspaces",
                    },
                    {
                      name: "Confluence",
                      icon: FileText,
                      description: "Connect with Atlassian Confluence",
                    },
                    {
                      name: "Microsoft Teams",
                      icon: MessageSquare,
                      description: "Share insights and collaborate with your team",
                    },
                  ].map((integration, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                              <integration.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">{integration.name}</p>
                              <p className="text-sm text-muted-foreground">{integration.description}</p>
                            </div>
                          </div>
                          <Button>Connect</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {showConnectForm && (
        <Card>
          <CardHeader>
            <CardTitle>Connect Integration</CardTitle>
            <CardDescription>Connect to a productivity tool to import and export data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Integration Type</label>
                <Select defaultValue="google">
                  <SelectTrigger>
                    <SelectValue placeholder="Select integration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google Workspace</SelectItem>
                    <SelectItem value="microsoft">Microsoft 365</SelectItem>
                    <SelectItem value="slack">Slack</SelectItem>
                    <SelectItem value="notion">Notion</SelectItem>
                    <SelectItem value="confluence">Confluence</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Workspace URL</label>
                <Input placeholder="https://workspace.example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Permissions</label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="read" className="flex items-center gap-2">
                      <span>Read access</span>
                      <Badge variant="outline">Required</Badge>
                    </Label>
                    <Switch id="read" defaultChecked disabled />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="write">Write access</Label>
                    <Switch id="write" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="share">Sharing permissions</Label>
                    <Switch id="share" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowConnectForm(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowConnectForm(false)}>Connect</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

