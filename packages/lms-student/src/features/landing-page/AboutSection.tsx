import { Gamepad2, Users, BarChart3 } from "lucide-react"

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: Gamepad2,
      title: "Gamified Learning",
      description: "Turn your education into an exciting adventure with points, badges, and achievements that keep you motivated.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Connect with fellow learners, share knowledge, and grow together in our supportive learning community.",
    },
    {
      icon: BarChart3,
      title: "Track Progress",
      description: "Monitor your learning journey with detailed analytics and personalized insights to reach your goals faster.",
    },
  ]

  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
              Why Choose <span className="text-teal-600">LearNova?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We&apos;ve reimagined online learning by combining education with gamification, resulting in an engaging experience that keeps you motivated and entertained.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="bg-teal-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:scale-110 transition-all duration-300">
                    <Icon className="text-teal-600 group-hover:text-white transition-colors duration-300" size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection