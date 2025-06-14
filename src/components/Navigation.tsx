
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Heart, Headphones, Calendar, MessageSquare, Settings, TreePine } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { path: '/', icon: Home, label: 'Início', color: 'text-florescer-copper' },
    { path: '/ritual', icon: Heart, label: 'Ritual', color: 'text-florescer-copper' },
    { path: '/meditation', icon: Headphones, label: 'Meditação', color: 'text-florescer-olive' },
    { path: '/forest', icon: TreePine, label: 'Floresta', color: 'text-green-600' },
    { path: '/settings', icon: Settings, label: 'Config', color: 'text-gray-600' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-2 z-50 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-2 py-3 h-auto rounded-xl transition-all duration-300 ${
                isActive 
                  ? `${item.color} bg-gradient-to-t from-florescer-cream/50 to-transparent scale-110 shadow-sm` 
                  : 'text-gray-500 hover:text-florescer-copper hover:bg-florescer-cream/30'
              }`}
            >
              <item.icon className={`h-5 w-5 transition-all duration-300 ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-xs font-medium transition-all duration-300 ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 bg-current rounded-full animate-gentle-pulse" />
              )}
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
