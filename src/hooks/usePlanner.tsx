
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PlannerTask {
  id: string;
  title: string;
  completed: boolean;
  time: string;
  date: string;
}

export const usePlanner = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<PlannerTask[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // For now, we'll use a simple approach with local storage
      // In a real app, you'd want a dedicated tasks table
      const savedTasks = localStorage.getItem(`tasks_${user.id}_${today}`);
      
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      } else {
        // Default tasks for today
        const defaultTasks: PlannerTask[] = [
          { id: '1', title: 'Ritual matinal', completed: false, time: '07:00', date: today },
          { id: '2', title: 'Meditação de 10min', completed: false, time: '14:00', date: today },
          { id: '3', title: 'Caminhada no parque', completed: false, time: '18:00', date: today },
          { id: '4', title: 'Diário da emoção', completed: false, time: '20:00', date: today }
        ];
        setTasks(defaultTasks);
        saveTasks(defaultTasks);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTasks = (tasksToSave: PlannerTask[]) => {
    if (!user) return;
    
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`tasks_${user.id}_${today}`, JSON.stringify(tasksToSave));
  };

  const toggleTask = async (taskId: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    
    setTasks(updatedTasks);
    saveTasks(updatedTasks);

    const task = updatedTasks.find(t => t.id === taskId);
    if (task?.completed) {
      toast({
        title: "Tarefa concluída! 🎉",
        description: `Parabéns por completar: ${task.title}`
      });
    }
  };

  const addTask = async (title: string, time: string) => {
    if (!user) return { error: 'Usuário não autenticado' };

    const today = new Date().toISOString().split('T')[0];
    const newTask: PlannerTask = {
      id: Date.now().toString(),
      title,
      completed: false,
      time,
      date: today
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);

    toast({
      title: "Tarefa adicionada!",
      description: `Nova tarefa: ${title} às ${time}`
    });

    return { error: null };
  };

  const getProgress = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    
    return {
      completedTasks,
      totalTasks,
      progressPercentage: Math.round(progressPercentage)
    };
  };

  return {
    tasks,
    loading,
    toggleTask,
    addTask,
    getProgress
  };
};
