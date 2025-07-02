
import { useState } from 'react';
import { Link, useLocation, useParams, BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
  Menu, 
  X, 
  BookOpen, 
  TrendingUp, 
  User, 
  LogOut,
  Home,
  FolderOpen,
  Search,
  Plus,
  Filter,
  Users,
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { CourseCard, ResourceCard } from '@/components/Cards';
import { useToast } from '@/hooks/use-toast';

const queryClient = new QueryClient();

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'Categories', path: '/categories', icon: FolderOpen },
    { name: 'Progress', path: '/progress', icon: TrendingUp },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              CourseLib
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      U
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex items-center px-3 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <div className="text-base font-medium">User</div>
                    <div className="text-sm text-muted-foreground">user@example.com</div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full justify-start text-destructive mt-2">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

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

// Home Page Component
const Index = () => {
  const [stats] = useState({
    totalCourses: 156,
    activeStudents: 2340,
    completionRate: 87,
    categories: 6
  });

  const featuredCourses = sampleCourses.slice(0, 3);

  const categories = [
    { name: 'Programming', count: 45, color: 'bg-blue-500', icon: '💻' },
    { name: 'Cybersecurity', count: 28, color: 'bg-red-500', icon: '🔒' },
    { name: 'Cloud Computing', count: 35, color: 'bg-purple-500', icon: '☁️' },
    { name: 'Networking', count: 22, color: 'bg-green-500', icon: '🌐' },
    { name: 'Design', count: 18, color: 'bg-pink-500', icon: '🎨' },
    { name: 'Business Administration', count: 14, color: 'bg-orange-500', icon: '📊' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-primary mr-2" />
              <Badge variant="secondary" className="text-sm font-medium">
                Welcome to CourseLib
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Your Complete
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent block">
                Learning Library
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover, learn, and master new skills with our comprehensive collection of courses across technology, business, and design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                <Link to="/courses" className="flex items-center">
                  Explore Courses
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Link to="/progress">View Progress</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">{stats.totalCourses}</div>
              <div className="text-sm text-muted-foreground">Total Courses</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">{stats.activeStudents.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">{stats.completionRate}%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">{stats.categories}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Course Categories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our diverse range of course categories designed to advance your career and skills.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.name} className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <Link to="/courses">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{category.icon}</div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {category.name}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {category.count} courses available
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">{category.count} courses</Badge>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Courses</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start with these popular courses chosen by our community of learners.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onView={(id) => console.log('View course:', id)}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button size="lg" variant="outline">
              <Link to="/courses" className="flex items-center">
                View All Courses
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Courses Page Component
const Courses = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [courses] = useState(sampleCourses);

  const categories = ['all', 'Programming', 'Cybersecurity', 'Cloud Computing', 'Networking', 'Design', 'Business Administration'];

  const filteredCourses = courses
    .filter(course => 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(course => selectedCategory === 'all' || course.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'hours':
          return b.hours - a.hours;
        case 'progress':
          return (b.progress || 0) - (a.progress || 0);
        default:
          return 0;
      }
    });

  const handleEditCourse = (course: any) => {
    toast({
      title: "Edit Course",
      description: `Editing ${course.name} - This will open the edit modal when backend is connected.`,
    });
  };

  const handleDeleteCourse = (courseId: string) => {
    toast({
      title: "Delete Course",
      description: `Course ${courseId} would be deleted when backend is connected.`,
      variant: "destructive",
    });
  };

  const handleAddCourse = () => {
    toast({
      title: "Add New Course",
      description: "This will open the add course modal when backend is connected.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Course Library</h1>
              <p className="text-lg text-muted-foreground">
                Explore our comprehensive collection of courses
              </p>
            </div>
            <Button onClick={handleAddCourse} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Course
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Search & Filter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="hours">Duration</SelectItem>
                    <SelectItem value="progress">Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">{courses.length}</div>
              <div className="text-sm text-muted-foreground">Total Courses</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">{filteredCourses.length}</div>
              <div className="text-sm text-muted-foreground">Filtered Results</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">
                {Math.round(courses.reduce((acc, course) => acc + (course.progress || 0), 0) / courses.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">
                {courses.reduce((acc, course) => acc + course.hours, 0)}h
              </div>
              <div className="text-sm text-muted-foreground">Total Hours</div>
            </CardContent>
          </Card>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEdit={handleEditCourse}
                onDelete={handleDeleteCourse}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-muted-foreground mb-4">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                <p>Try adjusting your search terms or filters</p>
              </div>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
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
        <Navbar />
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
      <Navbar />
      
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

// Simple placeholder pages
const Categories = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">Categories</h1>
      <p>Course categories page - coming soon!</p>
    </div>
  </div>
);

const Progress = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">Progress</h1>
      <p>Progress tracking page - coming soon!</p>
    </div>
  </div>
);

const NotFound = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    </div>
  </div>
);

// Main App Component
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/resources/:courseId" element={<Resources />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
