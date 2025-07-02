
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResourceCard } from '@/components/Cards';
import { 
  ArrowRight, 
  BookOpen, 
  Plus, 
  Search, 
  Filter 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample data
const sampleCourses = [
  {
    id: '1',
    name: 'Advanced React Development',
    description: 'Master React with hooks, context, and advanced patterns for building scalable applications.',
    hours: 24,
    category: 'Programming',
    progress: 65
  },
  {
    id: '2',
    name: 'Cloud Security Fundamentals',
    description: 'Learn essential cloud security principles and best practices for AWS, Azure, and GCP.',
    hours: 18,
    category: 'Cybersecurity',
    progress: 30
  },
  {
    id: '3',
    name: 'Network Architecture Design',
    description: 'Design and implement robust network infrastructures for enterprise environments.',
    hours: 32,
    category: 'Networking',
    progress: 0
  },
  {
    id: '4',
    name: 'AWS Solutions Architect',
    description: 'Comprehensive guide to designing distributed applications and systems on AWS.',
    hours: 40,
    category: 'Cloud Computing',
    progress: 85
  },
  {
    id: '5',
    name: 'UI/UX Design Principles',
    description: 'Learn user interface and user experience design fundamentals for digital products.',
    hours: 16,
    category: 'Design',
    progress: 45
  },
  {
    id: '6',
    name: 'Project Management Essentials',
    description: 'Master project management methodologies including Agile, Scrum, and traditional approaches.',
    hours: 20,
    category: 'Business Administration',
    progress: 10
  },
  {
    id: '7',
    name: 'Python for Data Science',
    description: 'Learn Python programming with focus on data analysis, visualization, and machine learning.',
    hours: 35,
    category: 'Programming',
    progress: 0
  },
  {
    id: '8',
    name: 'Ethical Hacking Fundamentals',
    description: 'Introduction to penetration testing, vulnerability assessment, and ethical hacking techniques.',
    hours: 28,
    category: 'Cybersecurity',
    progress: 20
  }
];

const sampleResources = [
  {
    id: '1',
    title: 'React Hooks Deep Dive',
    description: 'Complete guide to React hooks with practical examples and best practices.',
    type: 'pdf' as const,
    url: 'https://example.com/react-hooks.pdf',
    completed: true
  },
  {
    id: '2',
    title: 'State Management Patterns',
    description: 'Video tutorial covering Redux, Context API, and Zustand for state management.',
    type: 'video' as const,
    url: 'https://example.com/state-management',
    completed: false
  },
  {
    id: '3',
    title: 'React Documentation',
    description: 'Official React documentation with latest updates and examples.',
    type: 'link' as const,
    url: 'https://react.dev',
    completed: true
  },
  {
    id: '4',
    title: 'Project Source Code',
    description: 'Download the complete source code for all course projects.',
    type: 'download' as const,
    url: 'https://example.com/download/projects.zip',
    completed: false
  }
];

// Resources Page Component
const Resources = () => {
  const { courseId } = useParams();
  const { toast } = useToast();
  const [resources, setResources] = useState(sampleResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const course = sampleCourses.find(c => c.id === courseId);

  const resourceTypes = ['all', 'pdf', 'video', 'link', 'download'];

  const filteredResources = resources
    .filter(resource => 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(resource => selectedType === 'all' || resource.type === selectedType);

  const handleEditResource = (resource: any) => {
    toast({
      title: "Edit Resource",
      description: `Editing ${resource.title} - This will open the edit modal when backend is connected.`,
    });
  };

  const handleDeleteResource = (resourceId: string) => {
    toast({
      title: "Delete Resource",
      description: `Resource ${resourceId} would be deleted when backend is connected.`,
      variant: "destructive",
    });
  };

  const handleToggleComplete = (resourceId: string) => {
    setResources(prev => prev.map(resource => 
      resource.id === resourceId 
        ? { ...resource, completed: !resource.completed }
        : resource
    ));
  };

  const handleAddResource = () => {
    toast({
      title: "Add New Resource",
      description: "This will open the add resource modal when backend is connected.",
    });
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center py-12">
            <CardContent>
              <h1 className="text-2xl font-bold text-foreground mb-4">Course Not Found</h1>
              <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist.</p>
              <Button asChild>
                <Link to="/courses">Back to Courses</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/courses">
                <ArrowRight className="w-4 h-4 rotate-180 mr-2" />
                Back to Courses
              </Link>
            </Button>
          </div>
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{course.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{course.description}</p>
              <div className="flex items-center gap-4">
                <Badge variant="secondary">{course.category}</Badge>
                <div className="flex items-center text-muted-foreground">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {course.hours} hours
                </div>
              </div>
            </div>
            <Button onClick={handleAddResource} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Resource
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Search & Filter Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search resources..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Resource Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {resourceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === 'all' ? 'All Types' : type.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">{resources.length}</div>
              <div className="text-sm text-muted-foreground">Total Resources</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">{filteredResources.length}</div>
              <div className="text-sm text-muted-foreground">Filtered Results</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">
                {resources.filter(r => r.completed).length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">
                {Math.round((resources.filter(r => r.completed).length / resources.length) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </CardContent>
          </Card>
        </div>

        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onEdit={handleEditResource}
                onDelete={handleDeleteResource}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-muted-foreground mb-4">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No resources found</h3>
                <p>Try adjusting your search terms or add some resources</p>
              </div>
              <Button onClick={handleAddResource}>
                Add Resource
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Resources;
