
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, Clock, Heart, Droplets } from 'lucide-react';

const RitualOfTheDay = () => {
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const ritualSteps = [
    {
      id: 1,
      title: 'Respiração Matinal',
      description: 'Respire profundamente por 3 minutos para começar o dia',
      duration: '3 min',
      icon: Droplets,
      instructions: 'Inspire por 4 segundos, segure por 4, expire por 6. Repita calmamente.',
      gradient: 'from-blue-400 to-cyan-400'
    },
    {
      id: 2,
      title: 'Afirmação Positiva',
      description: 'Repita sua afirmação do dia para fortalecer sua autoestima',
      duration: '2 min',
      icon: Heart,
      instructions: 'Olhe no espelho e repita: "Eu sou forte, capaz e merecedora de amor e cuidado."',
      gradient: 'from-pink-400 to-purple-400'
    },
    {
      id: 3,
      title: 'Momento de Gratidão',
      description: 'Reflita sobre 3 coisas pelas quais você é grata hoje',
      duration: '5 min',
      icon: CheckCircle,
      instructions: 'Anote ou mentalize 3 coisas específicas que trouxeram alegria ontem.',
      gradient: 'from-green-400 to-emerald-400'
    }
  ];

  const toggleStepCompletion = (stepId: number) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter(id => id !== stepId));
    } else {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const progressPercentage = (completedSteps.length / ritualSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pb-20">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="text-gray-600 hover:bg-white/50 rounded-full p-3"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Ritual do Dia</h1>
            <p className="text-gray-600 text-lg">Comece seu dia com intenção</p>
          </div>
        </div>

        {/* Progress Card */}
        <Card className="bg-white rounded-3xl p-8 shadow-sm mb-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Seu Progresso Hoje</h3>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-4xl">🌸</span>
              <span className="text-gray-600 text-lg">
                {completedSteps.length} de {ritualSteps.length} concluídos
              </span>
            </div>
            <Progress value={progressPercentage} className="h-4 bg-gray-100 mb-4" />
            <p className="text-gray-500">
              {Math.round(progressPercentage)}% do ritual completo
            </p>
          </div>
        </Card>
      </div>

      {/* Ritual Steps */}
      <div className="px-6 space-y-6">
        {ritualSteps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          
          return (
            <Card 
              key={step.id}
              className={`bg-white rounded-3xl p-6 shadow-sm transition-all duration-300 ${
                isCompleted ? 'ring-2 ring-purple-200 bg-purple-50' : ''
              }`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                      : `bg-gradient-to-r ${step.gradient}`
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-8 w-8 text-white" />
                    ) : (
                      <step.icon className="h-8 w-8 text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {step.title}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium">{step.duration}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Instructions */}
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-gray-700 italic leading-relaxed">
                    "{step.instructions}"
                  </p>
                </div>
                
                {/* Action Button */}
                <Button
                  onClick={() => toggleStepCompletion(step.id)}
                  className={`w-full rounded-2xl font-semibold py-4 ${
                    isCompleted
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                      : `bg-gradient-to-r ${step.gradient} hover:opacity-90`
                  } text-white border-none transition-all duration-300`}
                >
                  {isCompleted ? '✓ Concluído' : 'Marcar como Concluído'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Completion Message */}
      {completedSteps.length === ritualSteps.length && (
        <div className="px-6 mt-8">
          <Card className="bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-3xl p-8 shadow-lg">
            <div className="text-center">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold mb-3">Parabéns!</h3>
              <p className="text-green-100 mb-6 text-lg leading-relaxed">
                Você completou seu ritual matinal. Que seu dia seja repleto de energia positiva!
              </p>
              <Button 
                onClick={() => navigate('/meditation')}
                className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm rounded-2xl font-semibold px-8"
              >
                Continuar com Meditação
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RitualOfTheDay;
