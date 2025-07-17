import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Testimonial } from "@shared/schema";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="bg-gray-50 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="text-yellow-500 flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
        </div>
        
        <p className="text-slate-600 mb-4 italic">"{testimonial.testimonial}"</p>
        
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
            <p className="text-sm text-slate-600">{testimonial.position}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
