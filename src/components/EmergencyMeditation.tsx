
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, Play, Pause, RotateCcw } from 'lucide-react';

const EmergencyMeditation = () => {
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const emergencyAudios = [
    {
      id: 'sleep',
      title: 'Volte a Dormir',
      description: 'Para noites de insônia e pensamentos acelerados',
      duration: '12 min',
      color: 'from-indigo-400 to-purple-500',
      icon: '🌙',
      situation: 'Quando o sono não vem'
    },
    {
      id: 'anxiety',
      title: 'Segura em Mim',
      description: 'Para momentos de ansiedade e pânico',
      duration: '8 min',
      color: 'from-blue-400 to-cyan-500',
      icon: '🤝',
      situation: 'Quando a ansiedade aperta'
    },
    {
      id: 'clarity',
      title: 'Clareza no Caos',
      description: 'Para confusão mental e indecisão',
      duration: '10 min',
      color: 'from-emerald-400 to-teal-500',
      icon: '🧠',
      situation: 'Quando tudo parece confuso'
    }
  ];

  const handlePlayPause = (audioId: string) => {
    if (currentAudio === audioId && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentAudio(audioId);
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentAudio(null);
  };

  return (
    <div className="min-h-screen gradient-florescer p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Headphones className="h-8 w-8 text-white" />
          </div>
          <h1 className="font-lora font-bold text-3xl mb-2 text-florescer-dark">
            Meditações SOS
          </h1>
          <p className="text-florescer-dark/70">
            Para quando você precisa de apoio imediato
          </p>
        </div>

        {/* Emergency Message */}
        <Card className="card-florescer mb-6 bg-gradient-to-r from-red-50 to-pink-50 border-red-100">
          <div className="text-center">
            <h3 className="font-lora font-semibold text-lg mb-2 text-red-700">
              Você não está sozinha
            </h3>
            <p className="text-red-600/80 text-sm">
              Estes áudios estão disponíveis 24h para te acolher nos momentos mais difíceis.
            </p>
          </div>
        </Card>

        {/* Audio Cards */}
        <div className="space-y-4 mb-6">
          {emergencyAudios.map((audio) => (
            <Card key={audio.id} className="card-florescer overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${audio.color}`}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="text-3xl mr-3">{audio.icon}</div>
                    <div>
                      <h3 className="font-lora font-semibold text-lg">{audio.title}</h3>
                      <p className="text-sm text-florescer-dark/70">{audio.duration}</p>
                    </div>
                  </div>
                </div>

                <p className="text-florescer-dark/70 text-sm mb-2">{audio.description}</p>
                <p className="text-xs text-florescer-copper font-medium mb-4">
                  💡 {audio.situation}
                </p>

                {/* Audio Controls */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handlePlayPause(audio.id)}
                    className={`flex-1 ${
                      currentAudio === audio.id && isPlaying
                        ? 'bg-red-500 hover:bg-red-600'
                        : `bg-gradient-to-r ${audio.color} hover:opacity-90`
                    } text-white`}
                  >
                    {currentAudio === audio.id && isPlaying ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Ouvir agora
                      </>
                    )}
                  </Button>
                  
                  {currentAudio === audio.id && (
                    <Button
                      onClick={handleStop}
                      variant="outline"
                      size="sm"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Progress Indicator */}
                {currentAudio === audio.id && isPlaying && (
                  <div className="mt-3">
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-florescer-copper to-florescer-olive animate-pulse"></div>
                    </div>
                    <p className="text-xs text-florescer-dark/60 mt-1 text-center">
                      Reproduzindo... Respire fundo e acompanhe.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Support Message */}
        <Card className="card-florescer bg-gradient-to-r from-florescer-copper/5 to-florescer-olive/5">
          <div className="text-center">
            <div className="text-2xl mb-3">🤗</div>
            <h3 className="font-lora font-semibold text-lg mb-2">
              Lembre-se
            </h3>
            <p className="text-florescer-dark/70 text-sm">
              Momentos difíceis fazem parte da jornada. O importante é que você está 
              aqui, cuidando de si mesma. Isso já é uma grande vitória.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyMeditation;
