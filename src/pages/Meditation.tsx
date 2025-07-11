
import { useState, useEffect } from 'react';
import MeditationHeader from '@/components/meditation/MeditationHeader';
import FeaturedCard from '@/components/meditation/FeaturedCard';
import CategoryFilter from '@/components/meditation/CategoryFilter';
import MeditationGrid from '@/components/meditation/MeditationGrid';
import MeditationPremiumCTA from '@/components/meditation/MeditationPremiumCTA';
import { useMeditation } from '@/hooks/useMeditation';
import { useToast } from '@/hooks/use-toast';

const Meditation = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { completeMeditation, getMeditationStats } = useMeditation();
  const { toast } = useToast();
  const [stats, setStats] = useState({ totalSessions: 0, totalMinutes: 0, averageRating: 0 });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const meditationStats = await getMeditationStats();
    setStats(meditationStats);
  };

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
      gradient: 'from-blue-400 to-cyan-400',
      onPlay: () => handleMeditationComplete(1, 'Respiração para Ansiedade', 10)
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
      gradient: 'from-purple-400 to-indigo-400',
      onPlay: () => handleMeditationComplete(2, 'Meditação do Sono Reparador', 20)
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
      gradient: 'from-yellow-400 to-orange-400',
      onPlay: () => handleMeditationComplete(3, 'Despertar com Gratidão', 8)
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
      gradient: 'from-green-400 to-emerald-400',
      onPlay: () => handlePremiumRequired()
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
      gradient: 'from-pink-400 to-purple-400',
      onPlay: () => handlePremiumRequired()
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
      gradient: 'from-teal-400 to-blue-400',
      onPlay: () => handlePremiumRequired()
    }
  ];

  const handleMeditationComplete = async (id: number, title: string, duration: number) => {
    const success = await completeMeditation({
      meditationId: id,
      title,
      duration,
      rating: 5 // Default rating, could be collected from user
    });

    if (success.error === null) {
      await loadStats(); // Refresh stats after completion
    }
  };

  const handlePremiumRequired = () => {
    toast({
      title: "Recurso Premium",
      description: "Esta meditação está disponível apenas para usuárias Premium. Faça upgrade para acessar!",
      variant: "destructive"
    });
  };

  const filteredMeditations = selectedCategory === 'all' 
    ? meditations 
    : meditations.filter(med => med.category === selectedCategory);

  return (
    <div className="min-h-screen gradient-florescer pb-20">
      <MeditationHeader stats={stats} />
      
      <div className="px-6">
        <FeaturedCard />
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      <MeditationGrid meditations={filteredMeditations} />
      <MeditationPremiumCTA />
    </div>
  );
};

export default Meditation;
