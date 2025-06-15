
import { supabase } from '@/integrations/supabase/client';
import { DiaryEntry, NewDiaryEntry } from '@/types/diary';
import { convertToFrontendMood, convertToDatabaseMood } from '@/utils/moodMapping';
import { validateDiaryEntry, sanitizeText } from '@/utils/dataValidation';
import { errorLogger } from '@/utils/errorLogger';

export interface DiaryOperationResult<T = any> {
  error: string | null;
  data?: T;
}

const convertGratitudeItems = (items: any): string[] => {
  if (!items) return [];
  if (Array.isArray(items)) return items.filter(item => typeof item === 'string');
  return [];
};

const retryOperation = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      // Aguardar antes da próxima tentativa
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
  
  throw lastError!;
};

export const diaryOperations = {
  async loadEntries(userId: string): Promise<DiaryOperationResult<DiaryEntry[]>> {
    try {
      console.log('🔄 Carregando entradas do usuário:', userId);
      
      if (!userId) {
        throw new Error('ID do usuário é obrigatório');
      }

      const result = await retryOperation(async () => {
        const { data, error } = await supabase
          .from('diary_entries')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
      });

      console.log('✅ Entradas carregadas do banco:', result);

      // Convert database entries to frontend format
      const convertedEntries: DiaryEntry[] = (result || []).map(entry => {
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
      const errorMessage = 'Erro ao carregar entradas do diário';
      console.error('❌ Erro inesperado em loadEntries:', error);
      errorLogger.log(error as Error, 'loadEntries', userId);
      return { error: errorMessage };
    }
  },

  async addEntry(userId: string, entryData: NewDiaryEntry): Promise<DiaryOperationResult<DiaryEntry>> {
    try {
      console.log('💾 Iniciando salvamento da entrada...');
      console.log('📋 Dados recebidos:', entryData);
      console.log('👤 User ID:', userId);
      
      if (!userId) {
        throw new Error('ID do usuário é obrigatório');
      }

      // Validar dados antes de enviar
      const validation = validateDiaryEntry(entryData);
      if (!validation.isValid) {
        console.error('❌ Dados inválidos:', validation.errors);
        return { error: validation.errors.join(', ') };
      }

      // Sanitizar dados
      const sanitizedData = {
        ...entryData,
        title: sanitizeText(entryData.title),
        content: sanitizeText(entryData.content),
        gratitude_items: entryData.gratitude_items?.map(item => sanitizeText(item))
      };

      // Convert mood to database format
      const dbMood = convertToDatabaseMood(sanitizedData.mood);
      console.log(`🔄 Conversão de mood: ${sanitizedData.mood} → ${dbMood}`);
      
      const dataToInsert = {
        user_id: userId,
        title: sanitizedData.title,
        content: sanitizedData.content,
        mood: dbMood,
        date: new Date().toISOString().split('T')[0],
        gratitude_items: sanitizedData.gratitude_items || []
      };
      
      console.log('📤 Dados que serão inseridos no banco:', dataToInsert);

      const result = await retryOperation(async () => {
        const { data, error } = await supabase
          .from('diary_entries')
          .insert(dataToInsert)
          .select()
          .single();

        if (error) throw error;
        return data;
      });

      console.log('✅ Entrada inserida no banco com sucesso:', result);

      // Convert database entry to frontend format
      const convertedEntry: DiaryEntry = {
        ...result,
        mood: convertToFrontendMood(result.mood),
        gratitude_items: convertGratitudeItems(result.gratitude_items),
        created_at: result.created_at || '',
        updated_at: result.updated_at || ''
      };

      console.log('🔄 Entrada convertida para frontend:', convertedEntry);
      return { error: null, data: convertedEntry };
    } catch (error: any) {
      const errorMessage = 'Não foi possível salvar sua entrada. Tente novamente.';
      console.error('❌ Erro crítico em addEntry:', error);
      console.error('📊 Detalhes do erro:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      errorLogger.log(error, 'addEntry', userId);
      return { error: errorMessage };
    }
  },

  async updateEntry(userId: string, entryId: string, updates: Partial<NewDiaryEntry>): Promise<DiaryOperationResult<DiaryEntry>> {
    try {
      if (!userId || !entryId) {
        throw new Error('ID do usuário e da entrada são obrigatórios');
      }

      // Sanitizar dados se fornecidos
      const sanitizedUpdates = {
        ...updates,
        ...(updates.title && { title: sanitizeText(updates.title) }),
        ...(updates.content && { content: sanitizeText(updates.content) }),
        ...(updates.gratitude_items && { 
          gratitude_items: updates.gratitude_items.map(item => sanitizeText(item))
        })
      };

      // Convert mood to database format if present
      const dbUpdates = {
        ...sanitizedUpdates,
        ...(sanitizedUpdates.mood && { mood: convertToDatabaseMood(sanitizedUpdates.mood) })
      };

      const result = await retryOperation(async () => {
        const { data, error } = await supabase
          .from('diary_entries')
          .update(dbUpdates)
          .eq('id', entryId)
          .eq('user_id', userId)
          .select()
          .single();

        if (error) throw error;
        return data;
      });

      // Convert database entry to frontend format
      const convertedEntry: DiaryEntry = {
        ...result,
        mood: convertToFrontendMood(result.mood),
        gratitude_items: convertGratitudeItems(result.gratitude_items),
        created_at: result.created_at || '',
        updated_at: result.updated_at || ''
      };

      return { error: null, data: convertedEntry };
    } catch (error: any) {
      console.error('Error in updateEntry:', error);
      errorLogger.log(error, 'updateEntry', userId);
      return { error: 'Não foi possível salvar as alterações.' };
    }
  },

  async deleteEntry(userId: string, entryId: string): Promise<DiaryOperationResult<void>> {
    try {
      if (!userId || !entryId) {
        throw new Error('ID do usuário e da entrada são obrigatórios');
      }

      await retryOperation(async () => {
        const { error } = await supabase
          .from('diary_entries')
          .delete()
          .eq('id', entryId)
          .eq('user_id', userId);

        if (error) throw error;
      });

      return { error: null };
    } catch (error: any) {
      console.error('Error in deleteEntry:', error);
      errorLogger.log(error, 'deleteEntry', userId);
      return { error: 'Não foi possível excluir a entrada.' };
    }
  }
};
