
import { useState } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MeditationSession {
  meditationId: number;
  title: string;
  duration: number;
  rating?: number;
}

export const useMeditation = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const completeMeditation = async (session: MeditationSession) => {
    if (!user) return { error: 'Usuário não autenticado' };

    setLoading(true);
    console.log('Completing meditation session:', session);

    try {
      const { error } = await supabase
        .from('meditation_sessions')
        .insert({
          user_id: user.id,
          meditation_id: session.meditationId,
          meditation_title: session.title,
          duration_minutes: session.duration,
          rating: session.rating || null
        });

      if (error) {
        console.error('Error saving meditation session:', error);
        throw error;
      }

      // Update user progress
      const { data: currentProgress, error: progressError } = await supabase
        .from('user_progress')
        .select('completed_meditations, flowers_earned')
        .eq('user_id', user.id)
        .single();

      if (!progressError && currentProgress) {
        const flowersEarned = session.duration >= 10 ? 15 : 10; // Bonus for longer sessions
        
        const { error: updateError } = await supabase
          .from('user_progress')
          .update({
            completed_meditations: (currentProgress.completed_meditations || 0) + 1,
            flowers_earned: (currentProgress.flowers_earned || 0) + flowersEarned
          })
          .eq('user_id', user.id);

        if (updateError) {
          console.error('Error updating meditation progress:', updateError);
        }
      }

      toast({
        title: "Meditação concluída! 🧘‍♀️",
        description: `Parabéns por dedicar ${session.duration} minutos ao seu bem-estar!`
      });

      return { error: null };
    } catch (error: any) {
      console.error('Error in meditation completion:', error);
      toast({
        title: "Erro ao salvar meditação",
        description: "Não foi possível registrar sua sessão. Tente novamente.",
        variant: "destructive"
      });
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const getMeditationStats = async () => {
    if (!user) return { totalSessions: 0, totalMinutes: 0, averageRating: 0 };

    try {
      const { data, error } = await supabase
        .from('meditation_sessions')
        .select('duration_minutes, rating')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching meditation stats:', error);
        return { totalSessions: 0, totalMinutes: 0, averageRating: 0 };
      }

      const totalSessions = data?.length || 0;
      const totalMinutes = data?.reduce((sum, session) => sum + session.duration_minutes, 0) || 0;
      const ratingsSum = data?.filter(s => s.rating).reduce((sum, session) => sum + (session.rating || 0), 0) || 0;
      const ratingsCount = data?.filter(s => s.rating).length || 0;
      const averageRating = ratingsCount > 0 ? ratingsSum / ratingsCount : 0;

      return { totalSessions, totalMinutes, averageRating };
    } catch (error) {
      console.error('Error in getMeditationStats:', error);
      return { totalSessions: 0, totalMinutes: 0, averageRating: 0 };
    }
  };

  return {
    completeMeditation,
    getMeditationStats,
    loading
  };
};
