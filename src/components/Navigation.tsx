
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Heart, Headphones, Calendar, MessageSquare, Settings, TreePine } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/ritual', icon: Heart, label: 'Ritual' },
    { path: '/meditation', icon: Headphones, label: 'Meditação' },
    { path: '/forest', icon: TreePine, label: 'Floresta' },
    { path: '/settings', icon: Settings, label: 'Config' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navigationItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            size="sm"
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 px-2 py-3 h-auto ${
              location.pathname === item.path 
                ? 'text-florescer-copper' 
                : 'text-gray-500'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
