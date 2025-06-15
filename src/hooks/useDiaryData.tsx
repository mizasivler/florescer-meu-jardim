
import { useState, useEffect } from 'react';
import { DiaryEntry } from '@/types/diary';
import { diaryOperations } from '@/utils/diaryOperations';
import { useToast } from '@/hooks/use-toast';

export const useDiaryData = (userId: string | undefined) => {
  const { toast } = useToast();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      loadEntries();
    }
  }, [userId]);

  const loadEntries = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const result = await diaryOperations.loadEntries(userId);
      
      if (result.error) {
        toast({
          title: "Erro ao carregar entradas",
          description: result.error,
          variant: "destructive"
        });
        return;
      }

      setEntries(result.data || []);
    } catch (error) {
      console.error('Error in loadEntries:', error);
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async (entryData: any) => {
    if (!userId) return { error: 'Usuário não autenticado' };

    setLoading(true);
    try {
      const result = await diaryOperations.addEntry(userId, entryData);
      
      if (result.error === null && result.data) {
        setEntries(prev => [result.data!, ...prev]);
        toast({
          title: "Entrada salva! 📖",
          description: "Sua reflexão foi salva com sucesso."
        });
      } else {
        toast({
          title: "Erro ao salvar entrada",
          description: result.error || "Erro desconhecido",
          variant: "destructive"
        });
      }
      
      return result;
    } finally {
      setLoading(false);
    }
  };

  const updateEntry = async (entryId: string, updates: any) => {
    if (!userId) return { error: 'Usuário não autenticado' };

    setLoading(true);
    try {
      const result = await diaryOperations.updateEntry(userId, entryId, updates);
      
      if (result.error === null && result.data) {
        setEntries(prev => prev.map(entry => 
          entry.id === entryId ? result.data! : entry
        ));
        toast({
          title: "Entrada atualizada!",
          description: "Suas alterações foram salvas."
        });
      } else {
        toast({
          title: "Erro ao atualizar entrada",
          description: result.error || "Erro desconhecido",
          variant: "destructive"
        });
      }
      
      return result;
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (entryId: string) => {
    if (!userId) return { error: 'Usuário não autenticado' };

    setLoading(true);
    try {
      const result = await diaryOperations.deleteEntry(userId, entryId);
      
      if (result.error === null) {
        setEntries(prev => prev.filter(entry => entry.id !== entryId));
        toast({
          title: "Entrada excluída",
          description: "A entrada foi removida do seu diário."
        });
      } else {
        toast({
          title: "Erro ao excluir entrada",
          description: result.error || "Erro desconhecido",
          variant: "destructive"
        });
      }
      
      return result;
    } finally {
      setLoading(false);
    }
  };

  return {
    entries,
    loading,
    addEntry,
    updateEntry,
    deleteEntry,
    refetch: loadEntries
  };
};
