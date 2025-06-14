
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MyForest = () => {
  const [completedDays, setCompletedDays] = useState(5);
  const [achievements, setAchievements] = useState([
    { id: 1, name: 'Primeira Flor', icon: '🌱', unlocked: true, day: 1 },
    { id: 2, name: 'Jardim com 7 flores', icon: '🌷', unlocked: false, day: 7 },
    { id: 3, name: 'Floresta Completa', icon: '🌸', unlocked: false, day: 21 }
  ]);

  const renderFlowerGarden = () => {
    const flowers = [];
    const totalDays = 21;
    
    for (let i = 0; i < totalDays; i++) {
      const isBloomeda = i < completedDays;
      flowers.push(
        <div
          key={i}
          className={`relative transition-all duration-500 ${
            isBloomeda ? 'animate-bloom' : ''
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
              isBloomeda 
                ? 'bg-gradient-to-br from-pink-100 to-pink-200 shadow-lg' 
                : 'bg-gray-100 border-2 border-dashed border-gray-300'
            }`}
          >
            {isBloomeda ? '🌸' : '⭕'}
          </div>
          {isBloomeda && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-florescer-copper rounded-full text-white text-xs flex items-center justify-center font-bold">
              {i + 1}
            </div>
          )}
        </div>
      );
    }

    return flowers;
  };

  return (
    <div className="min-h-screen gradient-florescer p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="font-lora font-bold text-3xl mb-2 text-florescer-dark">
            Minha Floresta
          </h1>
          <p className="text-florescer-dark/70">
            Cada ritual concluído faz uma nova flor crescer
          </p>
        </div>

        {/* Progress Summary */}
        <Card className="card-florescer mb-6">
          <div className="text-center">
            <div className="text-4xl mb-2">🌸</div>
            <h3 className="font-lora font-semibold text-xl mb-1">
              {completedDays} de 21 flores
            </h3>
            <p className="text-florescer-dark/70">
              {Math.round((completedDays / 21) * 100)}% da sua floresta criada
            </p>
          </div>
        </Card>

        {/* Flower Garden */}
        <Card className="card-florescer mb-6">
          <h3 className="font-lora font-semibold text-lg mb-4 text-center">
            Seu Jardim Pessoal
          </h3>
          <div className="grid grid-cols-7 gap-3 justify-items-center">
            {renderFlowerGarden()}
          </div>
          
          <div className="mt-6 p-4 bg-florescer-cream rounded-xl">
            <p className="text-sm text-florescer-dark/70 text-center">
              Complete seu ritual diário para fazer uma nova flor crescer! 🌱
            </p>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="card-florescer mb-6">
          <h3 className="font-lora font-semibold text-lg mb-4">Conquistas</h3>
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center p-3 rounded-xl ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-r from-florescer-copper/10 to-florescer-olive/10 border border-florescer-copper/20' 
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className={`text-2xl mr-3 ${achievement.unlocked ? '' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${achievement.unlocked ? 'text-florescer-dark' : 'text-gray-500'}`}>
                    {achievement.name}
                  </h4>
                  <p className={`text-sm ${achievement.unlocked ? 'text-florescer-dark/70' : 'text-gray-400'}`}>
                    Dia {achievement.day}
                  </p>
                </div>
                {achievement.unlocked && (
                  <Badge className="bg-florescer-copper text-white">
                    Conquistado!
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Inspiration Message */}
        <Card className="card-florescer bg-gradient-to-r from-florescer-copper/5 to-florescer-olive/5">
          <div className="text-center">
            <div className="text-3xl mb-3">🌺</div>
            <h3 className="font-lora font-semibold text-lg mb-2">
              Você está florescendo!
            </h3>
            <p className="text-florescer-dark/70 text-sm">
              Cada passo nesta jornada é uma vitória. Continue cuidando de você mesma 
              com o carinho que sempre mereceu.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MyForest;
