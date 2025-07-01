
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import ResourceCard from '@/components/ResourceCard';
import { ArrowLeft, Plus, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Resources = () => {
  const { courseId } = useParams();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Sample course and resources data
  const [course] = useState({
    id: courseId || '1',
    name: 'Advanced React Development',
    description: 'Master React with hooks, context, and advanced patterns for building scalable applications.',
    category: 'Programming',
    hours: 24
  });

  const [resources] = useState([
    {
      id: '1',
      title: 'React Hooks Complete Guide',
      description: 'Comprehensive PDF guide covering all React hooks with practical examples and best practices.',
      type: 'pdf' as const,
      url: 'https://example.com/react-hooks-guide.pdf',
      completed: true
    },
    {
      id: '2',
      title: 'Building Custom Hooks',
      description: 'Video tutorial series on creating reusable custom hooks for common React patterns.',
      type: 'video' as const,
      url: 'https://example.com/custom-hooks-video',
      completed: true
    },
    {
      id: '3',
      title: 'React Context API Documentation',
      description: 'Official React documentation and examples for Context API usage.',
      type: 'link' as const,
      url: 'https://reactjs.org/docs/context.html',
      completed: false
    },
    {
      id: '4',
      title: 'React Performance Optimization',
      description: 'Downloadable checklist and tools for optimizing React application performance.',
      type: 'download' as const,
      url: 'https://example.com/performance-tools.zip',
      completed: false
    },
    {
      id: '5',
      title: 'Advanced Patterns Workshop',
      description: 'Interactive workshop materials covering advanced React patterns like render props and HOCs.',
      type: 'pdf' as const,
      url: 'https://example.com/advanced-patterns.pdf',
      completed: false
    },
    {
      id: '6',
      title: 'State Management Solutions',
      description: 'Comparison video of different state management solutions in React ecosystem.',
      type: 'video' as const,
      url: 'https://example.com/state-management-video',
      completed: true
    }
  ]);

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
    toast({
      title: "Toggle Completion",
      description: `Resource ${resourceId} completion status would be updated when backend is connected.`,
    });
  };

  const handleAddResource = () => {
    toast({
      title: "Add New Resource",
      description: "This will open the add resource modal when backend is connected.",
    });
  };

  const completedCount = resources.filter(r => r.completed).length;
  const completionPercentage = Math.round((completedCount / resources.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/courses" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Courses
              </Link>
            </Button>
            <Badge variant="secondary">{course.category}</Badge>
          </div>
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{course.name}</h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                {course.description}
              </p>
            </div>
            <Button onClick={handleAddResource} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Resource
            </Button>
          </div>

          {/* Course Progress */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Course Progress</div>
                  <div className="text-2xl font-bold text-foreground">
                    {completedCount}/{resources.length} Resources Completed
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{completionPercentage}%</div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Search and Filters */}
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

        {/* Resource Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">{resources.length}</div>
              <div className="text-sm text-muted-foreground">Total Resources</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">{resources.length - completedCount}</div>
              <div className="text-sm text-muted-foreground">Remaining</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">{filteredResources.length}</div>
              <div className="text-sm text-muted-foreground">Filtered Results</div>
            </CardContent>
          </Card>
        </div>

        {/* Resources Grid */}
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
                <p>Try adjusting your search terms or filters</p>
              </div>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Resources;
