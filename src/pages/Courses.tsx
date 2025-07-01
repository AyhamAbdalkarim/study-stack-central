import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import { Search, Plus, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Courses = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Sample courses data
  const [courses] = useState([
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
  ]);

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
        {/* Header */}
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

          {/* Search and Filters */}
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

        {/* Course Statistics */}
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

        {/* Course Grid */}
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

export default Courses;
