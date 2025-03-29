"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Search, Clock, Calendar, Phone, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/contexts/auth-context"

// Sample data for the dashboard
const sampleCalls = [
  {
    id: 1,
    date: "2023-05-15",
    time: "10:30 AM",
    duration: "32:45",
    customer: "Acme Corp",
    agent: "John Smith",
    sentiment: "Positive",
    outcome: "Won",
    topics: ["pricing", "features", "support"],
    transcript:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
    strengths: ["Clear value proposition", "Addressed objections well", "Strong rapport"],
    weaknesses: ["Could improve feature explanation"],
    why: "Won due to competitive pricing and strong relationship",
  },
  {
    id: 2,
    date: "2023-05-14",
    time: "2:15 PM",
    duration: "45:12",
    customer: "TechStart Inc",
    agent: "Sarah Johnson",
    sentiment: "Neutral",
    outcome: "Pending",
    topics: ["integration", "timeline", "pricing"],
    transcript:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
    strengths: ["Technical knowledge", "Detailed timeline"],
    weaknesses: ["Pricing discussion was unclear", "Missed follow-up opportunity"],
    why: "Pending decision due to internal customer review",
  },
  {
    id: 3,
    date: "2023-05-13",
    time: "11:00 AM",
    duration: "28:33",
    customer: "Global Solutions",
    agent: "Mike Wilson",
    sentiment: "Negative",
    outcome: "Lost",
    topics: ["budget", "competitors", "timeline"],
    transcript:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
    strengths: ["Product knowledge"],
    weaknesses: ["Defensive tone", "Failed to address budget concerns", "No clear value proposition"],
    why: "Lost due to budget constraints and better competitor offer",
  },
  {
    id: 4,
    date: "2023-05-12",
    time: "3:45 PM",
    duration: "52:18",
    customer: "Innovate LLC",
    agent: "Emily Chen",
    sentiment: "Positive",
    outcome: "Won",
    topics: ["features", "support", "implementation"],
    transcript:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
    strengths: ["Excellent needs analysis", "Clear implementation plan", "Strong closing"],
    weaknesses: ["Could improve technical explanation"],
    why: "Won due to comprehensive support package and implementation timeline",
  },
  {
    id: 5,
    date: "2023-05-11",
    time: "9:15 AM",
    duration: "38:42",
    customer: "First Finance",
    agent: "Robert Taylor",
    sentiment: "Neutral",
    outcome: "Pending",
    topics: ["security", "compliance", "pricing"],
    transcript:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
    strengths: ["Security knowledge", "Compliance expertise"],
    weaknesses: ["Pricing discussion was rushed", "No clear next steps"],
    why: "Pending decision due to compliance review",
  },
]

// Sample patterns for the dashboard
const samplePatterns = [
  {
    id: 1,
    title: "Success Factors",
    description: "Common elements in successful calls",
    items: [
      { text: "80% of successful calls mention 'ROI'", percentage: 80 },
      { text: "75% of won deals include a product demo", percentage: 75 },
      { text: "90% of successful calls address objections directly", percentage: 90 },
    ],
  },
  {
    id: 2,
    title: "Common Objections",
    description: "Frequently encountered customer concerns",
    items: [
      { text: "Budget constraints (65% of calls)", percentage: 65 },
      { text: "Implementation timeline (45% of calls)", percentage: 45 },
      { text: "Integration with existing systems (40% of calls)", percentage: 40 },
    ],
  },
  {
    id: 3,
    title: "Improvement Areas",
    description: "Opportunities for sales team enhancement",
    items: [
      { text: "55% of calls lack clear next steps", percentage: 55 },
      { text: "40% of calls have insufficient competitor differentiation", percentage: 40 },
      { text: "35% of calls miss upsell opportunities", percentage: 35 },
    ],
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()
  const [selectedCall, setSelectedCall] = useState<any>(sampleCalls[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCalls, setFilteredCalls] = useState(sampleCalls)
  const [mounted, setMounted] = useState(false)

  // Ensure we only render client-side components after mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Check if user is logged in after component is mounted
    if (mounted && !isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router, mounted])

  useEffect(() => {
    // Filter calls based on search term
    if (searchTerm) {
      const filtered = sampleCalls.filter(
        (call) =>
          call.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          call.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
          call.topics.some((topic) => topic.toLowerCase().includes(searchTerm.toLowerCase())),
      )
      setFilteredCalls(filtered)
    } else {
      setFilteredCalls(sampleCalls)
    }
  }, [searchTerm])

  // Enhanced logout handler with redirection
  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Function to determine progress bar color based on percentage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500"
    if (percentage >= 51) return "bg-yellow-500"
    return "bg-red-500"
  }

  // If not mounted yet or loading, render a loading state
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // If not logged in, don't render anything (will redirect in useEffect)
  if (!user) {
    return null
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "bg-green-100 text-green-800"
      case "negative":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome.toLowerCase()) {
      case "won":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "lost":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  }

  return (
    <div className="min-h-screen bg-white font-roboto">
      {/* Header */}
      <header className="border-b border-[#E0E0E0] bg-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-[#007BFF]">ClosePulse</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm">Welcome, {user.name}</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Sales Call Analysis</h1>
          <p className="text-gray-600">Review and analyze your sales call performance</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Call List (60% width) */}
          <div className="lg:w-3/5">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Call List</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search calls..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <CardDescription>Recent sales calls and their outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Agent</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Sentiment</TableHead>
                      <TableHead>Outcome</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCalls.map((call) => (
                      <TableRow
                        key={call.id}
                        className={`cursor-pointer ${selectedCall.id === call.id ? "bg-blue-50" : ""}`}
                        onClick={() => setSelectedCall(call)}
                      >
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            {call.date}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {call.time}
                          </div>
                        </TableCell>
                        <TableCell>{call.customer}</TableCell>
                        <TableCell>{call.agent}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1 text-gray-400" />
                            {call.duration}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getSentimentColor(call.sentiment)}>
                            {call.sentiment}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getOutcomeIcon(call.outcome)}
                            <span className="ml-1">{call.outcome}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Call Details (40% width) */}
          <div className="lg:w-2/5">
            <Card>
              <CardHeader>
                <CardTitle>Call Details</CardTitle>
                <CardDescription>
                  {selectedCall.customer} - {selectedCall.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="summary">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="transcript">Transcript</TabsTrigger>
                    <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  </TabsList>
                  <TabsContent value="summary" className="space-y-4 pt-4">
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-2">Call Information</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Customer:</span> {selectedCall.customer}
                        </div>
                        <div>
                          <span className="text-gray-500">Agent:</span> {selectedCall.agent}
                        </div>
                        <div>
                          <span className="text-gray-500">Date:</span> {selectedCall.date}
                        </div>
                        <div>
                          <span className="text-gray-500">Time:</span> {selectedCall.time}
                        </div>
                        <div>
                          <span className="text-gray-500">Duration:</span> {selectedCall.duration}
                        </div>
                        <div>
                          <span className="text-gray-500">Outcome:</span> {selectedCall.outcome}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-2">Topics Discussed</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCall.topics.map((topic: string, index: number) => (
                          <Badge key={index} variant="outline" className="bg-blue-50">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-2">Why {selectedCall.outcome}?</h3>
                      <p className="text-sm">{selectedCall.why}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="transcript" className="pt-4">
                    <div className="max-h-[400px] overflow-y-auto p-3 bg-gray-50 rounded-md text-sm">
                      {selectedCall.transcript}
                    </div>
                  </TabsContent>
                  <TabsContent value="analysis" className="space-y-4 pt-4">
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-2">Strengths</h3>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {selectedCall.strengths.map((strength: string, index: number) => (
                          <li key={index} className="text-green-700">
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-2">Areas for Improvement</h3>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {selectedCall.weaknesses.map((weakness: string, index: number) => (
                          <li key={index} className="text-red-700">
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-2">Sentiment Analysis</h3>
                      <Badge className={`${getSentimentColor(selectedCall.sentiment)} text-xs`}>
                        {selectedCall.sentiment}
                      </Badge>
                      <p className="text-sm mt-2">
                        This call had an overall {selectedCall.sentiment.toLowerCase()} sentiment, indicating{" "}
                        {selectedCall.sentiment === "Positive"
                          ? "a favorable customer reaction"
                          : selectedCall.sentiment === "Negative"
                            ? "potential concerns or dissatisfaction"
                            : "a balanced discussion with mixed reactions"}
                        .
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pattern Summary (Full width) with Enhanced Color-Coded Graphs */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pattern Summary</CardTitle>
              <CardDescription>Aggregated insights and trends from your sales calls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {samplePatterns.map((pattern) => (
                  <div key={pattern.id}>
                    <h3 className="font-medium text-lg mb-2">{pattern.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{pattern.description}</p>
                    <div className="space-y-4">
                      {pattern.items.map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{item.text}</span>
                            <span
                              className={`font-medium ${
                                item.percentage >= 80
                                  ? "text-green-600"
                                  : item.percentage >= 51
                                    ? "text-yellow-600"
                                    : "text-red-600"
                              }`}
                            >
                              {item.percentage}%
                            </span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getProgressColor(item.percentage)} rounded-full`}
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

