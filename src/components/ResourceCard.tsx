
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
import { FileText, Video, Link, Download, MoreVertical, Edit, Trash2, ExternalLink } from 'lucide-react';

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

const ResourceCard = ({ resource, onEdit, onDelete, onToggleComplete }: ResourceCardProps) => {
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

export default ResourceCard;
