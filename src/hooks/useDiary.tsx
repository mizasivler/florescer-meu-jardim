
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DiaryEntry } from '@/types/diary';
import { convertToFrontendMood } from '@/utils/moodMapping';
import { useDiaryOperations } from './useDiaryOperations';
import { calculateDiaryStats } from '@/utils/diaryStats';

export { DiaryEntry, NewDiaryEntry } from '@/types/diary';

export const useDiary = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  
  const operations = useDiaryOperations(user);

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

      // Convert database entries to frontend format
      const convertedEntries: DiaryEntry[] = (data || []).map(entry => ({
        ...entry,
        mood: convertToFrontendMood(entry.mood),
        created_at: entry.created_at || '',
        updated_at: entry.updated_at || ''
      }));

      setEntries(convertedEntries);
    } catch (error) {
      console.error('Error in loadEntries:', error);
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async (entryData: any) => {
    setLoading(true);
    try {
      const result = await operations.addEntry(entryData);
      if (result.error === null && result.data) {
        setEntries(prev => [result.data!, ...prev]);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const updateEntry = async (entryId: string, updates: any) => {
    setLoading(true);
    try {
      const result = await operations.updateEntry(entryId, updates);
      if (result.error === null && result.data) {
        setEntries(prev => prev.map(entry => 
          entry.id === entryId ? result.data! : entry
        ));
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (entryId: string) => {
    setLoading(true);
    try {
      const result = await operations.deleteEntry(entryId);
      if (result.error === null) {
        setEntries(prev => prev.filter(entry => entry.id !== entryId));
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const getEntriesStats = () => {
    return calculateDiaryStats(entries);
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
