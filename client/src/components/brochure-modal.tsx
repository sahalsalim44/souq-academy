import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Download } from "lucide-react";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BrochureModal({ isOpen, onClose }: BrochureModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const downloadMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/brochure-downloads", data);
    },
    onSuccess: () => {
      toast({
        title: "Thank you!",
        description: "Your brochure is being downloaded.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/brochure-downloads'] });
      
      // Trigger download
      const link = document.createElement('a');
      link.href = '/api/download/brochure';
      link.download = 'SOUQ_Academy_Brochure.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setFormData({ name: "", email: "", phone: "" });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to download brochure. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    downloadMutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Download className="mr-2 h-5 w-5" />
            Download Brochure
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
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="your@email.com"
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
          
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-blue-600 text-white"
            disabled={downloadMutation.isPending}
          >
            <Download className="mr-2 h-4 w-4" />
            {downloadMutation.isPending ? "Downloading..." : "Download Brochure"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
