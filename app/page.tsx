"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  CheckCircle,
  ChevronRight,
  Clock,
  FileText,
  Mic,
  PieChart,
  TrendingUp,
  Users,
  Lightbulb,
  BarChartIcon as ChartBar,
  Headphones,
  LogOut,
} from "lucide-react"
import { LoginModal } from "@/components/login-modal"
import { SignUpModal } from "@/components/signup-modal"
import { useAuth } from "@/contexts/auth-context"

export default function Home() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [signUpModalOpen, setSignUpModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Ensure we only render client-side components after mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Enhanced logout handler
  const handleLogout = () => {
    logout()
    // No need to redirect since we're already on the homepage
  }

  // If not mounted yet, render a placeholder to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Mic className="h-5 w-5 text-primary" />
            <span>ClosePulse</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button variant="ghost" onClick={() => router.push("/dashboard")} className="hidden md:flex">
                  Dashboard
                </Button>
                <Button variant="outline" onClick={handleLogout} className="hidden md:flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => setLoginModalOpen(true)} className="hidden md:flex">
                  Login
                </Button>
                <Button className="btn-scale" onClick={() => setSignUpModalOpen(true)}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Enhanced Background */}
        <section className="relative py-20 md:py-28 bg-hero-gradient overflow-hidden bg-wave-pattern">
          <div className="container relative flex flex-col items-center text-center">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block animate-float">
              <div className="relative w-64 h-64">
                <div className="absolute w-full h-full rounded-full bg-blue-light opacity-20 animate-pulse-slow"></div>
                <Mic className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 text-primary opacity-80" />
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 200 200">
                  <path
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                    fill="none"
                    stroke="#00C4B4"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.5"
                  ></path>
                </svg>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl animate-fade-in">
              <span className="headline-underline">Boost</span> Your Sales with AI-Powered Call Insights
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl animate-fade-in delay-200">
              Record, analyze, and optimize your calls to{" "}
              <span className="text-primary font-medium">close more deals</span>
            </p>
            <Button
              size="lg"
              className="mt-10 btn-scale animate-fade-in delay-300"
              onClick={() => (user ? router.push("/dashboard") : setSignUpModalOpen(true))}
            >
              Get Started Now
            </Button>
            <div className="mt-12 flex items-center justify-center gap-2 animate-fade-in delay-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Avatar key={i} className="border-2 border-white h-8 w-8">
                    <AvatarFallback>{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">Join 50+ sales teams</span>
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              See Your Sales Performance <span className="headline-underline">at a Glance</span>
            </h2>
            <div className="grid md:grid-cols-4 gap-6 mb-10">
              <Card className="shadow-card animate-fade-in">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Calls</p>
                      <p className="text-3xl font-bold">10</p>
                    </div>
                    <FileText className="h-8 w-8 text-teal opacity-80" />
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card animate-fade-in delay-100">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Win Rate</p>
                      <p className="text-3xl font-bold text-teal">60%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-teal opacity-80" />
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card animate-fade-in delay-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Patterns Found</p>
                      <p className="text-3xl font-bold">3</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-teal opacity-80" />
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card animate-fade-in delay-300">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg. Call Length</p>
                      <p className="text-3xl font-bold">24m</p>
                    </div>
                    <Clock className="h-8 w-8 text-teal opacity-80" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden animate-slide-in-right">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Latest Calls</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Date</th>
                        <th className="text-left py-3 px-4 font-medium">Client</th>
                        <th className="text-left py-3 px-4 font-medium">Outcome</th>
                        <th className="text-left py-3 px-4 font-medium">Key Insight</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">Mar 24, 2025</td>
                        <td className="py-3 px-4">Acme Corp</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Won</Badge>
                        </td>
                        <td className="py-3 px-4">Strong value proposition</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Mar 23, 2025</td>
                        <td className="py-3 px-4">XYZ Inc</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Lost</Badge>
                        </td>
                        <td className="py-3 px-4">Price objection unresolved</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Mar 22, 2025</td>
                        <td className="py-3 px-4">Global Tech</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Won</Badge>
                        </td>
                        <td className="py-3 px-4">Effective discovery questions</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted Brands Section */}
        <section className="py-12 bg-slate-100">
          <div className="container">
            <p className="text-center text-muted-foreground mb-8">Trusted by sales teams worldwide</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-24 bg-slate-200 rounded opacity-50"></div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section with Enhanced Background */}
        <section id="features" className="py-16 md:py-24 bg-features-texture">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-16">
              Key Features to <span className="headline-underline">Win More Deals</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-pink-card border-pink-100 shadow-card card-hover animate-fade-in">
                <CardHeader>
                  <div className="bg-white p-3 rounded-full w-fit mb-4 shadow-sm">
                    <Headphones className="h-8 w-8 text-teal" />
                  </div>
                  <CardTitle>Call Recording</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Capture every call effortlessly with our automatic recording system. Never miss a crucial detail
                    again.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Automatic transcription</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Searchable archives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Secure storage</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-blue-card border-blue-100 shadow-card card-hover animate-fade-in delay-200">
                <CardHeader>
                  <div className="bg-white p-3 rounded-full w-fit mb-4 shadow-sm">
                    <Lightbulb className="h-8 w-8 text-teal" />
                  </div>
                  <CardTitle>Per-Call Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Get detailed analysis of each call with strengths and weaknesses highlighted for immediate action.
                  </p>
                  <div className="mt-4 p-3 bg-white rounded-lg border border-blue-100">
                    <p className="font-medium mb-2">Call Analysis:</p>
                    <p className="text-sm mb-1">
                      <span className="text-green-600 font-medium">Strengths:</span> Customer interest, solution fit
                    </p>
                    <p className="text-sm">
                      <span className="text-red-600 font-medium">Weaknesses:</span> Price objection, timeline concerns
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-card border-green-100 shadow-card card-hover animate-fade-in delay-400">
                <CardHeader>
                  <div className="bg-white p-3 rounded-full w-fit mb-4 shadow-sm">
                    <ChartBar className="h-8 w-8 text-teal" />
                  </div>
                  <CardTitle>Patterns & Why</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Discover winning patterns across calls and understand why deals close or fall through.
                  </p>
                  <div className="mt-4 p-3 bg-white rounded-lg border border-green-100">
                    <p className="font-medium mb-2">Pattern Detected:</p>
                    <p className="text-sm">
                      <span className="text-teal font-medium">80%</span> of won deals mention "discount" in the final
                      call
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-16 text-center">
              <Button
                size="lg"
                className="btn-scale"
                onClick={() => (user ? router.push("/dashboard") : setSignUpModalOpen(true))}
              >
                Get Started Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section with Diagonal Split */}
        <section className="py-16 md:py-24 bg-diagonal-split relative">
          <div className="floating-circle top-1/4 right-1/4 animate-float"></div>
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  <span className="headline-underline">Save Time</span>, Close More
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Stop guessing why deals close or fall through. ClosePulse gives you actionable insights to fuel your
                  sales strategy.
                </p>
                <div className="bg-white p-6 rounded-xl border shadow-card mb-8 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <PieChart className="h-6 w-6 text-teal" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Why it closed:</h4>
                      <p className="text-gray-600">
                        Positive tone throughout call + effective handling of budget objection
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="btn-scale relative z-10"
                  onClick={() => (user ? router.push("/dashboard") : setSignUpModalOpen(true))}
                >
                  Fuel Your Sales Today
                </Button>
              </div>
              <div className="bg-white p-8 rounded-xl border shadow-card relative z-10 animate-slide-in-right">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">30% Higher Close Rate</h4>
                      <p className="text-sm text-gray-600">Teams using ClosePulse see results in weeks</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">5 Hours Saved Weekly</h4>
                      <p className="text-sm text-gray-600">Automated insights mean less manual review</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Faster Onboarding</h4>
                      <p className="text-sm text-gray-600">New reps learn from top performers' calls</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Purpose Section */}
        <section className="py-16 md:py-24 relative">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-white p-6 rounded-xl border shadow-card order-2 md:order-1 animate-fade-in">
                <h3 className="font-semibold mb-4">Win vs. Loss Keywords</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Value</span>
                      <span className="text-sm text-green-600">+78%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">ROI</span>
                      <span className="text-sm text-green-600">+65%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Price</span>
                      <span className="text-sm text-red-600">-42%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: "42%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Competitor</span>
                      <span className="text-sm text-red-600">-38%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: "38%" }}></div>
                    </div>
                  </div>
                </div>

                {/* Dotted line connecting to the headline */}
                <svg className="absolute top-1/2 right-0 h-20 w-20 hidden md:block" viewBox="0 0 100 100">
                  <path d="M 0, 50 L 100, 50" stroke="#007BFF" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold mb-6">
                  Built for <span className="headline-underline">B2B Sales Teams</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Perfect for agencies, freelancers, and in-house teams looking to optimize their sales process and
                  close more deals.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-teal shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Sales Representatives</p>
                      <p className="text-gray-600">Learn from your calls and improve with every conversation</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-teal shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Sales Managers</p>
                      <p className="text-gray-600">Coach your team based on data, not hunches</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-teal shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Business Owners</p>
                      <p className="text-gray-600">Understand what's working in your sales process</p>
                    </div>
                  </li>
                </ul>
                <Button
                  size="lg"
                  className="btn-scale"
                  onClick={() => (user ? router.push("/dashboard") : setSignUpModalOpen(true))}
                >
                  Start Your Free Trial
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">ClosePulse</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-teal">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-teal">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-teal">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-teal">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal">
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">© 2025 ClosePulse. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-600 hover:text-teal transition-colors">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal transition-colors">
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {loginModalOpen && (
        <LoginModal
          isOpen={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          onOpenSignUp={() => {
            setLoginModalOpen(false)
            setSignUpModalOpen(true)
          }}
        />
      )}

      {/* Sign Up Modal */}
      {signUpModalOpen && (
        <SignUpModal
          isOpen={signUpModalOpen}
          onClose={() => setSignUpModalOpen(false)}
          onOpenLogin={() => {
            setSignUpModalOpen(false)
            setLoginModalOpen(true)
          }}
        />
      )}
    </div>
  )
}

