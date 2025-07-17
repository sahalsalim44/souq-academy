import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { GraduationCap, X } from "lucide-react";

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourse?: string;
}

export function EnrollmentModal({ isOpen, onClose, selectedCourse }: EnrollmentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: selectedCourse || ""
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const enrollmentMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/enrollments", data);
    },
    onSuccess: () => {
      toast({
        title: "Enrollment Successful!",
        description: "Thank you for your enrollment! We will contact you soon.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/enrollments'] });
      setFormData({ name: "", phone: "", course: "" });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit enrollment. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.course) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    enrollmentMutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <GraduationCap className="mr-2 h-5 w-5" />
            Enroll Now
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Your Full Name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+91 12345 67890"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="course">Select Course *</Label>
            <Select value={formData.course} onValueChange={(value) => setFormData(prev => ({ ...prev, course: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="java">Java Fullstack Development</SelectItem>
                <SelectItem value="python">Python Fullstack Development</SelectItem>
                <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-blue-600 text-white"
            disabled={enrollmentMutation.isPending}
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            {enrollmentMutation.isPending ? "Enrolling..." : "Enroll Now"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
