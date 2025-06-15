
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Heart, Headphones, Calendar, MessageSquare, Settings, TreePine } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { path: '/', icon: Home, label: 'Início', gradient: 'from-purple-400 to-pink-400' },
    { path: '/ritual', icon: Heart, label: 'Ritual', gradient: 'from-pink-400 to-purple-400' },
    { path: '/meditation', icon: Headphones, label: 'Meditação', gradient: 'from-blue-400 to-cyan-400' },
    { path: '/forest', icon: TreePine, label: 'Floresta', gradient: 'from-green-400 to-emerald-400' },
    { path: '/settings', icon: Settings, label: 'Config', gradient: 'from-gray-400 to-gray-500' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-3 z-50 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-2 px-3 py-4 h-auto rounded-2xl transition-all duration-500 ${
                isActive 
                  ? 'scale-105' 
                  : 'hover:shadow-sm hover:-translate-y-0.5'
              }`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 relative ${
                isActive 
                  ? 'shadow-lg' 
                  : 'bg-gray-100 hover:shadow-sm'
              }`}>
                {isActive && (
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.gradient} opacity-20 backdrop-blur-sm border border-white/30`} />
                )}
                <div className={`relative z-10 w-8 h-8 rounded-xl flex items-center justify-center ${
                  isActive 
                    ? `bg-gradient-to-r ${item.gradient}` 
                    : ''
                }`}>
                  <item.icon className={`h-5 w-5 transition-all duration-500 ${
                    isActive ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
              </div>
              <span className={`text-xs font-medium transition-all duration-500 ${
                isActive ? 'text-gray-800 font-bold' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
              )}
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
