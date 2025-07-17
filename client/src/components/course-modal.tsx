import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Clock, Users, Tag, Code } from "lucide-react";
import { CourseData } from "@/lib/types";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: CourseData | null;
}

export function CourseModal({ isOpen, onClose, course }: CourseModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const enrollmentMutation = useMutation({
    mutationFn: async (data: { name: string; phone: string; course: string }) => {
      return await apiRequest("POST", "/api/enrollments", data);
    },
    onSuccess: () => {
      toast({
        title: "Enrollment Successful!",
        description: "Thank you for your enrollment! We will contact you soon.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/enrollments'] });
      setFormData({ name: "", phone: "" });
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
    if (!formData.name || !formData.phone || !course) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    enrollmentMutation.mutate({
      name: formData.name,
      phone: formData.phone,
      course: course.id
    });
  };

  if (!course) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-slate-900">{course.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center text-sm text-slate-600">
              <Clock className="mr-2 h-4 w-4" />
              <span>Duration: {course.duration}</span>
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <Users className="mr-2 h-4 w-4" />
              <span>Batch Size: {course.batchSize}</span>
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <Tag className="mr-2 h-4 w-4" />
              <span>Tag: {course.certificate}</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-slate-900 mb-3">Curriculum</h4>
            <ul className="space-y-2">
              {course.curriculum.map((item, index) => (
                <li key={index} className="flex items-center">
                  <Check className="text-primary mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-slate-900 mb-3">Projects</h4>
            <ul className="space-y-2">
              {course.projects.map((item, index) => (
                <li key={index} className="flex items-center">
                  <Code className="text-primary mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-900 mb-4">Enroll Now</h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Label htmlFor="modal-name">Your Name *</Label>
                <Input
                  id="modal-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="modal-phone">Phone Number *</Label>
                <Input
                  id="modal-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 12345 67890"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-blue-600 text-white"
                disabled={enrollmentMutation.isPending}
              >
                {enrollmentMutation.isPending ? "Enrolling..." : "Enroll Now"}
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
