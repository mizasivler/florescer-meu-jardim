
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Pause, Clock, Heart, Moon, Sun } from 'lucide-react';

const Meditation = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMeditation, setCurrentMeditation] = useState<number | null>(null);

  const meditations = [
    {
      id: 1,
      title: 'Respiração para Ansiedade',
      description: 'Técnica calmante para momentos de estresse',
      duration: '10 min',
      icon: Heart,
      category: 'Ansiedade',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Meditação Matinal',
      description: 'Comece o dia com energia positiva',
      duration: '15 min',
      icon: Sun,
      category: 'Energia',
      color: 'bg-yellow-500'
    },
    {
      id: 3,
      title: 'Relaxamento Noturno',
      description: 'Prepare-se para uma noite tranquila',
      duration: '20 min',
      icon: Moon,
      category: 'Sono',
      color: 'bg-purple-500'
    },
    {
      id: 4,
      title: 'Autocompaixão',
      description: 'Cultive amor próprio e aceitação',
      duration: '12 min',
      icon: Heart,
      category: 'Autoestima',
      color: 'bg-pink-500'
    }
  ];

  const togglePlayback = (meditationId: number) => {
    if (currentMeditation === meditationId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentMeditation(meditationId);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen gradient-florescer pb-20">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="text-florescer-copper"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-lora font-bold text-florescer-dark">
              Meditações
            </h1>
            <p className="text-florescer-dark/70">Encontre paz e equilíbrio</p>
          </div>
        </div>

        {/* Current Session Card */}
        {currentMeditation && (
          <Card className="card-florescer mb-6 bg-gradient-to-r from-florescer-copper/10 to-florescer-olive/10">
            <div className="text-center">
              <div className="text-4xl mb-3">🧘‍♀️</div>
              <h3 className="font-lora font-semibold text-lg mb-2">
                {meditations.find(m => m.id === currentMeditation)?.title}
              </h3>
              <p className="text-florescer-dark/70 text-sm mb-4">
                {isPlaying ? 'Meditação em andamento...' : 'Meditação pausada'}
              </p>
              <Button
                onClick={() => togglePlayback(currentMeditation)}
                className="btn-primary"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Continuar
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Meditation Categories */}
      <div className="px-6">
        <h2 className="font-lora font-semibold text-xl mb-4 text-florescer-dark">
          Escolha sua meditação
        </h2>
        
        <div className="space-y-4">
          {meditations.map((meditation) => (
            <Card 
              key={meditation.id}
              className="card-florescer hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${meditation.color}`}>
                  <meditation.icon className="h-8 w-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-lora font-semibold text-lg text-florescer-dark">
                      {meditation.title}
                    </h3>
                    <span className="text-xs bg-florescer-copper/20 text-florescer-copper px-2 py-1 rounded-full">
                      {meditation.category}
                    </span>
                  </div>
                  
                  <p className="text-florescer-dark/70 text-sm mb-3">
                    {meditation.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-florescer-dark/60">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{meditation.duration}</span>
                    </div>
                    
                    <Button
                      onClick={() => togglePlayback(meditation.id)}
                      size="sm"
                      className={`${
                        currentMeditation === meditation.id && isPlaying
                          ? 'bg-florescer-copper hover:bg-florescer-copper/90'
                          : 'bg-florescer-olive hover:bg-florescer-olive/90'
                      } text-white`}
                    >
                      {currentMeditation === meditation.id && isPlaying ? (
                        <>
                          <Pause className="h-4 w-4 mr-1" />
                          Pausar
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-1" />
                          Iniciar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Access to Emergency */}
        <Card className="card-florescer mt-6 bg-gradient-to-r from-red-50 to-pink-50 border-red-100">
          <div className="text-center">
            <h3 className="font-lora font-semibold text-lg mb-2 text-red-700">
              Precisa de ajuda imediata?
            </h3>
            <p className="text-red-600/80 text-sm mb-4">
              Acesse meditações de emergência para momentos de crise
            </p>
            <Button 
              onClick={() => navigate('/emergency')}
              className="bg-red-500 hover:bg-red-600 text-white w-full"
            >
              Meditações SOS
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Meditation;
