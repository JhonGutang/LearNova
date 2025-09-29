import { CheckCircle2, Target, Lightbulb, Heart } from "lucide-react"

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To democratize education and make quality learning accessible to everyone, everywhere.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Leveraging cutting-edge technology to create engaging and effective learning experiences.",
    },
    {
      icon: Heart,
      title: "Student-Centered",
      description: "Putting learners first with personalized paths, flexible schedules, and dedicated support.",
    },
  ]

  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              About <span className="text-teal-800">EduLearn</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              We're on a mission to revolutionize online education and empower learners worldwide.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300" />
              <img
                src="/modern-classroom-collaboration.png"
                alt="Students learning together"
                className="relative rounded-lg shadow-xl w-full h-auto transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold">Empowering Learners Since 2020</h3>
              <p className="text-muted-foreground leading-relaxed">
                EduLearn was founded with a simple belief: education should be accessible, engaging, and transformative.
                We've built a platform that combines expert instruction, interactive content, and a supportive community
                to help you achieve your goals.
              </p>
              <div className="space-y-3">
                {[
                  "Expert instructors from top institutions",
                  "Flexible learning at your own pace",
                  "Industry-recognized certifications",
                  "Lifetime access to course materials",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal-800 flex-shrink-0 mt-1" size={20} />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-card p-6 rounded-lg border border-border hover:border-teal-800 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-800 group-hover:scale-110 transition-all duration-300">
                    <Icon className="text-teal-800 group-hover:text-white transition-colors duration-300" size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
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