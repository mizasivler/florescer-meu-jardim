
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, Edit, Heart } from 'lucide-react';
import { useDiary } from '@/hooks/useDiary';

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

  const moodOptions = [
    { emoji: '😴', label: 'Cansada' },
    { emoji: '😰', label: 'Aflita' },
    { emoji: '🥺', label: 'Sensível' },
    { emoji: '😤', label: 'Irritada' },
    { emoji: '🌟', label: 'Esperançosa' }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const saveEntry = async () => {
    if (newEntry.title && newEntry.content && newEntry.mood) {
      const entryData = {
        title: newEntry.title,
        content: newEntry.content,
        mood: newEntry.moodLabel as any, // Type assertion for enum
        gratitude_items: newEntry.gratitude.filter(item => item.trim() !== ''),
        tags: []
      };

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
      <div className="min-h-screen gradient-florescer pb-20">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsWriting(false)}
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
            {/* Mood Selection */}
            <Card className="card-florescer">
              <div>
                <h3 className="font-lora font-semibold text-lg mb-4">Como você está se sentindo?</h3>
                <div className="flex justify-center gap-4">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.label}
                      onClick={() => {
                        setNewEntry({...newEntry, mood: mood.emoji, moodLabel: mood.label});
                      }}
                      className={`w-16 h-16 text-3xl rounded-2xl border-2 transition-all duration-300 hover:scale-110 ${
                        newEntry.mood === mood.emoji ? 'ring-2 ring-florescer-copper bg-florescer-copper/10 border-florescer-copper' : 'border-gray-200 hover:border-florescer-copper'
                      }`}
                      title={mood.label}
                    >
                      {mood.emoji}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Title */}
            <Card className="card-florescer">
              <div>
                <label className="block text-sm font-medium text-florescer-dark mb-2">
                  Título da sua entrada
                </label>
                <input
                  type="text"
                  placeholder="Ex: Um dia de reflexões..."
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
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
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                  rows={6}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-florescer-copper focus:border-transparent resize-none"
                />
              </div>
            </Card>

            {/* Gratitude */}
            <Card className="card-florescer">
              <div>
                <h3 className="font-lora font-semibold text-lg mb-4">3 coisas pelas quais sou grata:</h3>
                {newEntry.gratitude.map((item, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Gratidão ${index + 1}...`}
                    value={item}
                    onChange={(e) => {
                      const newGratitude = [...newEntry.gratitude];
                      newGratitude[index] = e.target.value;
                      setNewEntry({...newEntry, gratitude: newGratitude});
                    }}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-florescer-copper focus:border-transparent mb-3"
                  />
                ))}
              </div>
            </Card>

            {/* Save Button */}
            <Button 
              onClick={saveEntry}
              disabled={!newEntry.title || !newEntry.content || !newEntry.mood || loading}
              className="btn-primary w-full"
            >
              <Heart className="h-4 w-4 mr-2" />
              {loading ? 'Salvando...' : 'Salvar Entrada'}
            </Button>
          </div>
        </div>
      </div>
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

        {/* Stats Card */}
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
              <div className="text-2xl">
                {entries.length > 0 ? entries[0]?.mood === 'esperancosa' ? '🌟' : entries[0]?.mood === 'aflita' ? '😰' : '😌' : '😊'}
              </div>
              <div className="text-sm text-florescer-dark/60">Último humor</div>
            </div>
          </div>
        </Card>
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

      {/* Entries List */}
      <div className="px-6 space-y-4">
        <h2 className="font-lora font-semibold text-xl text-florescer-dark">
          Minhas Entradas
        </h2>
        
        {entries.length === 0 ? (
          <Card className="card-florescer text-center py-8">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="font-lora font-semibold text-lg mb-2 text-florescer-dark">
              Nenhuma entrada ainda
            </h3>
            <p className="text-florescer-dark/60 mb-4">
              Comece escrevendo sobre seus sentimentos e experiências
            </p>
            <Button onClick={() => setIsWriting(true)} className="btn-primary">
              Criar primeira entrada
            </Button>
          </Card>
        ) : (
          entries.map((entry) => (
            <Card key={entry.id} className="card-florescer">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {entry.mood === 'esperancosa' ? '🌟' : 
                       entry.mood === 'aflita' ? '😰' : 
                       entry.mood === 'cansada' ? '😴' :
                       entry.mood === 'irritada' ? '😤' :
                       entry.mood === 'sensivel' ? '🥺' : '😊'}
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
          ))
        )}
      </div>
    </div>
  );
};

export default EmotionDiary;
