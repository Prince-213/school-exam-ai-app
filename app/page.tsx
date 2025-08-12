"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, Shield, Video, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">EduExam Pro</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Secure online examination platform with advanced proctoring
            technology
          </p>
        </header>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <CardTitle>Secure Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Face recognition technology ensures only authorized students can
                access exams
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Video className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle>Live Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Real-time video monitoring ensures exam integrity throughout the
                session
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <CardTitle>Instant Results</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get immediate feedback and results upon exam completion
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Main CTA */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              Ready to Start Your Exam?
            </CardTitle>
            <CardDescription>
              Please ensure you have a stable internet connection and a working
              webcam before proceeding
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  Important Instructions:
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Ensure good lighting for face recognition</li>
                  <li>• Stay visible in the camera throughout the exam</li>
                  <li>• You have 3 warnings before exam termination</li>
                  <li>• No external assistance is allowed</li>
                </ul>
              </div>
              <Button
                size="lg"
                className="w-full max-w-md"
                onClick={() => router.push("/auth")}
              >
                Start Exam
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
