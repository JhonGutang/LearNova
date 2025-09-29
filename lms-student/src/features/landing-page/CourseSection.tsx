import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Clock, Users, Star, ArrowRight } from "lucide-react"

const CourseSection: React.FC = () => {
    const courses = [
        {
          title: "Web Development Fundamentals",
          description: "Master HTML, CSS, and JavaScript to build modern, responsive websites from scratch.",
          image: "/web-development-coding-screen.png",
          duration: "12 weeks",
          students: "2,450",
          rating: "4.8",
          level: "Beginner",
        },
        {
          title: "Data Science & Analytics",
          description: "Learn Python, statistics, and machine learning to extract insights from data.",
          image: "/data-science-analytics-charts.jpg",
          duration: "16 weeks",
          students: "1,890",
          rating: "4.9",
          level: "Intermediate",
        },
        {
          title: "Digital Marketing Mastery",
          description: "Comprehensive guide to SEO, social media, content marketing, and analytics.",
          image: "/digital-marketing-strategy.png",
          duration: "10 weeks",
          students: "3,120",
          rating: "4.7",
          level: "Beginner",
        },
        {
          title: "UI/UX Design Principles",
          description: "Create beautiful, user-friendly interfaces with modern design tools and techniques.",
          image: "/ui-ux-wireframes.png",
          duration: "14 weeks",
          students: "1,650",
          rating: "4.9",
          level: "Intermediate",
        },
        {
          title: "Business Management",
          description: "Essential skills for leading teams, managing projects, and driving business growth.",
          image: "/business-management-team.jpg",
          duration: "8 weeks",
          students: "2,780",
          rating: "4.6",
          level: "Beginner",
        },
        {
          title: "Mobile App Development",
          description: "Build native iOS and Android apps using React Native and modern development tools.",
          image: "/mobile-app-development.png",
          duration: "18 weeks",
          students: "1,420",
          rating: "4.8",
          level: "Advanced",
        },
      ]
    return (
        <section id="courses" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
                Explore Our <span className="text-teal-800">Courses</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Choose from hundreds of courses across various disciplines, taught by industry experts.
              </p>
            </div>
  
            {/* Courses Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {courses.map((course, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border-border hover:border-teal-800"
                >
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {course.level}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-teal-800 transition-colors">{course.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{course.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-accent text-accent" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button className="w-full bg-teal-800 group/btn hover:bg-teal-700 hover:text-white hover:scale-105 transition-transform duration-200">
                      Enroll Now
                      <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={16} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
  
            {/* View All Button */}
            <div className="text-center">
              <Button
                size="lg"
                variant="outline"
                className="hover:bg-teal-800 hover:text-white hover:scale-105 transition-all duration-200 bg-transparent"
              >
                View All Courses
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
}

export default CourseSection