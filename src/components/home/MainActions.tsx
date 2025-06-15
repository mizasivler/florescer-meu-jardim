
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, MessageSquare, Calendar, Activity, Zap } from 'lucide-react';

const MainActions = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 space-y-4">
      {/* Meditation */}
      <Card 
        className="bg-white rounded-3xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
        onClick={() => navigate('/meditation')}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center">
            <Headphones className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Meditação</h3>
            <p className="text-gray-600">Encontre sua paz interior</p>
          </div>
          <div className="text-3xl">🧘‍♀️</div>
        </div>
      </Card>

      {/* Diary */}
      <Card 
        className="bg-white rounded-3xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
        onClick={() => navigate('/diary')}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Diário da Emoção</h3>
            <p className="text-gray-600">Registre seus sentimentos</p>
          </div>
          <div className="text-3xl">📝</div>
        </div>
      </Card>

      {/* Planner */}
      <Card 
        className="bg-white rounded-3xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
        onClick={() => navigate('/planner')}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Meu Planner</h3>
            <p className="text-gray-600">Organize seu bem-estar</p>
          </div>
          <div className="text-3xl">📅</div>
        </div>
      </Card>

      {/* Forest */}
      <Card 
        className="bg-white rounded-3xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
        onClick={() => navigate('/forest')}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-green-400 rounded-2xl flex items-center justify-center">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Minha Floresta</h3>
            <p className="text-gray-600">Veja seu progresso florescer</p>
          </div>
          <div className="text-3xl">🌸</div>
        </div>
      </Card>

      {/* Emergency Button */}
      <Card 
        className="bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-3xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
        onClick={() => navigate('/emergency')}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">Preciso disso agora</h3>
            <p className="text-red-100">Meditações de emergência</p>
          </div>
          <div className="text-3xl opacity-80">🚨</div>
        </div>
      </Card>
    </div>
  );
};

export default MainActions;
