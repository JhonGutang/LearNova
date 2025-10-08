import React from "react";
import { ArrowRight, BookOpen, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useRedirectLink } from "@/hooks/useRedirect";

const HeroSection: React.FC = () => {
  const {redirect} = useRedirectLink()
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-5 bg-cover bg-center" />
    
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance animate-in fade-in slide-in-from-bottom-4 duration-700">
                Transform Your Future with <span className="text-teal-800">Quality Education</span>
              </h1>
    
              {/* Subheading */}
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
                Unlock your potential with our comprehensive learning management system. Access world-class courses, expert
                instructors, and a supportive community.
              </p>
    
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
                <Button
                onClick={() => redirect('/signin')}
                  size="lg"
                  className="text-lg bg-teal-800 hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
                >
                  Start Learning Today
                  <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button
                onClick={() => redirect('/signin')}
                  size="lg"
                  variant="outline"
                  className="text-lg hover:scale-105 transition-transform duration-200 hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  Explore Courses
                </Button>
              </div>
    
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-7 duration-700 delay-500">
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card hover:shadow-lg transition-shadow duration-300">
                  <BookOpen className="text-teal-800" size={32} />
                  <div className="text-3xl font-bold text-teal-800">500+</div>
                  <div className="text-sm text-muted-foreground">Courses Available</div>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card hover:shadow-lg transition-shadow duration-300">
                  <Users className="text-teal-800" size={32} />
                  <div className="text-3xl font-bold text-teal-800">50K+</div>
                  <div className="text-sm text-muted-foreground">Active Students</div>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card hover:shadow-lg transition-shadow duration-300">
                  <Award className="text-teal-800" size={32} />
                  <div className="text-3xl font-bold text-teal-800">95%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
}

export default HeroSection