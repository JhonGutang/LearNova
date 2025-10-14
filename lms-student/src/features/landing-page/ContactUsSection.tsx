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
          title: "Email Us",
          content: "support@edulearn.com",
          link: "mailto:support@edulearn.com",
        },
        {
          icon: Phone,
          title: "Call Us",
          content: "+1 (555) 123-4567",
          link: "tel:+15551234567",
        },
        {
          icon: MapPin,
          title: "Visit Us",
          content: "123 Education St, Learning City, LC 12345",
          link: "#",
        },
      ]
    return (
        <section id="contact" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              Get In <span className="text-teal-800">Touch</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card p-8 rounded-lg border border-border shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="hover:border-teal-800 focus:border-teal-800 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="hover:border-teal-800 focus:border-teal-800 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="hover:border-teal-800 focus:border-teal-800 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="hover:border-teal-800 focus:border-teal-800 transition-colors resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full hover:scale-105 transition-transform duration-200 bg-teal-800 text-white hover:bg-teal-900"
                  size="lg"
                >
                  Send Message
                  <Send className="ml-2" size={18} />
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Reach out to us through any of these channels. Our team is available Monday through Friday, 9 AM to 6
                  PM EST.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <a
                      key={index}
                      href={info.link}
                      className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:border-teal-800 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="bg-teal-800/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-teal-800 group-hover:scale-110 transition-all duration-300">
                        <Icon className="text-teal-800 group-hover:text-white transition-colors duration-300" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{info.title}</h4>
                        <p className="text-muted-foreground text-sm">{info.content}</p>
                      </div>
                    </a>
                  )
                })}
              </div>

              {/* Map Placeholder */}
              <div className="relative h-64 rounded-lg overflow-hidden border border-border group">
                <img
                  src="/modern-office-building-map-location.jpg"
                  alt="Office location"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-teal-800/20 group-hover:bg-teal-800/30 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}

export default ContactSection