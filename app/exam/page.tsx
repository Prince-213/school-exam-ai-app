"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Camera, Clock, User } from "lucide-react";
import { useRouter } from "next/navigation";

import * as faceapi from "face-api.js";

const labels = ["CS202101", "CS202102", "CS202103"];

async function getLabeledFaceDescriptions() {
  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`/labels/${label}/${i}.jpg`);
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        if (detections && detections.descriptor) {
          descriptions.push(detections.descriptor);
        }
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}

const questions = [
  {
    id: 1,
    question: "What is the capital of Nigeria?",
    options: ["Lagos", "Abuja", "Kano", "Port Harcourt"],
    correct: "Abuja",
  },
  {
    id: 2,
    question: "Which of the following is a programming language?",
    options: ["HTML", "CSS", "JavaScript", "All of the above"],
    correct: "All of the above",
  },
  {
    id: 3,
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Central Personal Unit",
      "Computer Processing Unit",
    ],
    correct: "Central Processing Unit",
  },
];

export default function ExamPage() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [warnings, setWarnings] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [lastDetection, setLastDetection] = useState(Date.now());
  const [showWarning, setShowWarning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [firstDetected, setFirstDetected] = useState(false);

  const router = useRouter();

  const [detectionInfo, setDetectionInfo] = useState({
    label: "",
    confidence: 0,
  });

  useEffect(() => {
    async function setup() {
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      ]);

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(console.error);
    }
    setup();
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    async function onPlay() {
      const labeledFaceDescriptors = await getLabeledFaceDescriptions();
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const displaySize = { width: 400, height: 400 };
      if (canvas) {
        faceapi.matchDimensions(canvas, displaySize);
      }

      intervalId = setInterval(async () => {
        let detections: faceapi.WithFaceDescriptor<
          faceapi.WithFaceLandmarks<faceapi.WithFaceDetection<{}>>
        >[] = [];
        if (video) {
          detections = await faceapi
            .detectAllFaces(video)
            .withFaceLandmarks()
            .withFaceDescriptors();
        }

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        // Declare results outside the if block so it's accessible below
        const results = resizedDetections.map((d) =>
          faceMatcher.findBestMatch(d.descriptor)
        );

        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }

          results.forEach((result, i) => {
            const box = resizedDetections[i].detection.box;
            const confidence = resizedDetections[i].detection.score;
            const drawBox = new faceapi.draw.DrawBox(box, {
              label: `${result.toString()} (${(confidence * 100).toFixed(2)}%)`,
            });
            drawBox.draw(canvas);

            // Update detection info for the first detected face
            if (i === 0) {
              setDetectionInfo({
                label: result.label,
                confidence: confidence,
              });
            }
          });

          // If no faces detected, clear info
          if (results.length === 0) {
            setDetectionInfo({ label: "", confidence: 0 });
          }
        }
      }, 100);
    }

    if (videoRef.current) {
      videoRef.current.addEventListener("play", onPlay);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("play", onPlay);
      }
      clearInterval(intervalId);
    };
  }, []);

  // Simulate face detection
  /* useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      // Simulate random face detection (80% chance of detection)
      const faceDetected = Math.random() > 0.2;

      if (faceDetected) {
        setLastDetection(Date.now());
      } else {
        const timeSinceLastDetection = Date.now() - lastDetection;

        if (timeSinceLastDetection > 5000) {
          // 5 seconds
          setWarnings((prev) => {
            const newWarnings = prev + 1;
            setShowWarning(true);

            if (newWarnings >= 3) {
              stopCamera();
              router.push("/exam-ended");
              return newWarnings;
            }

            setTimeout(() => setShowWarning(false), 3000);
            setLastDetection(Date.now()); // Reset detection timer after warning
            return newWarnings;
          });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isMonitoring, lastDetection, router,]); */

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    // Track first detection
    if (detectionInfo.label && !firstDetected) {
      setFirstDetected(true);
      console.log("First detection:", detectionInfo.label);
    }

    // If label is empty after first detection, start 10s timer
    if (firstDetected && !detectionInfo.label) {
      timer = setTimeout(() => {
        setWarnings((prev) => prev + 1);
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
      }, 10000);
    }

    // Clear timer if label reappears
    if (detectionInfo.label && timer) {
      clearTimeout(timer);
      timer = null;
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [detectionInfo.label]);

  // Timer countdown

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (warnings == 3) {
      router.push("/exam-ended");
    }
  });

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    const answeredQuestions = Object.keys(answers).length;
    if (answeredQuestions < questions.length) {
      alert(
        `Please answer all questions. You have answered ${answeredQuestions} out of ${questions.length} questions.`
      );
      return;
    }

    setIsMonitoring(false);
    router.push("/exam-success");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Online Examination</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>Student ID: 2021/CS/001</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="font-mono text-lg">
                  {formatTime(timeLeft)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm">Warnings: {warnings}/3</span>
              </div>
            </div>
          </div>
          <Progress value={(1800 - timeLeft) / 18} className="mt-2" />
        </div>

        {/* Warning Alert */}
        {showWarning && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Warning {warnings}/3: You were not detected in the camera. Please
              ensure you remain visible throughout the exam.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between w-full gap-6">
          {/* Questions Section */}
          <div className="w-[68%] space-y-6">
            {questions.map((q, index) => (
              <Card key={q.id}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Question {index + 1} of {questions.length}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-800 font-medium">{q.question}</p>
                    <RadioGroup
                      value={answers[q.id] || ""}
                      onValueChange={(value) => handleAnswerChange(q.id, value)}
                    >
                      {q.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option}
                            id={`q${q.id}-${optionIndex}`}
                          />
                          <Label
                            htmlFor={`q${q.id}-${optionIndex}`}
                            className="cursor-pointer flex-1 p-2 rounded hover:bg-gray-50"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardContent className="pt-6">
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="w-full"
                  disabled={Object.keys(answers).length < questions.length}
                >
                  Submit Exam ({Object.keys(answers).length}/{questions.length}{" "}
                  answered)
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Video Monitoring Section */}
          <div className="space-y-4 w-[40%]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Live Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div
                    style={{ position: "relative", width: 400, height: 400 }}
                  >
                    {/* <h1
                      style={{
                        position: "absolute",
                        zIndex: 2,
                        color: "red",
                        background: "rgba(255,255,255,0.7)",
                        padding: "8px",
                      }}
                    >
                      {detectionInfo.label
                        ? `Label: ${detectionInfo.label}, Confidence: ${(
                            detectionInfo.confidence * 100
                          ).toFixed(2)}%`
                        : "No face detected"}
                    </h1> */}
                    <video
                      ref={videoRef}
                      width="400"
                      height="400"
                      autoPlay
                      style={{ position: "absolute" }}
                    />
                    <canvas
                      ref={canvasRef}
                      width="400"
                      height="400"
                      style={{ position: "absolute" }}
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-700">
                      <strong>Monitoring Rules:</strong>
                      <br />• Stay visible in the camera
                      <br />• No external assistance
                      <br />• 3 warnings = exam termination
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
