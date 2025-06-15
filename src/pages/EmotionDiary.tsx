import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from 'lucide-react';
import { useDiary } from '@/hooks/useDiary';
import EntryForm from '@/components/diary/EntryForm';
import DiaryStats from '@/components/diary/DiaryStats';
import EntryList from '@/components/diary/EntryList';
import EmptyState from '@/components/diary/EmptyState';
import PageHeader from "@/components/PageHeader";

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
    console.log('=== INÍCIO DO SALVAMENTO ===');
    console.log('Estado atual do newEntry:', newEntry);
    
    if (newEntry.title && newEntry.content && newEntry.mood) {
      // Use the emoji to get the correct mood key
      const moodKey = emojiToMoodMap[newEntry.mood];
      console.log('Emoji selecionado:', newEntry.mood);
      console.log('Mood key mapeado:', moodKey);
      
      // Validar se o moodKey foi encontrado
      if (!moodKey) {
        console.error('ERRO: Mood key não encontrado para emoji:', newEntry.mood);
        return;
      }
      
      const entryData = {
        title: newEntry.title,
        content: newEntry.content,
        mood: moodKey as any,
        gratitude_items: newEntry.gratitude.filter(item => item.trim() !== ''),
        tags: []
      };

      console.log('Dados que serão enviados para o banco:', entryData);
      console.log('Gratitude items filtrados:', entryData.gratitude_items);

      const success = await addEntry(entryData);
      console.log('Resultado do addEntry:', success);
      
      if (success.error === null) {
        console.log('✅ Entrada salva com sucesso!');
        setIsWriting(false);
        setNewEntry({
          mood: '',
          moodLabel: '',
          title: '',
          content: '',
          gratitude: ['', '', ''],
          tags: []
        });
      } else {
        console.error('❌ Erro ao salvar entrada:', success.error);
      }
    } else {
      console.log('❌ Validação falhou - campos obrigatórios:');
      console.log('- title:', newEntry.title);
      console.log('- content:', newEntry.content);
      console.log('- mood:', newEntry.mood);
    }
    console.log('=== FIM DO SALVAMENTO ===');
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
      {/* Header padronizado */}
      <div className="p-6 pb-4">
        <PageHeader
          title="Diário da Emoção"
          description="Suas reflexões e sentimentos"
          onBack={() => navigate('/')}
        />
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
