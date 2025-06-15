
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Clock, Users, Star, Lock } from 'lucide-react';

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
      gradient: 'from-blue-400 to-cyan-400'
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
      gradient: 'from-purple-400 to-indigo-400'
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
      gradient: 'from-yellow-400 to-orange-400'
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
      gradient: 'from-green-400 to-emerald-400'
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
      gradient: 'from-pink-400 to-purple-400'
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
      gradient: 'from-teal-400 to-blue-400'
    }
  ];

  const filteredMeditations = selectedCategory === 'all' 
    ? meditations 
    : meditations.filter(med => med.category === selectedCategory);

  const MeditationCard = ({ meditation }: { meditation: any }) => (
    <Card className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
      <div className="space-y-4">
        {/* Header with gradient icon */}
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 bg-gradient-to-r ${meditation.gradient} rounded-2xl flex items-center justify-center relative`}>
            <Play className="h-8 w-8 text-white" />
            {meditation.premium && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Lock className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {meditation.title}
            </h3>
            <p className="text-gray-500 text-sm">por {meditation.instructor}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed">
          {meditation.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
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
            className="rounded-full"
          >
            {meditation.difficulty}
          </Badge>
        </div>

        {/* Action Button */}
        <Button 
          className={`w-full rounded-2xl font-semibold ${
            meditation.premium 
              ? 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500' 
              : `bg-gradient-to-r ${meditation.gradient} hover:opacity-90`
          } text-white border-none`}
          disabled={meditation.premium}
        >
          <Play className="h-4 w-4 mr-2" />
          {meditation.premium ? 'Premium - Desbloqueie Agora' : 'Começar Meditação'}
        </Button>
      </div>
    </Card>
  );

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
            <h1 className="text-3xl font-bold text-gray-800">Meditações</h1>
            <p className="text-gray-600 text-lg">Encontre sua paz interior</p>
          </div>
        </div>

        {/* Featured Card */}
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-3xl p-8 shadow-lg mb-8">
          <div className="text-center">
            <div className="text-5xl mb-4">🧘‍♀️</div>
            <h3 className="text-2xl font-bold mb-3">Sessão Guiada do Dia</h3>
            <p className="text-purple-100 mb-6 text-lg leading-relaxed">
              Uma prática especial selecionada para você hoje
            </p>
            <Button className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm rounded-2xl font-semibold px-8">
              Começar Agora
            </Button>
          </div>
        </Card>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 font-medium ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Meditations Grid */}
      <div className="px-6 space-y-6">
        {filteredMeditations.map((meditation) => (
          <MeditationCard key={meditation.id} meditation={meditation} />
        ))}
      </div>

      {/* Premium CTA */}
      <div className="px-6 mt-8">
        <Card className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-3xl p-8 shadow-lg">
          <div className="text-center">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-2xl font-bold mb-3">Desbloqueie Todas as Meditações</h3>
            <p className="text-yellow-100 mb-6 text-lg leading-relaxed">
              Acesse nossa biblioteca completa com mais de 50 meditações exclusivas
            </p>
            <Button className="bg-white text-orange-500 hover:bg-gray-50 font-bold text-lg py-4 px-8 rounded-2xl">
              Upgrade para Premium - R$ 197
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Meditation;
