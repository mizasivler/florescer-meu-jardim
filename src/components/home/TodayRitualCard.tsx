
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const TodayRitualCard = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 mb-8">
      <Card 
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-3xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
        onClick={() => navigate('/ritual')}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Ritual de Hoje</h2>
            <p className="text-purple-100 text-lg mb-4">Comece seu dia com intenção e cuidado</p>
            <Button className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm">
              Começar Ritual
            </Button>
          </div>
          <div className="text-6xl opacity-80">
            🌅
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TodayRitualCard;
