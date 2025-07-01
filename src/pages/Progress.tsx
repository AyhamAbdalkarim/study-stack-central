
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import { TrendingUp, Clock, Award, Target, BookOpen, Calendar } from 'lucide-react';

const Progress = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  // Sample progress data
  const [progressData] = useState({
    overallProgress: 68,
    coursesCompleted: 12,
    coursesInProgress: 8,
    totalHoursSpent: 156,
    streak: 15,
    achievements: [
      { name: 'First Course Completed', date: '2024-01-15', icon: '🏆' },
      { name: 'Programming Master', date: '2024-02-20', icon: '💻' },
      { name: '30-Day Streak', date: '2024-03-10', icon: '🔥' },
    ]
  });

  const [courseProgress] = useState([
    {
      id: '1',
      name: 'Advanced React Development',
      category: 'Programming',
      progress: 65,
      totalHours: 24,
      completedHours: 15.6,
      lastAccessed: '2024-06-28',
      status: 'in-progress'
    },
    {
      id: '2',
      name: 'AWS Solutions Architect',
      category: 'Cloud Computing',
      progress: 85,
      totalHours: 40,
      completedHours: 34,
      lastAccessed: '2024-06-25',
      status: 'in-progress'
    },
    {
      id: '3',
      name: 'Python Fundamentals',
      category: 'Programming',
      progress: 100,
      totalHours: 20,
      completedHours: 20,
      lastAccessed: '2024-06-20',
      status: 'completed'
    },
    {
      id: '4',
      name: 'Cloud Security Fundamentals',
      category: 'Cybersecurity',
      progress: 30,
      totalHours: 18,
      completedHours: 5.4,
      lastAccessed: '2024-06-15',
      status: 'in-progress'
    },
    {
      id: '5',
      name: 'UI/UX Design Principles',
      category: 'Design',
      progress: 45,
      totalHours: 16,
      completedHours: 7.2,
      lastAccessed: '2024-06-10',
      status: 'in-progress'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredCourses = selectedPeriod === 'all' 
    ? courseProgress 
    : courseProgress.filter(course => {
        const lastAccessed = new Date(course.lastAccessed);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - lastAccessed.getTime()) / (1000 * 3600 * 24));
        
        switch (selectedPeriod) {
          case 'week':
            return diffDays <= 7;
          case 'month':
            return diffDays <= 30;
          case 'quarter':
            return diffDays <= 90;
          default:
            return true;
        }
      });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Learning Progress</h1>
              <p className="text-lg text-muted-foreground">
                Track your learning journey and achievements
              </p>
            </div>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
                  <p className="text-2xl font-bold text-foreground">{progressData.overallProgress}%</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
              <ProgressBar value={progressData.overallProgress} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Courses Completed</p>
                  <p className="text-2xl font-bold text-foreground">{progressData.coursesCompleted}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {progressData.coursesInProgress} in progress
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hours Spent</p>
                  <p className="text-2xl font-bold text-foreground">{progressData.totalHoursSpent}h</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Avg. 2.3h per day
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Learning Streak</p>
                  <p className="text-2xl font-bold text-foreground">{progressData.streak} days</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Keep it up! 🔥
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Progress */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Course Progress
                </CardTitle>
                <CardDescription>
                  Your progress across all enrolled courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCourses.map((course) => (
                    <div key={course.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{course.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {course.category}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getStatusColor(course.status)}`}
                            >
                              {course.status.replace('-', ' ')}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <div className="font-semibold">{course.progress}%</div>
                          <div className="text-muted-foreground text-xs">
                            {course.completedHours}h / {course.totalHours}h
                          </div>
                        </div>
                      </div>
                      <ProgressBar value={course.progress} className="mb-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          Continue
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Recent Achievements
                </CardTitle>
                <CardDescription>
                  Your latest learning milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {progressData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{achievement.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(achievement.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Study Streak */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Study Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Daily Goal</span>
                      <span>2.3h / 2h</span>
                    </div>
                    <ProgressBar value={115} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Weekly Goal</span>
                      <span>12h / 14h</span>
                    </div>
                    <ProgressBar value={86} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Monthly Goal</span>
                      <span>45h / 60h</span>
                    </div>
                    <ProgressBar value={75} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
