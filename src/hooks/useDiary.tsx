
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type DiaryEntry = Tables<'diary_entries'>;

export const useDiary = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchEntries();
    }
  }, [user]);

  const fetchEntries = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching diary entries:', error);
        throw error;
      }

      setEntries(data || []);
    } catch (error) {
      console.error('Error in fetchEntries:', error);
      toast({
        title: "Erro ao carregar entradas",
        description: "Não foi possível carregar suas entradas do diário.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveEntry = async (title: string, content: string, mood?: string) => {
    if (!user) return { error: 'Usuário não autenticado' };

    setLoading(true);
    console.log('Saving diary entry:', { title, content, mood });

    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .insert({
          user_id: user.id,
          title,
          content,
          mood: mood as any || null,
          date: new Date().toISOString().split('T')[0]
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving diary entry:', error);
        throw error;
      }

      setEntries(prev => [data, ...prev]);
      
      toast({
        title: "Entrada salva!",
        description: "Sua reflexão foi salva no diário emocional."
      });

      return { error: null, data };
    } catch (error: any) {
      console.error('Error in saveEntry:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar a entrada. Tente novamente.",
        variant: "destructive"
      });
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateEntry = async (id: string, title: string, content: string, mood?: string) => {
    if (!user) return { error: 'Usuário não autenticado' };

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .update({
          title,
          content,
          mood: mood as any || null
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating diary entry:', error);
        throw error;
      }

      setEntries(prev => prev.map(entry => 
        entry.id === id ? data : entry
      ));

      toast({
        title: "Entrada atualizada!",
        description: "Suas alterações foram salvas."
      });

      return { error: null, data };
    } catch (error: any) {
      console.error('Error in updateEntry:', error);
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (id: string) => {
    if (!user) return { error: 'Usuário não autenticado' };

    setLoading(true);
    try {
      const { error } = await supabase
        .from('diary_entries')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting diary entry:', error);
        throw error;
      }

      setEntries(prev => prev.filter(entry => entry.id !== id));

      toast({
        title: "Entrada removida",
        description: "A entrada foi removida do seu diário."
      });

      return { error: null };
    } catch (error: any) {
      console.error('Error in deleteEntry:', error);
      toast({
        title: "Erro ao remover",
        description: "Não foi possível remover a entrada.",
        variant: "destructive"
      });
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    entries,
    loading,
    saveEntry,
    updateEntry,
    deleteEntry,
    refetch: fetchEntries
  };
};
