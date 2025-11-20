"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"

const ContactSection: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log("Form submitted:", formData)
      }
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        })
      }
    
      const contactInfo = [
        {
          icon: Mail,
          content: "support@learnova.net",
          link: "mailto:support@learnova.net",
        },
        {
          icon: Phone,
          content: "+1 (555) 123-4567",
          link: "tel:+15551234567",
        },
        {
          icon: MapPin,
          content: "123 Learning Road, Education City",
          link: "#",
        },
      ]
    return (
        <section id="contact" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Side - Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                  Get in Touch
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Have questions about our platform? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <a
                      key={index}
                      href={info.link}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 group"
                    >
                      <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600 group-hover:scale-110 transition-all duration-300">
                        <Icon className="text-teal-600 group-hover:text-white transition-colors duration-300" size={24} />
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">{info.content}</p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-gray-300 focus:border-teal-600 focus:ring-teal-600 transition-colors"
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-gray-300 focus:border-teal-600 focus:ring-teal-600 transition-colors"
                  />
                </div>
                <div>
                  <Input
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="border-gray-300 focus:border-teal-600 focus:ring-teal-600 transition-colors"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Tell us more..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="border-gray-300 focus:border-teal-600 focus:ring-teal-600 transition-colors resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white hover:scale-105 transition-all duration-200"
                  size="lg"
                >
                  Send Message
                  <Send className="ml-2" size={18} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}

export default ContactSection