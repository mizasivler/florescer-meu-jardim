
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, ArrowRight, User, Smile, Activity } from 'lucide-react';
import { useOnboarding, type OnboardingData } from '@/hooks/useOnboarding';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({});
  const { completeOnboarding, loading } = useOnboarding();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    console.log('Completing onboarding with data:', formData);
    const { error } = await completeOnboarding(formData);
    if (!error) {
      onComplete();
    }
  };

  const updateFormData = (field: keyof OnboardingData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen gradient-florescer flex items-center justify-center p-6">
      <Card className="card-florescer max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-florescer-copper rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-lora font-bold text-florescer-dark mb-2">
            Bem-vinda ao Florescer 21
          </h1>
          <p className="text-florescer-dark/70 text-lg">
            Vamos personalizar sua jornada de transformação
          </p>
          
          {/* Progress indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i <= step ? 'bg-florescer-copper' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="w-12 h-12 text-florescer-copper mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-florescer-dark">Como você gostaria de ser chamada?</h2>
              <p className="text-florescer-dark/70">Personalizaremos sua experiência</p>
            </div>
            
            <div>
              <Label htmlFor="name" className="text-base font-medium">Seu nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                value={formData.name || ''}
                onChange={(e) => updateFormData('name', e.target.value)}
                className="mt-1 h-12 text-lg"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Smile className="w-12 h-12 text-florescer-copper mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-florescer-dark">Como você está se sentindo?</h2>
              <p className="text-florescer-dark/70">Vamos começar conhecendo seu estado atual</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: 'tired', label: 'Cansada', emoji: '😴' },
                { value: 'anxious', label: 'Ansiosa', emoji: '😰' },
                { value: 'sensitive', label: 'Sensível', emoji: '🥺' },
                { value: 'irritated', label: 'Irritada', emoji: '😤' },
                { value: 'hopeful', label: 'Esperançosa', emoji: '🌟' }
              ].map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => updateFormData('initialMood', mood.value)}
                  className={`p-4 rounded-2xl border-2 transition-all text-left ${
                    formData.initialMood === mood.value
                      ? 'border-florescer-copper bg-florescer-copper/10'
                      : 'border-gray-200 hover:border-florescer-copper/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{mood.emoji}</span>
                    <span className="font-medium text-florescer-dark">{mood.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Activity className="w-12 h-12 text-florescer-copper mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-florescer-dark">Sobre sua menopausa</h2>
              <p className="text-florescer-dark/70">Isso nos ajuda a personalizar seu programa</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: 'perimenopause', label: 'Pré-menopausa', desc: 'Ciclos irregulares' },
                { value: 'menopause', label: 'Menopausa', desc: 'Sem menstruar há 12+ meses' },
                { value: 'postmenopause', label: 'Pós-menopausa', desc: 'Menopausa há mais de 1 ano' },
                { value: 'not_sure', label: 'Não tenho certeza', desc: 'Vamos descobrir juntas' }
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => updateFormData('menopauseType', type.value)}
                  className={`p-4 rounded-2xl border-2 transition-all text-left ${
                    formData.menopauseType === type.value
                      ? 'border-florescer-copper bg-florescer-copper/10'
                      : 'border-gray-200 hover:border-florescer-copper/50'
                  }`}
                >
                  <div className="font-medium text-florescer-dark">{type.label}</div>
                  <div className="text-sm text-florescer-dark/70">{type.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <Button 
            onClick={handleNext}
            disabled={loading || (step === 1 && !formData.name)}
            className="btn-primary w-full h-12 text-lg"
          >
            {loading 
              ? 'Salvando...' 
              : step === 3 
                ? 'Começar Jornada' 
                : 'Continuar'
            }
            {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
