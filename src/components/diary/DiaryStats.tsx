
import { Card } from "@/components/ui/card";
import { DiaryEntry } from '@/types/diary';

interface DiaryStatsProps {
  entries: DiaryEntry[];
}

const DiaryStats = ({ entries }: DiaryStatsProps) => {
  const getMoodEmoji = (mood: string) => {
    // Mapeamento consistente com EntryList
    switch (mood.toLowerCase()) {
      case 'esperançosa': return '🌟';
      case 'aflita': return '😰';
      case 'cansada': return '😴';
      case 'irritada': return '😤';
      case 'sensível': return '🥺';
      case 'sensivel': return '🥺'; // fallback sem acento
      default: return '😊';
    }
  };

  const lastMoodEmoji = entries.length > 0 ? getMoodEmoji(entries[0]?.mood) : '😊';

  return (
    <Card className="card-florescer mb-6">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-florescer-copper">{entries.length}</div>
          <div className="text-sm text-florescer-dark/60">Entradas</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-florescer-olive">
            {entries.length > 0 ? Math.max(1, entries.length) : 0}
          </div>
          <div className="text-sm text-florescer-dark/60">Dias ativos</div>
        </div>
        <div>
          <div className="text-2xl">{lastMoodEmoji}</div>
          <div className="text-sm text-florescer-dark/60">Último humor</div>
        </div>
      </div>
    </Card>
  );
};

export default DiaryStats;
