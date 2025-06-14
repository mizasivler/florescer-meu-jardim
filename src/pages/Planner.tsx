
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, CheckCircle, Clock, Calendar as CalendarIcon } from 'lucide-react';

const Planner = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Ritual matinal', completed: true, time: '07:00' },
    { id: 2, title: 'Meditação de 10min', completed: false, time: '14:00' },
    { id: 3, title: 'Caminhada no parque', completed: false, time: '18:00' },
    { id: 4, title: 'Diário da emoção', completed: false, time: '20:00' }
  ]);

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const progressPercentage = (completedTasks / tasks.length) * 100;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="min-h-screen gradient-florescer pb-20">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="text-florescer-copper"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-lora font-bold text-florescer-dark">
              Meu Planner
            </h1>
            <p className="text-florescer-dark/70">Organize sua jornada diária</p>
          </div>
        </div>

        {/* Date Selection */}
        <Card className="card-florescer mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-6 w-6 text-florescer-copper" />
              <div>
                <h3 className="font-lora font-semibold text-lg capitalize">
                  {formatDate(selectedDate)}
                </h3>
                <p className="text-sm text-florescer-dark/60">
                  {completedTasks} de {tasks.length} atividades concluídas
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl mb-1">📅</div>
              <div className="text-sm text-florescer-dark/60">
                {Math.round(progressPercentage)}%
              </div>
            </div>
          </div>
        </Card>

        {/* Progress Card */}
        <Card className="card-florescer mb-6">
          <div className="text-center">
            <h3 className="font-lora font-semibold text-lg mb-3">Progresso do Dia</h3>
            <div className="flex justify-center gap-2 mb-4">
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className={`w-4 h-4 rounded-full ${
                    task.completed ? 'bg-florescer-copper' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-florescer-dark/70 text-sm">
              Continue assim! Cada pequeno passo conta na sua jornada 🌸
            </p>
          </div>
        </Card>
      </div>

      {/* Tasks List */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-lora font-semibold text-xl text-florescer-dark">
            Atividades de Hoje
          </h2>
          <Button size="sm" className="btn-primary">
            <Plus className="h-4 w-4 mr-1" />
            Adicionar
          </Button>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <Card 
              key={task.id}
              className={`card-florescer transition-all duration-300 ${
                task.completed ? 'bg-florescer-copper/10 border-florescer-copper' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    task.completed
                      ? 'bg-florescer-copper border-florescer-copper'
                      : 'border-gray-300 hover:border-florescer-copper'
                  }`}
                >
                  {task.completed && (
                    <CheckCircle className="h-4 w-4 text-white" />
                  )}
                </button>
                
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    task.completed 
                      ? 'text-florescer-dark/60 line-through' 
                      : 'text-florescer-dark'
                  }`}>
                    {task.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-1 text-florescer-dark/60">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{task.time}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Weekly Overview */}
        <Card className="card-florescer mt-6">
          <div>
            <h3 className="font-lora font-semibold text-lg mb-4 text-florescer-dark">
              Visão da Semana
            </h3>
            
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-florescer-dark/60 mb-1">{day}</div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                    index === 3 // Today (example)
                      ? 'bg-florescer-copper text-white'
                      : index < 3
                        ? 'bg-florescer-olive/20 text-florescer-dark'
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    {index + 10}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-sm text-florescer-dark/70">
                Você está no dia 5 da sua jornada de 21 dias! 🌟
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Planner;
