
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  mood: 'cansada' | 'aflita' | 'sensivel' | 'irritada' | 'esperancosa';
  date: string;
  gratitude_items?: string[];
  created_at: string;
  updated_at: string;
}

export interface NewDiaryEntry {
  title: string;
  content: string;
  mood: 'cansada' | 'aflita' | 'sensivel' | 'irritada' | 'esperancosa';
  gratitude_items?: string[];
}

export const useDiary = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadEntries();
    }
  }, [user]);

  const loadEntries = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading diary entries:', error);
        toast({
          title: "Erro ao carregar entradas",
          description: "Não foi possível carregar suas entradas do diário.",
          variant: "destructive"
        });
        return;
      }

      setEntries(data || []);
    } catch (error) {
      console.error('Error in loadEntries:', error);
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async (entryData: NewDiaryEntry) => {
    if (!user) return { error: 'Usuário não autenticado' };

    setLoading(true);
    console.log('Adding diary entry:', entryData);

    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .insert({
          user_id: user.id,
          title: entryData.title,
          content: entryData.content,
          mood: entryData.mood,
          date: new Date().toISOString().split('T')[0]
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding diary entry:', error);
        throw error;
      }

      // Add to local state
      setEntries(prev => [data, ...prev]);

      toast({
        title: "Entrada salva! 📖",
        description: "Sua reflexão foi salva com sucesso."
      });

      return { error: null, data };
    } catch (error: any) {
      console.error('Error in addEntry:', error);
      toast({
        title: "Erro ao salvar entrada",
        description: "Não foi possível salvar sua entrada. Tente novamente.",
        variant: "destructive"
      });
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateEntry = async (entryId: string, updates: Partial<NewDiaryEntry>) => {
    if (!user) return { error: 'Usuário não autenticado' };

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .update(updates)
        .eq('id', entryId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating diary entry:', error);
        throw error;
      }

      // Update local state
      setEntries(prev => prev.map(entry => 
        entry.id === entryId ? { ...entry, ...data } : entry
      ));

      toast({
        title: "Entrada atualizada!",
        description: "Suas alterações foram salvas."
      });

      return { error: null, data };
    } catch (error: any) {
      console.error('Error in updateEntry:', error);
      toast({
        title: "Erro ao atualizar entrada",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (entryId: string) => {
    if (!user) return { error: 'Usuário não autenticado' };

    setLoading(true);
    try {
      const { error } = await supabase
        .from('diary_entries')
        .delete()
        .eq('id', entryId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting diary entry:', error);
        throw error;
      }

      // Remove from local state
      setEntries(prev => prev.filter(entry => entry.id !== entryId));

      toast({
        title: "Entrada excluída",
        description: "A entrada foi removida do seu diário."
      });

      return { error: null };
    } catch (error: any) {
      console.error('Error in deleteEntry:', error);
      toast({
        title: "Erro ao excluir entrada",
        description: "Não foi possível excluir a entrada.",
        variant: "destructive"
      });
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const getEntriesStats = () => {
    const totalEntries = entries.length;
    const thisWeekEntries = entries.filter(entry => {
      const entryDate = new Date(entry.created_at);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return entryDate >= oneWeekAgo;
    }).length;

    const moodCounts = entries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostCommonMood = Object.entries(moodCounts).reduce((a, b) => 
      moodCounts[a[0]] > moodCounts[b[0]] ? a : b
    )?.[0] || 'esperancosa';

    return {
      totalEntries,
      thisWeekEntries,
      mostCommonMood,
      moodCounts
    };
  };

  return {
    entries,
    loading,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntriesStats,
    refetch: loadEntries
  };
};
