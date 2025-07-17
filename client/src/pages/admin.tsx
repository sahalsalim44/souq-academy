import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Users, 
  Download, 
  Briefcase, 
  MessageSquare, 
  Plus, 
  FileText, 
  Trash2 
} from "lucide-react";
import { 
  Enrollment, 
  BrochureDownload, 
  HireRequest, 
  ContactMessage,
  Testimonial
} from "@shared/schema";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [testimonialData, setTestimonialData] = useState({
    name: "",
    position: "",
    testimonial: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (data: typeof loginData) => {
      return await apiRequest("POST", "/api/admin/login", data);
    },
    onSuccess: () => {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!",
      });
    },
    onError: () => {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  });

  const testimonialMutation = useMutation({
    mutationFn: async (data: typeof testimonialData) => {
      return await apiRequest("POST", "/api/testimonials", data);
    },
    onSuccess: () => {
      toast({
        title: "Testimonial Added",
        description: "New testimonial has been added successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      setTestimonialData({ name: "", position: "", testimonial: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add testimonial. Please try again.",
        variant: "destructive",
      });
    }
  });

  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/testimonials/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Testimonial Deleted",
        description: "Testimonial has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete testimonial. Please try again.",
        variant: "destructive",
      });
    }
  });

  const { data: enrollments } = useQuery<Enrollment[]>({
    queryKey: ['/api/enrollments'],
    enabled: isAuthenticated,
  });

  const { data: brochureDownloads } = useQuery<BrochureDownload[]>({
    queryKey: ['/api/brochure-downloads'],
    enabled: isAuthenticated,
  });

  const { data: hireRequests } = useQuery<HireRequest[]>({
    queryKey: ['/api/hire-requests'],
    enabled: isAuthenticated,
  });

  const { data: contactMessages } = useQuery<ContactMessage[]>({
    queryKey: ['/api/contact'],
    enabled: isAuthenticated,
  });

  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
    enabled: isAuthenticated,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginData);
  };

  const handleTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialData.name || !testimonialData.position || !testimonialData.testimonial) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    testimonialMutation.mutate(testimonialData);
  };

  const handleExport = (type: string) => {
    const link = document.createElement('a');
    link.href = `/api/export/${type}`;
    link.download = `${type}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter password"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-blue-600 text-white"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
          <Button 
            onClick={() => setIsAuthenticated(false)}
            variant="outline"
          >
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <p className="text-sm font-medium text-slate-600">Total Enrollments</p>
                <p className="text-2xl font-bold text-slate-900">{enrollments?.length || 0}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Download className="h-8 w-8 text-green-600 mr-4" />
              <div>
                <p className="text-sm font-medium text-slate-600">Brochure Downloads</p>
                <p className="text-2xl font-bold text-slate-900">{brochureDownloads?.length || 0}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Briefcase className="h-8 w-8 text-purple-600 mr-4" />
              <div>
                <p className="text-sm font-medium text-slate-600">Hire Requests</p>
                <p className="text-2xl font-bold text-slate-900">{hireRequests?.length || 0}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <MessageSquare className="h-8 w-8 text-orange-600 mr-4" />
              <div>
                <p className="text-sm font-medium text-slate-600">Contact Messages</p>
                <p className="text-2xl font-bold text-slate-900">{contactMessages?.length || 0}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="enrollments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
            <TabsTrigger value="brochures">Brochures</TabsTrigger>
            <TabsTrigger value="hire-requests">Hire Requests</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>

          <TabsContent value="enrollments" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Enrollments</h2>
              <Button onClick={() => handleExport('enrollments')} className="bg-green-600 hover:bg-green-700">
                <FileText className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrollments?.map((enrollment) => (
                      <TableRow key={enrollment.id}>
                        <TableCell className="font-medium">{enrollment.name}</TableCell>
                        <TableCell>{enrollment.phone}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{enrollment.course}</Badge>
                        </TableCell>
                        <TableCell>{enrollment.createdAt ? new Date(enrollment.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="brochures" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Brochure Downloads</h2>
              <Button onClick={() => handleExport('brochure-downloads')} className="bg-green-600 hover:bg-green-700">
                <FileText className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brochureDownloads?.map((download) => (
                      <TableRow key={download.id}>
                        <TableCell className="font-medium">{download.name}</TableCell>
                        <TableCell>{download.email}</TableCell>
                        <TableCell>{download.phone}</TableCell>
                        <TableCell>{download.createdAt ? new Date(download.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hire-requests" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Hire Requests</h2>
              <Button onClick={() => handleExport('hire-requests')} className="bg-green-600 hover:bg-green-700">
                <FileText className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Job Role</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hireRequests?.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.companyName}</TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell>{request.phone}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{request.jobRole}</Badge>
                        </TableCell>
                        <TableCell>{request.createdAt ? new Date(request.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Contact Messages</h2>
            </div>
            
            <div className="space-y-4">
              {contactMessages?.map((message) => (
                <Card key={message.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{message.name}</h4>
                        <p className="text-sm text-slate-600">{message.email}</p>
                      </div>
                      <p className="text-sm text-slate-500">
                        {message.createdAt ? new Date(message.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <p className="text-slate-700">{message.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Testimonials</h2>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Add New Testimonial</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="studentName">Student Name</Label>
                    <Input
                      id="studentName"
                      type="text"
                      value={testimonialData.name}
                      onChange={(e) => setTestimonialData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Student Name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">Company/Position</Label>
                    <Input
                      id="position"
                      type="text"
                      value={testimonialData.position}
                      onChange={(e) => setTestimonialData(prev => ({ ...prev, position: e.target.value }))}
                      placeholder="Company/Position"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="testimonial">Testimonial</Label>
                    <Textarea
                      id="testimonial"
                      value={testimonialData.testimonial}
                      onChange={(e) => setTestimonialData(prev => ({ ...prev, testimonial: e.target.value }))}
                      placeholder="Testimonial text..."
                      rows={3}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-blue-600"
                    disabled={testimonialMutation.isPending}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {testimonialMutation.isPending ? "Adding..." : "Add Testimonial"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Testimonials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testimonials?.map((testimonial) => (
                    <div key={testimonial.id} className="flex justify-between items-start p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-slate-600 mb-2">{testimonial.position}</p>
                        <p className="text-slate-700">"{testimonial.testimonial}"</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteTestimonialMutation.mutate(testimonial.id)}
                        className="ml-4 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
