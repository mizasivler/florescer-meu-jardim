
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
      instructions: 'Inspire por 4 segundos, segure por 4, expire por 6. Repita calmamente.'
    },
    {
      id: 2,
      title: 'Afirmação Positiva',
      description: 'Repita sua afirmação do dia para fortalecer sua autoestima',
      duration: '2 min',
      icon: Heart,
      instructions: 'Olhe no espelho e repita: "Eu sou forte, capaz e merecedora de amor e cuidado."'
    },
    {
      id: 3,
      title: 'Momento de Gratidão',
      description: 'Reflita sobre 3 coisas pelas quais você é grata hoje',
      duration: '5 min',
      icon: CheckCircle,
      instructions: 'Anote ou mentalize 3 coisas específicas que trouxeram alegria ontem.'
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
              Ritual do Dia
            </h1>
            <p className="text-florescer-dark/70">Comece seu dia com intenção</p>
          </div>
        </div>

        {/* Progress Card */}
        <Card className="card-florescer mb-6">
          <div className="text-center">
            <h3 className="font-lora font-semibold text-lg mb-2">Seu Progresso Hoje</h3>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">🌸</span>
              <span className="text-florescer-dark/70">
                {completedSteps.length} de {ritualSteps.length} concluídos
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3 bg-gray-200" />
            <p className="text-sm text-florescer-dark/60 mt-2">
              {Math.round(progressPercentage)}% do ritual completo
            </p>
          </div>
        </Card>
      </div>

      {/* Ritual Steps */}
      <div className="px-6 space-y-4">
        {ritualSteps.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          
          return (
            <Card 
              key={step.id}
              className={`card-florescer transition-all duration-300 ${
                isCompleted ? 'bg-florescer-copper/10 border-florescer-copper' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isCompleted ? 'bg-florescer-copper' : 'bg-gray-200'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6 text-white" />
                  ) : (
                    <step.icon className="h-6 w-6 text-gray-500" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-lora font-semibold text-lg text-florescer-dark">
                      {step.title}
                    </h3>
                    <div className="flex items-center gap-1 text-florescer-dark/60">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{step.duration}</span>
                    </div>
                  </div>
                  
                  <p className="text-florescer-dark/70 text-sm mb-3">
                    {step.description}
                  </p>
                  
                  <div className="bg-florescer-cream/50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-florescer-dark italic">
                      "{step.instructions}"
                    </p>
                  </div>
                  
                  <Button
                    onClick={() => toggleStepCompletion(step.id)}
                    className={`w-full ${
                      isCompleted
                        ? 'bg-florescer-copper hover:bg-florescer-copper/90'
                        : 'bg-florescer-olive hover:bg-florescer-olive/90'
                    } text-white`}
                  >
                    {isCompleted ? 'Concluído ✓' : 'Marcar como Concluído'}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Completion Message */}
      {completedSteps.length === ritualSteps.length && (
        <div className="px-6 mt-6">
          <Card className="card-florescer bg-gradient-to-r from-florescer-copper/20 to-florescer-olive/20 border-florescer-copper">
            <div className="text-center">
              <div className="text-4xl mb-3">🌟</div>
              <h3 className="font-lora font-semibold text-xl mb-2 text-florescer-dark">
                Parabéns!
              </h3>
              <p className="text-florescer-dark/70 mb-4">
                Você completou seu ritual matinal. Que seu dia seja repleto de energia positiva!
              </p>
              <Button 
                onClick={() => navigate('/meditation')}
                className="btn-primary"
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
