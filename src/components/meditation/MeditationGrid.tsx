
import MeditationCard from './MeditationCard';

interface Meditation {
  id: number;
  title: string;
  description: string;
  duration: string;
  category: string;
  difficulty: string;
  rating: number;
  listeners: number;
  premium: boolean;
  instructor: string;
  gradient: string;
}

interface MeditationGridProps {
  meditations: Meditation[];
}

const MeditationGrid = ({ meditations }: MeditationGridProps) => {
  return (
    <div className="px-6 space-y-6">
      {meditations.map((meditation) => (
        <MeditationCard key={meditation.id} meditation={meditation} />
      ))}
    </div>
  );
};

export default MeditationGrid;
