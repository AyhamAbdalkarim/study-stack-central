
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import Navbar from '@/components/Navbar';
import { Plus, Search, MoreVertical, Edit, Trash2, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Categories = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Sample categories data
  const [categories] = useState([
    {
      id: '1',
      name: 'Programming',
      description: 'Software development, coding languages, and programming frameworks',
      courseCount: 45,
      icon: '💻',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'Cybersecurity',
      description: 'Information security, ethical hacking, and security frameworks',
      courseCount: 28,
      icon: '🔒',
      color: 'bg-red-500'
    },
    {
      id: '3',
      name: 'Cloud Computing',
      description: 'AWS, Azure, GCP, and cloud architecture patterns',
      courseCount: 35,
      icon: '☁️',
      color: 'bg-purple-500'
    },
    {
      id: '4',
      name: 'Networking',
      description: 'Network protocols, infrastructure, and administration',
      courseCount: 22,
      icon: '🌐',
      color: 'bg-green-500'
    },
    {
      id: '5',
      name: 'Design',
      description: 'UI/UX design, graphic design, and design thinking',
      courseCount: 18,
      icon: '🎨',
      color: 'bg-pink-500'
    },
    {
      id: '6',
      name: 'Business Administration',
      description: 'Project management, business strategy, and leadership',
      courseCount: 14,
      icon: '📊',
      color: 'bg-orange-500'
    }
  ]);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditCategory = (category: any) => {
    toast({
      title: "Edit Category",
      description: `Editing ${category.name} - This will open the edit modal when backend is connected.`,
    });
  };

  const handleDeleteCategory = (categoryId: string) => {
    toast({
      title: "Delete Category",
      description: `Category ${categoryId} would be deleted when backend is connected.`,
      variant: "destructive",
    });
  };

  const handleAddCategory = () => {
    toast({
      title: "Add New Category",
      description: "This will open the add category modal when backend is connected.",
    });
  };

  const totalCourses = categories.reduce((total, category) => total + category.courseCount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Course Categories</h1>
              <p className="text-lg text-muted-foreground">
                Manage and organize your course categories
              </p>
            </div>
            <Button onClick={handleAddCategory} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </div>

          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Total Categories</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">{totalCourses}</div>
              <div className="text-sm text-muted-foreground">Total Courses</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">
                {Math.round(totalCourses / categories.length)}
              </div>
              <div className="text-sm text-muted-foreground">Avg Courses per Category</div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <Card 
                key={category.id} 
                className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 hover:border-primary/30"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-3xl">{category.icon}</div>
                      <div>
                        <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {category.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            <BookOpen className="w-3 h-3 mr-1" />
                            {category.courseCount} courses
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Category
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Category
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground mb-4">
                    {category.description}
                  </CardDescription>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {category.courseCount} courses available
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    >
                      View Courses
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-muted-foreground mb-4">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No categories found</h3>
                <p>Try adjusting your search terms</p>
              </div>
              <Button variant="outline" onClick={() => setSearchTerm('')}>
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Categories;
