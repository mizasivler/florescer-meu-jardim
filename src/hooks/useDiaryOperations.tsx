
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DiaryEntry, NewDiaryEntry } from '@/types/diary';
import { convertToFrontendMood, convertToDatabaseMood } from '@/utils/moodMapping';

export const useDiaryOperations = (user: any) => {
  const { toast } = useToast();

  const addEntry = async (entryData: NewDiaryEntry) => {
    if (!user) return { error: 'Usuário não autenticado' };

    console.log('Adding diary entry:', entryData);

    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .insert({
          user_id: user.id,
          title: entryData.title,
          content: entryData.content,
          mood: convertToDatabaseMood(entryData.mood),
          date: new Date().toISOString().split('T')[0]
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

      toast({
        title: "Entrada salva! 📖",
        description: "Sua reflexão foi salva com sucesso."
      });

      return { error: null, data: convertedEntry };
    } catch (error: any) {
      console.error('Error in addEntry:', error);
      toast({
        title: "Erro ao salvar entrada",
        description: "Não foi possível salvar sua entrada. Tente novamente.",
        variant: "destructive"
      });
      return { error: error.message };
    }
  };

  const updateEntry = async (entryId: string, updates: Partial<NewDiaryEntry>) => {
    if (!user) return { error: 'Usuário não autenticado' };

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
        .eq('user_id', user.id)
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

      toast({
        title: "Entrada atualizada!",
        description: "Suas alterações foram salvas."
      });

      return { error: null, data: convertedEntry };
    } catch (error: any) {
      console.error('Error in updateEntry:', error);
      toast({
        title: "Erro ao atualizar entrada",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
      return { error: error.message };
    }
  };

  const deleteEntry = async (entryId: string) => {
    if (!user) return { error: 'Usuário não autenticado' };

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
    }
  };

  return {
    addEntry,
    updateEntry,
    deleteEntry
  };
};
