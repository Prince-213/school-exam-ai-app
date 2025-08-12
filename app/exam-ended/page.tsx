"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle, AlertTriangle, FileText, Home, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ExamEndedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-3xl text-red-800">Exam Terminated</CardTitle>
          <CardDescription className="text-lg">
            Your exam was ended because you did not cooperate with the rules and regulations
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-white rounded-lg border border-red-200 p-6 space-y-4">
            <h3 className="font-semibold text-lg mb-4 text-red-800">Violation Summary</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium text-red-800">Maximum Warnings Exceeded</p>
                  <p className="text-sm text-red-600">You received 3 warnings for not being visible in the camera</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium text-red-800">Monitoring Violation</p>
                  <p className="text-sm text-red-600">Failed to maintain continuous presence during examination</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">Rules That Were Violated:</h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Students must remain visible in the camera throughout the exam</li>
              <li>• Maximum of 3 warnings are allowed before termination</li>
              <li>• Continuous monitoring is required for exam integrity</li>
              <li>• No external assistance or unauthorized behavior is permitted</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">What happens now?</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• This incident has been recorded in your academic record</li>
              <li>• You may need to contact your instructor for next steps</li>
              <li>• A makeup exam may be scheduled at the discretion of your instructor</li>
              <li>• Review the exam guidelines before attempting again</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800">Incident Report</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Incident ID: INC-2024-001 | Time: {new Date().toLocaleString()}
                </p>
                <p className="text-sm text-blue-700">
                  Reason: Exceeded maximum warnings (3/3) for camera visibility violations
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => router.push("/")} className="flex-1" variant="outline">
              <Home className="h-4 w-4 mr-2" />
              Return to Home
            </Button>
            <Button onClick={() => router.push("/auth")} className="flex-1">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              For questions about this incident, please contact your instructor or the examination office.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
