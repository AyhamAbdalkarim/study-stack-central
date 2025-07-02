
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Clock, MoreVertical, Edit, Trash2, ExternalLink, FileText, Video, Link, Download } from 'lucide-react';

// Course interfaces and component
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

export const CourseCard = ({ course, onEdit, onDelete, onView }: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleViewCourse = () => {
    navigate(`/resources/${course.id}`);
    onView?.(course.id);
  };

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
              <DropdownMenuItem onClick={handleViewCourse}>
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
          onClick={handleViewCourse}
          className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all"
          variant="outline"
        >
          View Course
        </Button>
      </CardContent>
    </Card>
  );
};

// Resource interfaces and component
interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'link' | 'download';
  url: string;
  completed?: boolean;
}

interface ResourceCardProps {
  resource: Resource;
  onEdit?: (resource: Resource) => void;
  onDelete?: (resourceId: string) => void;
  onToggleComplete?: (resourceId: string) => void;
}

export const ResourceCard = ({ resource, onEdit, onDelete, onToggleComplete }: ResourceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'link':
        return <Link className="w-5 h-5" />;
      case 'download':
        return <Download className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'video':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'link':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'download':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card 
      className={`group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 hover:border-primary/30 ${
        resource.completed ? 'bg-green-50 border-green-200' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className={`p-2 rounded-lg border ${getResourceColor(resource.type)}`}>
              {getResourceIcon(resource.type)}
            </div>
            <div className="flex-1">
              <CardTitle className="text-base font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                {resource.title}
              </CardTitle>
              <Badge 
                variant="outline" 
                className={`mt-2 text-xs ${getResourceColor(resource.type)} border-0`}
              >
                {resource.type.toUpperCase()}
              </Badge>
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
              <DropdownMenuItem onClick={() => window.open(resource.url, '_blank')}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Resource
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleComplete?.(resource.id)}>
                <div className="w-4 h-4 mr-2 rounded border-2 border-primary flex items-center justify-center">
                  {resource.completed && <div className="w-2 h-2 bg-primary rounded-full" />}
                </div>
                {resource.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(resource)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Resource
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete?.(resource.id)}
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Resource
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {resource.description}
        </CardDescription>
        
        <Button 
          onClick={() => window.open(resource.url, '_blank')}
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
          variant="outline"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Open Resource
        </Button>
      </CardContent>
    </Card>
  );
};
