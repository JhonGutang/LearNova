import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useRedirectLink } from "@/hooks/useRedirect"
import { Star, ArrowRight } from "lucide-react"
import { landingPageCourses as courses } from "@/mock/Courses"
import Image from "next/image"

const CourseSection: React.FC = () => {
  const {redirect} = useRedirectLink()
    
    return (
        <section id="courses" className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
                Popular <span className="text-teal-600">Courses</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Discover our most engaging courses designed to help you master new skills.
              </p>
            </div>
  
            {/* Courses Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {courses.map((course, index) => (
                <Card
                  key={index}
                  className="overflow-hidden bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border-gray-200 flex flex-col h-full"
                >
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-teal-600 transition-colors">{course.title}</h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={`${i < Math.floor(parseFloat(course.rating)) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">{course.description}</p>
                    
                    {/* Price */}
                    <div className="text-lg font-bold text-teal-600 mb-4">{course.price}</div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 mt-auto">
                    <Button 
                      onClick={() => redirect('/signin')} 
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white hover:scale-105 transition-all duration-200"
                    >
                      Read Course
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
                onClick={() => redirect('/signin')}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:scale-105 transition-all duration-200 bg-transparent"
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