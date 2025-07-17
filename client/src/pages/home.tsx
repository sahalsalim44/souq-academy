import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CourseCard } from "@/components/course-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { EnrollmentModal } from "@/components/enrollment-modal";
import { BrochureModal } from "@/components/brochure-modal";
import { CourseModal } from "@/components/course-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { courseData } from "@/lib/types";
import { 
  Trophy, 
  HandHeart, 
  Users, 
  GraduationCap, 
  Download, 
  Check, 
  MapPin, 
  Phone, 
  Mail,
  Send
} from "lucide-react";
import { Testimonial } from "@shared/schema";

export default function Home() {
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedCourseData, setSelectedCourseData] = useState<any>(null);
  const [hireFormData, setHireFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    jobRole: "",
    requirements: ""
  });
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: testimonials, isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  const hireMutation = useMutation({
    mutationFn: async (data: typeof hireFormData) => {
      return await apiRequest("POST", "/api/hire-requests", data);
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted!",
        description: "Thank you for your interest! We will contact you soon.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/hire-requests'] });
      setHireFormData({ companyName: "", email: "", phone: "", jobRole: "", requirements: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof contactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message! We will get back to you soon.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
      setContactFormData({ name: "", email: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleViewCourseDetails = (courseId: string) => {
    setSelectedCourseData(courseData[courseId]);
    setCourseModalOpen(true);
  };

  const handleEnrollClick = (courseId?: string) => {
    if (courseId) {
      setSelectedCourse(courseId);
    }
    setEnrollmentModalOpen(true);
  };

  const handleHireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hireFormData.companyName || !hireFormData.email || !hireFormData.phone || !hireFormData.jobRole) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    hireMutation.mutate(hireFormData);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactFormData.name || !contactFormData.email || !contactFormData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(contactFormData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onEnrollClick={() => handleEnrollClick()}
        onBrochureClick={() => setBrochureModalOpen(true)}
      />

      {/* Hero Section */}
      <section id="home" className="pt-16 bg-gradient-to-r from-primary to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Career with <span className="text-yellow-300">SOUQ ACADEMY</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Master cutting-edge technologies with our comprehensive fullstack courses and land your dream job with 100% placement assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => handleEnrollClick()}
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                Enroll Now
              </Button>
              <Button 
                onClick={() => setBrochureModalOpen(true)}
                variant="outline"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition text-lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose SOUQ ACADEMY?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We provide world-class training with industry-relevant curriculum and guaranteed placement support
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition">
              <CardContent className="pt-6">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">100% Placement Assistance</h3>
                <p className="text-slate-600">Guaranteed job placement support with our extensive network of partner companies</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition">
              <CardContent className="pt-6">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HandHeart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">Hands-on Experience</h3>
                <p className="text-slate-600">Learn by doing with real-world projects and practical assignments</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition">
              <CardContent className="pt-6">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">Expert Instructors</h3>
                <p className="text-slate-600">Learn from industry professionals with years of practical experience</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Courses</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of industry-focused courses
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {Object.values(courseData).map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onViewDetails={handleViewCourseDetails}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Our Students Say</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Success stories from our graduates who are now thriving in their careers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonialsLoading ? (
              <div className="col-span-3 text-center text-slate-600">Loading testimonials...</div>
            ) : testimonials && testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))
            ) : (
              <div className="col-span-3 text-center text-slate-600">No testimonials available</div>
            )}
          </div>
        </div>
      </section>

      {/* Hire Through Us Section */}
      <section id="hire" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Hire Through SOUQ ACADEMY</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Partner with us to find skilled professionals for your organization
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Hire Our Graduates?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center mt-1 mr-3">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Industry-Ready Skills</h4>
                    <p className="text-slate-600">Our graduates are trained on the latest technologies and industry best practices</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center mt-1 mr-3">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Practical Experience</h4>
                    <p className="text-slate-600">All candidates have hands-on experience with real-world projects</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center mt-1 mr-3">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Pre-Screened Talent</h4>
                    <p className="text-slate-600">We provide only top-performing candidates who meet your requirements</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900">Request Talent</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleHireSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      type="text"
                      value={hireFormData.companyName}
                      onChange={(e) => setHireFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      placeholder="Your Company Name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={hireFormData.email}
                      onChange={(e) => setHireFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="company@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={hireFormData.phone}
                      onChange={(e) => setHireFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 12345 67890"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="jobRole">Job Role *</Label>
                    <Input
                      id="jobRole"
                      type="text"
                      value={hireFormData.jobRole}
                      onChange={(e) => setHireFormData(prev => ({ ...prev, jobRole: e.target.value }))}
                      placeholder="e.g., Java Developer, Python Developer"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="requirements">Requirements</Label>
                    <Textarea
                      id="requirements"
                      value={hireFormData.requirements}
                      onChange={(e) => setHireFormData(prev => ({ ...prev, requirements: e.target.value }))}
                      placeholder="Please describe your requirements..."
                      rows={4}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-blue-600 text-white"
                    disabled={hireMutation.isPending}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {hireMutation.isPending ? "Submitting..." : "Submit Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">Ready to start your journey? Contact us today!</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-primary text-white w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Address</p>
                    <p className="text-slate-600">Kottiyam , kollam</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary text-white w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Phone</p>
                    <p className="text-slate-600">+91 95268 89407</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary text-white w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Email</p>
                    <p className="text-slate-600">academysouq@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="contactName">Name *</Label>
                    <Input
                      id="contactName"
                      type="text"
                      value={contactFormData.name}
                      onChange={(e) => setContactFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={contactFormData.email}
                      onChange={(e) => setContactFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactMessage">Message *</Label>
                    <Textarea
                      id="contactMessage"
                      value={contactFormData.message}
                      onChange={(e) => setContactFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Your message..."
                      rows={4}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-blue-600 text-white"
                    disabled={contactMutation.isPending}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <EnrollmentModal
        isOpen={enrollmentModalOpen}
        onClose={() => setEnrollmentModalOpen(false)}
        selectedCourse={selectedCourse || undefined}
      />
      
      <BrochureModal
        isOpen={brochureModalOpen}
        onClose={() => setBrochureModalOpen(false)}
      />
      
      <CourseModal
        isOpen={courseModalOpen}
        onClose={() => setCourseModalOpen(false)}
        course={selectedCourseData}
      />
    </div>
  );
}
