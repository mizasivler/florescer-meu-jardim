
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Heart } from 'lucide-react';
import MoodSelector from './MoodSelector';

interface EntryData {
  mood: string;
  moodLabel: string;
  title: string;
  content: string;
  gratitude: string[];
  tags: any[];
}

interface EntryFormProps {
  entry: EntryData;
  onEntryChange: (entry: EntryData) => void;
  onSave: () => void;
  onCancel: () => void;
  loading: boolean;
}

const EntryForm = ({ entry, onEntryChange, onSave, onCancel, loading }: EntryFormProps) => {
  const handleMoodSelect = (emoji: string, label: string) => {
    onEntryChange({ ...entry, mood: emoji, moodLabel: label });
  };

  const handleGratitudeChange = (index: number, value: string) => {
    const newGratitude = [...entry.gratitude];
    newGratitude[index] = value;
    onEntryChange({ ...entry, gratitude: newGratitude });
  };

  return (
    <div className="min-h-screen gradient-florescer pb-20">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onCancel}
            className="text-florescer-copper"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-lora font-bold text-florescer-dark">
              Nova Entrada
            </h1>
            <p className="text-florescer-dark/70">Expresse seus sentimentos</p>
          </div>
        </div>

        <div className="space-y-6">
          <MoodSelector 
            selectedMood={entry.mood}
            onMoodSelect={handleMoodSelect}
          />

          {/* Title */}
          <Card className="card-florescer">
            <div>
              <label className="block text-sm font-medium text-florescer-dark mb-2">
                Título da sua entrada
              </label>
              <input
                type="text"
                placeholder="Ex: Um dia de reflexões..."
                value={entry.title}
                onChange={(e) => onEntryChange({ ...entry, title: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-florescer-copper focus:border-transparent"
              />
            </div>
          </Card>

          {/* Content */}
          <Card className="card-florescer">
            <div>
              <label className="block text-sm font-medium text-florescer-dark mb-2">
                Como foi seu dia? O que você sentiu?
              </label>
              <textarea
                placeholder="Descreva seus sentimentos, experiências e reflexões..."
                value={entry.content}
                onChange={(e) => onEntryChange({ ...entry, content: e.target.value })}
                rows={6}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-florescer-copper focus:border-transparent resize-none"
              />
            </div>
          </Card>

          {/* Gratitude */}
          <Card className="card-florescer">
            <div>
              <h3 className="font-lora font-semibold text-lg mb-4">3 coisas pelas quais sou grata:</h3>
              {entry.gratitude.map((item, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Gratidão ${index + 1}...`}
                  value={item}
                  onChange={(e) => handleGratitudeChange(index, e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-florescer-copper focus:border-transparent mb-3"
                />
              ))}
            </div>
          </Card>

          {/* Save Button */}
          <Button 
            onClick={onSave}
            disabled={!entry.title || !entry.content || !entry.mood || loading}
            className="btn-primary w-full"
          >
            <Heart className="h-4 w-4 mr-2" />
            {loading ? 'Salvando...' : 'Salvar Entrada'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EntryForm;
