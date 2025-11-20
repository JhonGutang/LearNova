import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  const footerLinks = {
    matters: [
      { label: "Community", href: "#" },
      { label: "Instructors", href: "#" },
      { label: "Courses", href: "#courses" },
      { label: "LearNova+", href: "#" },
    ],
    support: [
      { label: "Help Center", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Contact", href: "#contact" },
      { label: "Privacy", href: "#" },
    ],
    company: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Privacy", href: "#" },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ]

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <h3 className="text-2xl font-bold">LearNova</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Empowering learners worldwide with quality education and innovative learning experiences.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-teal-600 transition-all duration-300 hover:scale-110"
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Matters</h4>
            <ul className="space-y-2">
              {footerLinks.matters.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm text-center md:text-left">
              © 2024 LearNova. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline">
                Terms
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer