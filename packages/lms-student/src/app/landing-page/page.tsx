"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "@/features/landing-page/HeroSection";
import AboutUsSection from "@/features/landing-page/AboutSection";
import CourseSection from "@/features/landing-page/CourseSection";
import ContactSection from "@/features/landing-page/ContactUsSection";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Footer from "@/features/landing-page/Footer";

export default function LandingPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-teal-800/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#home"
              className={`text-2xl font-bold transition-colors ${
                isScrolled
                  ? "text-white hover:text-teal-700"
                  : "text-teal-800 hover:text-teal-700"
              }`}
            >
              EduLearn
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 font-medium relative group pb-1 ${
                    isScrolled
                      ? "text-white"
                      : "text-teal-800"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 bottom-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isScrolled ? "bg-white" : "bg-teal-800"
                    }`}
                  />
                </a>
              ))}
              <Button
                className={`hover:scale-105 transition-transform duration-200 ${
                  isScrolled
                    ? "bg-teal-800 text-white hover:bg-teal-700"
                    : "bg-teal-800 text-white hover:bg-teal-700"
                }`}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden transition-colors ${
                isScrolled ? "text-white hover:text-teal-700" : "text-teal-800 hover:text-teal-700"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-5 duration-300 bg-white">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-teal-800 hover:text-teal-700 transition-colors duration-200 font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <Button className="w-full bg-teal-800 text-white hover:bg-teal-700">Get Started</Button>
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
