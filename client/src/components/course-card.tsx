import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, Tag, Info } from "lucide-react";
import { CourseData } from "@/lib/types";

interface CourseCardProps {
  course: CourseData;
  onViewDetails: (courseId: string) => void;
}

export function CourseCard({ course, onViewDetails }: CourseCardProps) {
  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
      <div className="aspect-video overflow-hidden rounded-t-lg">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl text-slate-900">{course.title}</CardTitle>
        <CardDescription className="text-slate-600">{course.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
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
        
        <Button 
          onClick={() => onViewDetails(course.id)}
          className="w-full bg-primary hover:bg-blue-600 text-white"
        >
          <Info className="mr-2 h-4 w-4" />
          View Details & Enroll
        </Button>
      </CardContent>
    </Card>
  );
}
