
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, User, Mail } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    initialMood: '',
    menopauseType: ''
  });

  const moodOptions = [
    { emoji: '😴', label: 'Exausta e sem energia', value: 'exhausted', type: 'A' },
    { emoji: '😰', label: 'Ansiosa e preocupada', value: 'anxious', type: 'B' },
    { emoji: '🥺', label: 'Sensível e emotiva', value: 'sensitive', type: 'C' },
    { emoji: '😤', label: 'Irritada com tudo', value: 'irritated', type: 'D' },
    { emoji: '🌟', label: 'Otimista mas insegura', value: 'hopeful', type: 'E' }
  ];

  const menopauseTypes = {
    A: {
      title: "Menopausa do Cansaço",
      description: "Você está passando por uma fase de exaustão física e mental. É natural sentir-se sem energia.",
      message: "Sua jornada será focada em restaurar sua vitalidade gradualmente."
    },
    B: {
      title: "Menopausa da Ansiedade",
      description: "As mudanças hormonais estão afetando seu sistema nervoso, gerando preocupações.",
      message: "Vamos trabalhar técnicas de respiração e tranquilização."
    },
    C: {
      title: "Menopausa Sensível",
      description: "Suas emoções estão mais intensas. Isso é completamente normal nesta fase.",
      message: "Focaremos em acolhimento emocional e autocompaixão."
    },
    D: {
      title: "Menopausa da Irritação",
      description: "A irritabilidade é um dos sintomas mais comuns. Você não está sozinha.",
      message: "Trabalharemos paciência e técnicas de autorregulação."
    },
    E: {
      title: "Menopausa da Esperança",
      description: "Você mantém o otimismo, mas sente insegurança sobre as mudanças.",
      message: "Vamos fortalecer sua confiança nesta nova fase da vida."
    }
  };

  const handleMoodSelect = (mood: any) => {
    setUserData(prev => ({
      ...prev,
      initialMood: mood.value,
      menopauseType: mood.type
    }));
    setStep(3);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="card-florescer max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-florescer-copper rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h2 className="font-lora font-bold text-2xl mb-2">Bem-vinda ao Florescer 21</h2>
              <p className="text-florescer-dark/70">
                Sua jornada de autoconhecimento e bem-estar na menopausa começa aqui.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-base font-medium">Nome</Label>
                <Input
                  id="name"
                  placeholder="Digite seu nome"
                  value={userData.name}
                  onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 h-12 text-lg"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-base font-medium">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={userData.email}
                  onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 h-12 text-lg"
                />
              </div>

              <Button 
                onClick={() => setStep(2)} 
                disabled={!userData.name || !userData.email}
                className="btn-primary w-full mt-6 h-12 text-lg"
              >
                Continuar
              </Button>
            </div>
          </Card>
        );

      case 2:
        return (
          <Card className="card-florescer max-w-md mx-auto">
            <div className="text-center mb-6">
              <h2 className="font-lora font-bold text-2xl mb-2">Como você está se sentindo?</h2>
              <p className="text-florescer-dark/70">
                Escolha a opção que mais representa seu estado atual
              </p>
            </div>

            <div className="space-y-3">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => handleMoodSelect(mood)}
                  className="w-full p-4 text-left border border-gray-200 rounded-xl hover:bg-florescer-copper/5 hover:border-florescer-copper transition-all duration-300"
                >
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">{mood.emoji}</span>
                    <span className="font-medium text-lg">{mood.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        );

      case 3:
        const typeInfo = menopauseTypes[userData.menopauseType as keyof typeof menopauseTypes];
        return (
          <Card className="card-florescer max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-florescer-olive rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌸</span>
              </div>
              <h2 className="font-lora font-bold text-2xl mb-2">{typeInfo.title}</h2>
              <p className="text-florescer-dark/70 mb-4">
                {typeInfo.description}
              </p>
              <div className="bg-florescer-cream p-4 rounded-xl">
                <p className="font-medium text-florescer-copper">
                  {typeInfo.message}
                </p>
              </div>
            </div>

            <Button 
              onClick={() => setStep(4)} 
              className="btn-primary w-full h-12 text-lg"
            >
              Conhecer a Célia
            </Button>
          </Card>
        );

      case 4:
        return (
          <Card className="card-florescer max-w-md mx-auto">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-florescer-copper to-florescer-olive rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-white" />
              </div>
              <h2 className="font-lora font-bold text-2xl mb-4">Olá, sou a Célia</h2>
              
              <div className="bg-gradient-to-r from-florescer-copper/10 to-florescer-olive/10 p-6 rounded-xl mb-6 text-left">
                <p className="text-lg leading-relaxed">
                  "Querida {userData.name}, é uma alegria ter você aqui. 
                  Durante os próximos 21 dias, estarei ao seu lado nesta jornada de 
                  autoconhecimento e florescimento. Cada dia será uma oportunidade 
                  de cuidar de você mesma com o carinho que merece."
                </p>
              </div>

              <div className="flex gap-3 mb-6">
                <Button variant="outline" className="flex-1">
                  🔊 Ouvir em áudio
                </Button>
                <Button variant="outline" className="flex-1">
                  💗 Salvar no coração
                </Button>
              </div>

              <Button 
                onClick={onComplete} 
                className="btn-primary w-full h-12 text-lg"
              >
                Começar minha jornada
              </Button>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen gradient-florescer flex items-center justify-center p-6">
      {renderStep()}
    </div>
  );
};

export default OnboardingFlow;
