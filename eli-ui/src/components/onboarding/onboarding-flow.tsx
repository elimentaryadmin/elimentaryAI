"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth, type UserRole } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Loader2, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"

// Define the onboarding questions
const questions = [
  {
    id: "job_title",
    question: "What is your job title?",
    options: [
      { value: "credit_analyst", label: "Credit Analyst" },
      { value: "risk_officer", label: "Chief Risk Officer" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "responsibilities",
    question: "What are your primary responsibilities?",
    options: [
      { value: "credit_assessment", label: "Assessing credit applications and making recommendations" },
      { value: "risk_management", label: "Overseeing risk management strategies and policies" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "decision_making",
    question: "What level of decision-making authority do you have?",
    options: [
      { value: "recommend", label: "I make recommendations for approval" },
      { value: "approve", label: "I have final approval authority" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "team_size",
    question: "How many people do you manage?",
    options: [
      { value: "none", label: "None" },
      { value: "small_team", label: "1-5 people" },
      { value: "large_team", label: "More than 5 people" },
    ],
  },
  {
    id: "reporting",
    question: "Who do you report to?",
    options: [
      { value: "manager", label: "Team Manager or Department Head" },
      { value: "executive", label: "Executive Leadership (CEO, CFO, etc.)" },
      { value: "other", label: "Other" },
    ],
  },
]

export function OnboardingFlow() {
  const { user, updateUser } = useAuth()
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [determinedRole, setDeterminedRole] = useState<UserRole>(null)

  // If user already started onboarding, resume from their step
  useEffect(() => {
    if (user?.onboardingStep) {
      setCurrentStep(user.onboardingStep)
    }

    // If user already completed onboarding, redirect to dashboard
    if (user?.onboardingStatus === "completed") {
      router.push("/dashboard")
    }
  }, [user, router])

  // Update onboarding status when starting
  useEffect(() => {
    if (user && user.onboardingStatus === "not_started") {
      updateUser({ onboardingStatus: "in_progress", onboardingStep: 0 })
    }
  }, [user, updateUser])

  const handleNext = () => {
    const nextStep = currentStep + 1

    // Update user's onboarding step
    updateUser({ onboardingStep: nextStep })

    if (nextStep < questions.length) {
      setCurrentStep(nextStep)
    } else {
      // Determine role based on answers
      determineUserRole()
    }
  }

  const handlePrevious = () => {
    const prevStep = Math.max(0, currentStep - 1)
    setCurrentStep(prevStep)
    updateUser({ onboardingStep: prevStep })
  }

  const handleAnswerChange = (value: string) => {
    const currentQuestion = questions[currentStep]
    setAnswers({ ...answers, [currentQuestion.id]: value })
  }

  const determineUserRole = () => {
    setIsSubmitting(true)

    // Simple role determination logic
    // In a real app, this could be more sophisticated
    const points = {
      credit_analyst: 0,
      chief_risk_officer: 0,
    }

    // Job title is a strong indicator
    if (answers.job_title === "credit_analyst") points.credit_analyst += 2
    if (answers.job_title === "risk_officer") points.chief_risk_officer += 2

    // Responsibilities
    if (answers.responsibilities === "credit_assessment") points.credit_analyst += 1
    if (answers.responsibilities === "risk_management") points.chief_risk_officer += 1

    // Decision making authority
    if (answers.decision_making === "recommend") points.credit_analyst += 1
    if (answers.decision_making === "approve") points.chief_risk_officer += 1

    // Team size
    if (answers.team_size === "none" || answers.team_size === "small_team") points.credit_analyst += 1
    if (answers.team_size === "large_team") points.chief_risk_officer += 1

    // Reporting structure
    if (answers.reporting === "manager") points.credit_analyst += 1
    if (answers.reporting === "executive") points.chief_risk_officer += 1

    // Determine role based on points
    const role = points.credit_analyst > points.chief_risk_officer ? "credit_analyst" : "chief_risk_officer"

    setDeterminedRole(role)

    // Complete onboarding after a short delay to show the result
    setTimeout(() => {
      updateUser({
        role,
        onboardingStatus: "completed",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    }, 2000)
  }

  // Calculate progress percentage
  const progress = ((currentStep + 1) / (questions.length + 1)) * 100

  // If we're at the results step
  if (currentStep >= questions.length) {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Analyzing Your Responses</CardTitle>
          <CardDescription>We're determining the best experience for you based on your answers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!determinedRole ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-center text-muted-foreground">Analyzing your responses...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {determinedRole === "credit_analyst" ? "You're a Credit Analyst!" : "You're a Chief Risk Officer!"}
              </h3>
              <p className="text-center text-muted-foreground">We've customized your dashboard based on your role.</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Progress value={progress} className="w-full" />
        </CardFooter>
      </Card>
    )
  }

  // Current question
  const currentQuestion = questions[currentStep]
  const currentAnswer = answers[currentQuestion.id] || ""

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Tell us about your role</CardTitle>
        <CardDescription>
          Step {currentStep + 1} of {questions.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <h3 className="text-lg font-medium">{currentQuestion.question}</h3>

        <RadioGroup value={currentAnswer} onValueChange={handleAnswerChange} className="space-y-3">
          {currentQuestion.options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <Progress value={progress} className="w-1/2 mx-4" />

        <Button onClick={handleNext} disabled={!currentAnswer}>
          {currentStep < questions.length - 1 ? (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            "Complete"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

