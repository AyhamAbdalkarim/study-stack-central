
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import { BookOpen, Users, TrendingUp, Award, ArrowRight, Sparkles } from 'lucide-react';

const Index = () => {
  const [stats] = useState({
    totalCourses: 156,
    activeStudents: 2340,
    completionRate: 87,
    categories: 6
  });

  // Sample featured courses
  const [featuredCourses] = useState([
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
    }
  ]);

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

export default Index;
