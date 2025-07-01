
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Clock, MoreVertical, Edit, Trash2, ExternalLink } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  description: string;
  hours: number;
  category: string;
  progress?: number;
}

interface CourseCardProps {
  course: Course;
  onEdit?: (course: Course) => void;
  onDelete?: (courseId: string) => void;
  onView?: (courseId: string) => void;
}

const CourseCard = ({ course, onEdit, onDelete, onView }: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 hover:border-primary/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {course.name}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {course.category}
              </Badge>
              <div className="flex items-center text-muted-foreground text-sm">
                <Clock className="w-3 h-3 mr-1" />
                {course.hours}h
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`opacity-0 group-hover:opacity-100 transition-opacity ${isHovered ? 'opacity-100' : ''}`}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView?.(course.id)}>
                <ExternalLink className="w-4 h-4 mr-2" />
                View Resources
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(course)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Course
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete?.(course.id)}
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Course
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {course.description}
        </CardDescription>
        
        {course.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}
        
        <Button 
          onClick={() => onView?.(course.id)}
          className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all"
          variant="outline"
        >
          View Course
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
