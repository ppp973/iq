'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { 
  Search, 
  Heart, 
  Play, 
  Sparkles, 
  Compass, 
  TrendingUp, 
  Star, 
  BookOpen, 
  Award,
  Flame,
  Layers,
  Zap,
  Clock,
  ChevronRight,
  Users,
  BarChart3,
  Globe,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import coursesData from '@/data/courses.json';

// --- Types ---
interface Course {
  id: number | string;
  title: string;
  category?: string;
  level?: string;
  duration?: string;
  students?: number;
  rating?: number;
}

// --- NEW SPLASH SCREEN ---
const SplashScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
    className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center"
  >
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="relative w-32 h-32 md:w-40 md:h-40">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity }
          }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/30"
        />
        <div className="absolute inset-2 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20">
          <img 
            src="https://i.pinimg.com/736x/a6/e8/4c/a6e84cd182745f53f833b579ebe88e28.jpg" 
            alt="Logo" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold mt-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
      >
        LEARNVERSE
      </motion.h2>
    </motion.div>
  </motion.div>
);

// Category Data
const categories = [
  { name: 'Development', icon: Code, color: 'from-blue-500 to-cyan-500', count: 45 },
  { name: 'Design', icon: PenTool, color: 'from-purple-500 to-pink-500', count: 32 },
  { name: 'Business', icon: TrendingUp, color: 'from-green-500 to-emerald-500', count: 28 },
  { name: 'Marketing', icon: BarChart3, color: 'from-orange-500 to-red-500', count: 23 },
  { name: 'Data Science', icon: Database, color: 'from-indigo-500 to-purple-500', count: 19 },
  { name: 'AI & ML', icon: Brain, color: 'from-violet-500 to-fuchsia-500', count: 16 },
];

// Icons import
function Code(props: any) { return <Layers {...props} />; }
function PenTool(props: any) { return <BookOpen {...props} />; }
function Database(props: any) { return <BarChart3 {...props} />; }
function Brain(props: any) { return <Zap {...props} />; }

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(8);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 2000);
    const loadTimer = setTimeout(() => setIsLoading(false), 500);
    const savedFavs = localStorage.getItem('learnverse_favs');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    
    return () => {
      clearTimeout(splashTimer);
      clearTimeout(loadTimer);
    };
  }, []);

  const sortedCourses = useMemo(() => {
    return [...coursesData].sort((a: Course, b: Course) => Number(b.id) - Number(a.id));
  }, []);

  const filteredCourses = useMemo(() => {
    return sortedCourses.filter((course: Course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.id.toString().includes(searchQuery);
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, sortedCourses]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavs = favorites.includes(id) 
      ? favorites.filter(f => f !== id) 
      : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('learnverse_favs', JSON.stringify(newFavs));
  };

  // Stats for featured section
  const totalStudents = 15420;
  const totalCourses = coursesData.length;
  const liveNow = 12;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white">
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>

      <Navbar />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-600/5 to-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <main className="relative pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-medium text-white/60">Your learning journey starts here</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Master the Future
              </span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
              Join millions of learners and access 1000+ courses taught by industry experts
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <Users className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{totalStudents.toLocaleString()}+</div>
                  <div className="text-xs text-white/40">Active Students</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{totalCourses}+</div>
                  <div className="text-xs text-white/40">Expert Courses</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-green-500/10">
                  <Flame className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{liveNow}</div>
                  <div className="text-xs text-white/40">Live Now</div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20" />
              <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                <Search className="absolute left-5 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search for courses, topics, or skills..."
                  className="w-full bg-transparent py-5 pl-14 pr-36 text-white placeholder-white/40 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-purple-600/25 transition-all">
                  Search
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Categories */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Compass className="w-6 h-6 text-purple-400" />
              Explore Categories
            </h2>
            <button className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedCategory(selectedCategory === category.name.toLowerCase() ? 'all' : category.name.toLowerCase())}
                  className={`group relative p-6 rounded-2xl border transition-all ${
                    selectedCategory === category.name.toLowerCase()
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-white/5 bg-white/5 hover:border-white/10'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                  <div className="relative flex flex-col items-center text-center">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} mb-3`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                    <p className="text-xs text-white/40">{category.count} courses</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Featured Courses */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              Trending Now
            </h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-xl bg-white/5 text-sm font-medium border border-white/10 hover:border-white/20 transition-colors">
                Most Popular
              </button>
              <button className="px-4 py-2 rounded-xl bg-white/5 text-sm font-medium border border-white/10 hover:border-white/20 transition-colors">
                Newest
              </button>
              <button className="px-4 py-2 rounded-xl bg-white/5 text-sm font-medium border border-white/10 hover:border-white/20 transition-colors">
                Top Rated
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.slice(0, visibleCount).map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative"
              >
                <Link href={`/course/${course.id}`}>
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                    
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src="/mybatches.png"
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-xs font-medium">
                          #{course.id}
                        </span>
                        {index < 3 && (
                          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-medium">
                            🔥 Hot
                          </span>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => toggleFavorite(course.id.toString(), e)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 hover:bg-purple-500/20 transition-colors"
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(course.id.toString()) ? 'fill-red-500 text-red-500' : 'text-white/60'}`} />
                      </button>

                      {/* Course Stats */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span>8h 30m</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-3 h-3" />
                          <span>1.2k</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                          <span>4.8</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                        {course.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-black" />
                          ))}
                        </div>
                        <span className="text-xs text-white/40">+24 students</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-white/40 line-through">$99.99</span>
                          <span className="text-xl font-bold text-purple-400 ml-2">Free</span>
                        </div>
                        
                        <div className="p-2 rounded-xl bg-white/10 group-hover:bg-purple-500 transition-colors">
                          <Play className="w-4 h-4 fill-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          {filteredCourses.length > visibleCount && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setVisibleCount(prev => prev + 8)}
                className="group relative px-8 py-4 rounded-xl bg-white/5 border border-white/10 font-semibold hover:border-purple-500/50 transition-all overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  Load More Courses
                  <Rocket className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </button>
            </div>
          )}
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20"
            >
              <div className="p-3 rounded-xl bg-purple-500/20 w-fit mb-4">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
              <p className="text-white/40">Learn from industry leaders with years of real-world experience</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20"
            >
              <div className="p-3 rounded-xl bg-blue-500/20 w-fit mb-4">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Learn Anywhere</h3>
              <p className="text-white/40">Access your courses on mobile, tablet, or desktop - anytime, anywhere</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20"
            >
              <div className="p-3 rounded-xl bg-green-500/20 w-fit mb-4">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Lifetime Access</h3>
              <p className="text-white/40">Get unlimited access to all course materials forever</p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-20">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-90" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            </div>
            
            <div className="relative px-8 py-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of students and start your learning journey today
              </p>
              <button className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:shadow-xl hover:shadow-white/25 transition-all">
                Get Started Now
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                LEARNVERSE
              </h3>
              <p className="text-white/40 text-sm">
                Empowering learners worldwide with quality education
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/guides" className="hover:text-white transition-colors">Guides</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-white/40 pt-8 border-t border-white/10">
            © 2024 LearnVerse. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
