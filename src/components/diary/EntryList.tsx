
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit } from 'lucide-react';
import { DiaryEntry } from '@/types/diary';

interface EntryListProps {
  entries: DiaryEntry[];
}

const EntryList = ({ entries }: EntryListProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getMoodEmoji = (mood: string) => {
    // Mapeamento correto baseado nos labels em português
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

  return (
    <div className="space-y-4">
      <h2 className="font-lora font-semibold text-xl text-florescer-dark">
        Minhas Entradas
      </h2>
      
      {entries.map((entry) => (
        <Card key={entry.id} className="card-florescer">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {getMoodEmoji(entry.mood)}
                </span>
                <div>
                  <h3 className="font-lora font-semibold text-lg text-florescer-dark">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-florescer-dark/60">
                    {formatDate(entry.date)} • {entry.mood}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-florescer-dark/80 text-sm mb-4 line-clamp-3">
              {entry.content}
            </p>
            
            {entry.gratitude_items && entry.gratitude_items.length > 0 && (
              <div className="bg-florescer-cream/50 rounded-lg p-3 mb-3">
                <h4 className="font-medium text-sm text-florescer-dark mb-2">Gratidão:</h4>
                <div className="space-y-1">
                  {entry.gratitude_items.map((item, index) => (
                    <p key={index} className="text-sm text-florescer-dark/70">
                      • {item}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default EntryList;
