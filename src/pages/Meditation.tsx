
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Clock, Users, Heart, Headphones, Star, Lock } from 'lucide-react';

const Meditation = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todas', icon: '🎯' },
    { id: 'anxiety', name: 'Ansiedade', icon: '😌' },
    { id: 'sleep', name: 'Sono', icon: '😴' },
    { id: 'morning', name: 'Manhã', icon: '🌅' },
    { id: 'stress', name: 'Estresse', icon: '🧘‍♀️' }
  ];

  const meditations = [
    {
      id: 1,
      title: 'Respiração para Ansiedade',
      description: 'Técnicas suaves para acalmar a mente em momentos de aflição',
      duration: '10 min',
      category: 'anxiety',
      difficulty: 'Iniciante',
      rating: 4.8,
      listeners: 1250,
      premium: false,
      instructor: 'Célia Santos',
      image: '🌸'
    },
    {
      id: 2,
      title: 'Meditação do Sono Reparador',
      description: 'Encontre paz profunda e prepare-se para um sono restaurador',
      duration: '20 min',
      category: 'sleep',
      difficulty: 'Iniciante',
      rating: 4.9,
      listeners: 2100,
      premium: false,
      instructor: 'Dra. Marina',
      image: '🌙'
    },
    {
      id: 3,
      title: 'Despertar com Gratidão',
      description: 'Comece seu dia conectada com o que há de bom em sua vida',
      duration: '8 min',
      category: 'morning',
      difficulty: 'Iniciante',
      rating: 4.7,
      listeners: 980,
      premium: false,
      instructor: 'Célia Santos',
      image: '☀️'
    },
    {
      id: 4,
      title: 'Liberando o Estresse do Corpo',
      description: 'Relaxamento progressivo para liberar tensões acumuladas',
      duration: '15 min',
      category: 'stress',
      difficulty: 'Intermediário',
      rating: 4.9,
      listeners: 1560,
      premium: true,
      instructor: 'Profa. Ana',
      image: '🌿'
    },
    {
      id: 5,
      title: 'Autocompaixão na Menopausa',
      description: 'Cultivando amor próprio durante as mudanças do corpo',
      duration: '12 min',
      category: 'anxiety',
      difficulty: 'Intermediário',
      rating: 5.0,
      listeners: 756,
      premium: true,
      instructor: 'Célia Santos',
      image: '💝'
    },
    {
      id: 6,
      title: 'Meditação dos Cinco Sentidos',
      description: 'Reconectando-se com o presente através dos sentidos',
      duration: '18 min',
      category: 'stress',
      difficulty: 'Avançado',
      rating: 4.8,
      listeners: 432,
      premium: true,
      instructor: 'Dra. Marina',
      image: '🌺'
    }
  ];

  const filteredMeditations = selectedCategory === 'all' 
    ? meditations 
    : meditations.filter(med => med.category === selectedCategory);

  const MeditationCard = ({ meditation }: { meditation: any }) => (
    <Card className="card-florescer hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-florescer-copper/20 to-florescer-olive/20 rounded-2xl flex items-center justify-center text-3xl">
              {meditation.image}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-lora font-semibold text-lg text-florescer-dark group-hover:text-florescer-copper transition-colors">
                  {meditation.title}
                </h3>
                {meditation.premium && (
                  <Lock className="h-4 w-4 text-amber-500" />
                )}
              </div>
              <p className="text-florescer-dark/60 text-sm">por {meditation.instructor}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-florescer-dark/70 text-sm leading-relaxed">
          {meditation.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-florescer-dark/60">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{meditation.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{meditation.listeners.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{meditation.rating}</span>
            </div>
          </div>
          <Badge 
            variant={meditation.difficulty === 'Iniciante' ? 'secondary' : 
                   meditation.difficulty === 'Intermediário' ? 'default' : 'destructive'}
            className="text-xs"
          >
            {meditation.difficulty}
          </Badge>
        </div>

        {/* Action Button */}
        <Button 
          className={`w-full ${
            meditation.premium 
              ? 'bg-amber-500 hover:bg-amber-600' 
              : 'btn-primary'
          } group-hover:scale-105 transition-all duration-300`}
          disabled={meditation.premium}
        >
          <Play className="h-4 w-4 mr-2" />
          {meditation.premium ? 'Premium - Desbloqueie Agora' : 'Começar Meditação'}
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen gradient-florescer pb-20">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="text-florescer-copper hover:bg-florescer-copper/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-lora font-bold text-florescer-dark">
              Meditações
            </h1>
            <p className="text-florescer-dark/70 text-lg">Encontre sua paz interior</p>
          </div>
        </div>

        {/* Featured Card */}
        <Card className="card-florescer mb-6 bg-gradient-to-r from-florescer-copper/10 to-florescer-olive/10 border-florescer-copper/20">
          <div className="text-center">
            <div className="text-4xl mb-3">🧘‍♀️</div>
            <h3 className="font-lora font-bold text-xl mb-2 text-florescer-dark">
              Sessão Guiada do Dia
            </h3>
            <p className="text-florescer-dark/70 mb-4 leading-relaxed">
              Uma prática especial selecionada para você hoje
            </p>
            <Button className="btn-primary">
              <Headphones className="h-4 w-4 mr-2" />
              Começar Agora
            </Button>
          </div>
        </Card>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-florescer-copper text-white shadow-lg'
                  : 'bg-white text-florescer-dark hover:bg-florescer-copper/10'
              }`}
            >
              <span>{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Meditations List */}
      <div className="px-6 space-y-4">
        {filteredMeditations.map((meditation) => (
          <MeditationCard key={meditation.id} meditation={meditation} />
        ))}
      </div>

      {/* Premium CTA */}
      <div className="px-6 mt-8">
        <Card className="card-florescer bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
          <div className="text-center">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="font-lora font-bold text-xl mb-2 text-amber-800">
              Desbloqueie Todas as Meditações
            </h3>
            <p className="text-amber-700/80 mb-4 leading-relaxed">
              Acesse nossa biblioteca completa com mais de 50 meditações exclusivas
            </p>
            <Button className="bg-amber-500 hover:bg-amber-600 text-white w-full font-bold">
              Upgrade para Premium - R$ 197
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Meditation;
