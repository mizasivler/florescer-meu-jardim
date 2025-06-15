
import { supabase } from '@/integrations/supabase/client';
import { DiaryEntry, NewDiaryEntry } from '@/types/diary';
import { convertToFrontendMood, convertToDatabaseMood } from '@/utils/moodMapping';

export interface DiaryOperationResult<T = any> {
  error: string | null;
  data?: T;
}

export const diaryOperations = {
  async loadEntries(userId: string): Promise<DiaryOperationResult<DiaryEntry[]>> {
    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading diary entries:', error);
        return { error: 'Não foi possível carregar suas entradas do diário.' };
      }

      // Convert database entries to frontend format
      const convertedEntries: DiaryEntry[] = (data || []).map(entry => ({
        ...entry,
        mood: convertToFrontendMood(entry.mood),
        created_at: entry.created_at || '',
        updated_at: entry.updated_at || ''
      }));

      return { error: null, data: convertedEntries };
    } catch (error) {
      console.error('Error in loadEntries:', error);
      return { error: 'Erro ao carregar entradas' };
    }
  },

  async addEntry(userId: string, entryData: NewDiaryEntry): Promise<DiaryOperationResult<DiaryEntry>> {
    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .insert({
          user_id: userId,
          title: entryData.title,
          content: entryData.content,
          mood: convertToDatabaseMood(entryData.mood),
          date: new Date().toISOString().split('T')[0],
          gratitude_items: entryData.gratitude_items
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding diary entry:', error);
        throw error;
      }

      // Convert database entry to frontend format
      const convertedEntry: DiaryEntry = {
        ...data,
        mood: convertToFrontendMood(data.mood),
        created_at: data.created_at || '',
        updated_at: data.updated_at || ''
      };

      return { error: null, data: convertedEntry };
    } catch (error: any) {
      console.error('Error in addEntry:', error);
      return { error: 'Não foi possível salvar sua entrada. Tente novamente.' };
    }
  },

  async updateEntry(userId: string, entryId: string, updates: Partial<NewDiaryEntry>): Promise<DiaryOperationResult<DiaryEntry>> {
    try {
      // Convert mood to database format if present
      const dbUpdates = {
        ...updates,
        ...(updates.mood && { mood: convertToDatabaseMood(updates.mood) })
      };

      const { data, error } = await supabase
        .from('diary_entries')
        .update(dbUpdates)
        .eq('id', entryId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('Error updating diary entry:', error);
        throw error;
      }

      // Convert database entry to frontend format
      const convertedEntry: DiaryEntry = {
        ...data,
        mood: convertToFrontendMood(data.mood),
        created_at: data.created_at || '',
        updated_at: data.updated_at || ''
      };

      return { error: null, data: convertedEntry };
    } catch (error: any) {
      console.error('Error in updateEntry:', error);
      return { error: 'Não foi possível salvar as alterações.' };
    }
  },

  async deleteEntry(userId: string, entryId: string): Promise<DiaryOperationResult<void>> {
    try {
      const { error } = await supabase
        .from('diary_entries')
        .delete()
        .eq('id', entryId)
        .eq('user_id', userId);

      if (error) {
        console.error('Error deleting diary entry:', error);
        throw error;
      }

      return { error: null };
    } catch (error: any) {
      console.error('Error in deleteEntry:', error);
      return { error: 'Não foi possível excluir a entrada.' };
    }
  }
};
