
import { supabase } from '@/integrations/supabase/client';
import { DiaryEntry, NewDiaryEntry } from '@/types/diary';
import { convertToFrontendMood, convertToDatabaseMood } from '@/utils/moodMapping';

export interface DiaryOperationResult<T = any> {
  error: string | null;
  data?: T;
}

const convertGratitudeItems = (items: any): string[] => {
  if (!items) return [];
  if (Array.isArray(items)) return items.filter(item => typeof item === 'string');
  return [];
};

export const diaryOperations = {
  async loadEntries(userId: string): Promise<DiaryOperationResult<DiaryEntry[]>> {
    try {
      console.log('🔄 Carregando entradas do usuário:', userId);
      
      const { data, error } = await supabase
        .from('diary_entries')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Erro ao carregar entradas do diário:', error);
        return { error: 'Não foi possível carregar suas entradas do diário.' };
      }

      console.log('✅ Entradas carregadas do banco:', data);

      // Convert database entries to frontend format
      const convertedEntries: DiaryEntry[] = (data || []).map(entry => {
        const convertedMood = convertToFrontendMood(entry.mood);
        console.log(`Convertendo mood: ${entry.mood} → ${convertedMood}`);
        
        return {
          ...entry,
          mood: convertedMood,
          gratitude_items: convertGratitudeItems(entry.gratitude_items),
          created_at: entry.created_at || '',
          updated_at: entry.updated_at || ''
        };
      });

      console.log('✅ Entradas convertidas para frontend:', convertedEntries);
      return { error: null, data: convertedEntries };
    } catch (error) {
      console.error('❌ Erro inesperado em loadEntries:', error);
      return { error: 'Erro ao carregar entradas' };
    }
  },

  async addEntry(userId: string, entryData: NewDiaryEntry): Promise<DiaryOperationResult<DiaryEntry>> {
    try {
      console.log('💾 Iniciando salvamento da entrada...');
      console.log('📋 Dados recebidos:', entryData);
      console.log('👤 User ID:', userId);
      
      // Convert mood to database format
      const dbMood = convertToDatabaseMood(entryData.mood);
      console.log(`🔄 Conversão de mood: ${entryData.mood} → ${dbMood}`);
      
      const dataToInsert = {
        user_id: userId,
        title: entryData.title,
        content: entryData.content,
        mood: dbMood,
        date: new Date().toISOString().split('T')[0],
        gratitude_items: entryData.gratitude_items || []
      };
      
      console.log('📤 Dados que serão inseridos no banco:', dataToInsert);

      const { data, error } = await supabase
        .from('diary_entries')
        .insert(dataToInsert)
        .select()
        .single();

      if (error) {
        console.error('❌ Erro do Supabase ao inserir:', error);
        throw error;
      }

      console.log('✅ Entrada inserida no banco com sucesso:', data);

      // Convert database entry to frontend format
      const convertedEntry: DiaryEntry = {
        ...data,
        mood: convertToFrontendMood(data.mood),
        gratitude_items: convertGratitudeItems(data.gratitude_items),
        created_at: data.created_at || '',
        updated_at: data.updated_at || ''
      };

      console.log('🔄 Entrada convertida para frontend:', convertedEntry);
      return { error: null, data: convertedEntry };
    } catch (error: any) {
      console.error('❌ Erro crítico em addEntry:', error);
      console.error('📊 Detalhes do erro:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
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
        gratitude_items: convertGratitudeItems(data.gratitude_items),
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
