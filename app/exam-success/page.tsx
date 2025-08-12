"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, Home } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ExamSuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-3xl text-green-800">Exam Completed Successfully!</CardTitle>
          <CardDescription className="text-lg">Your exam has been submitted and is being processed</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-white rounded-lg border p-6 space-y-4">
            <h3 className="font-semibold text-lg mb-4">Exam Summary</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Questions Answered</p>
                  <p className="text-sm text-gray-600">3 out of 3</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">Time Taken</p>
                  <p className="text-sm text-gray-600">25 minutes</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Submission Status</p>
                  <p className="text-sm text-gray-600">Successfully submitted</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">Exam ID</p>
                  <p className="text-sm text-gray-600">EX-2024-001</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">What happens next?</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Your answers are being reviewed by the system</li>
              <li>• Results will be available within 24 hours</li>
              <li>• You will receive an email notification when results are ready</li>
              <li>• Check your student portal for detailed feedback</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-800">Exam Integrity Maintained</h4>
                <p className="text-sm text-green-700 mt-1">
                  Your exam was completed without any violations. No warnings were issued during the monitoring process.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => router.push("/")} className="flex-1">
              <Home className="h-4 w-4 mr-2" />
              Return to Home
            </Button>
            <Button variant="outline" onClick={() => window.print()} className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Print Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
