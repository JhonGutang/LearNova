"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "@/features/landing-page/HeroSection";
import AboutUsSection from "@/features/landing-page/AboutSection";
import CourseSection from "@/features/landing-page/CourseSection";
import ContactSection from "@/features/landing-page/ContactUsSection";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Footer from "@/features/landing-page/Footer";
import { useRedirectLink } from "@/hooks/useRedirect";

export default function LandingPage() {
  const { redirect } = useRedirectLink()
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About Us" },
    { href: "#courses", label: "Courses" },
    { href: "#contact", label: "Contact Us" },
  ];
  return (
    <div className="min-h-screen bg-white">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-2 text-2xl font-bold text-gray-800 hover:text-teal-600 transition-colors"
            >
              <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              LearNova
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-800 hover:text-teal-600 transition-colors duration-200 font-medium relative group pb-1"
                >
                  {link.label}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => redirect('/signin')}
                  variant="outline"
                  className="border-gray-300 text-gray-800 hover:bg-gray-50 hover:scale-105 transition-all duration-200"
                >
                  Sign in
                </Button>
                <Button
                  onClick={() => redirect('/signin')}
                  className="bg-teal-600 hover:bg-teal-700 text-white hover:scale-105 transition-all duration-200"
                >
                  Sign up
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-800 hover:text-teal-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top-5 duration-300 bg-white">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-gray-800 hover:text-teal-600 transition-colors duration-200 font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex flex-col gap-2 pt-2">
                  <Button 
                    onClick={() => redirect('/signin')}
                    variant="outline" 
                    className="w-full border-gray-300 text-gray-800 hover:bg-gray-50"
                  >
                    Sign in
                  </Button>
                  <Button 
                    onClick={() => redirect('/signin')}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    Sign up
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />
      <AboutUsSection />
      <CourseSection />
      <ContactSection />
      <Footer/>
      </div>
  )
}
