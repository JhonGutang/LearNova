import React from "react";
import { BookOpen, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useRedirectLink } from "@/hooks/useRedirect";
import Image from "next/image";

const HeroSection: React.FC = () => {
  const {redirect} = useRedirectLink()
    return (
        <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-100 via-white to-white" />
    
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
              {/* Left Content */}
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
                {/* Main Heading */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  Learn, Play, and <span className="text-teal-600">Achieve</span>
                  <br />
                  <span className="text-gray-800">with LearNova.</span>
                </h1>
    
                {/* Subheading */}
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  Transform your learning journey with our interactive courses, achievement system, and vibrant community. Level up your skills while having fun.
                </p>
    
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => redirect('/signin')}
                    size="lg"
                    className="text-lg bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Start Learning
                  </Button>
                </div>
    
                {/* Stats */}
                <div className="flex flex-col sm:flex-row gap-6 pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="text-teal-600" size={20} />
                    <span>200+ Courses Available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="text-teal-600" size={20} />
                    <span>10k+ Students Enrolled</span>
                  </div>
                </div>
              </div>

              {/* Right Content - Image */}
              <div className="relative animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                    alt="Students learning together"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-2xl w-full h-auto"
                  />
                  {/* Floating Card */}
                  <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 animate-bounce">
                    <div className="flex items-center gap-2">
                      <Star className="text-yellow-500 fill-yellow-500" size={20} />
                      <span className="text-sm font-semibold text-gray-800">Level Up!</span>
                    </div>
                  </div>
                  {/* Teal Overlay */}
                  <div className="absolute inset-0 bg-teal-600/10 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
}

export default HeroSection