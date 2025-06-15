import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from 'lucide-react';
import { useDiary } from '@/hooks/useDiary';
import EntryForm from '@/components/diary/EntryForm';
import DiaryStats from '@/components/diary/DiaryStats';
import EntryList from '@/components/diary/EntryList';
import EmptyState from '@/components/diary/EmptyState';

const EmotionDiary = () => {
  const navigate = useNavigate();
  const { entries, addEntry, updateEntry, loading } = useDiary();
  const [isWriting, setIsWriting] = useState(false);
  const [newEntry, setNewEntry] = useState({
    mood: '',
    moodLabel: '',
    title: '',
    content: '',
    gratitude: ['', '', ''],
    tags: []
  });

  // Mapping from emoji to mood key for consistent saving
  const emojiToMoodMap: Record<string, string> = {
    '😴': 'cansada',
    '😰': 'aflita', 
    '🥺': 'sensível',
    '😤': 'irritada',
    '🌟': 'esperançosa'
  };

  const saveEntry = async () => {
    if (newEntry.title && newEntry.content && newEntry.mood) {
      // Use the emoji to get the correct mood key
      const moodKey = emojiToMoodMap[newEntry.mood];
      
      const entryData = {
        title: newEntry.title,
        content: newEntry.content,
        mood: moodKey as any,
        gratitude_items: newEntry.gratitude.filter(item => item.trim() !== ''),
        tags: []
      };

      console.log('Saving entry with mood:', moodKey);

      const success = await addEntry(entryData);
      if (success.error === null) {
        setIsWriting(false);
        setNewEntry({
          mood: '',
          moodLabel: '',
          title: '',
          content: '',
          gratitude: ['', '', ''],
          tags: []
        });
      }
    }
  };

  if (isWriting) {
    return (
      <EntryForm
        entry={newEntry}
        onEntryChange={setNewEntry}
        onSave={saveEntry}
        onCancel={() => setIsWriting(false)}
        loading={loading}
      />
    );
  }

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
              Diário da Emoção
            </h1>
            <p className="text-florescer-dark/70">Suas reflexões e sentimentos</p>
          </div>
        </div>

        <DiaryStats entries={entries} />
      </div>

      {/* New Entry Button */}
      <div className="px-6 mb-6">
        <Button 
          onClick={() => setIsWriting(true)}
          className="btn-primary w-full"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nova Entrada
        </Button>
      </div>

      {/* Entries Content */}
      <div className="px-6">
        {entries.length === 0 ? (
          <EmptyState onCreateEntry={() => setIsWriting(true)} />
        ) : (
          <EntryList entries={entries} />
        )}
      </div>
    </div>
  );
};

export default EmotionDiary;
