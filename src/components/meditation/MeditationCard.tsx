
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Users, Star, Lock } from 'lucide-react';

interface Meditation {
  id: number;
  title: string;
  description: string;
  duration: string;
  category: string;
  difficulty: string;
  rating: number;
  listeners: number;
  premium: boolean;
  instructor: string;
  gradient: string;
}

interface MeditationCardProps {
  meditation: Meditation;
}

const MeditationCard = ({ meditation }: MeditationCardProps) => (
  <Card className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
    <div className="space-y-4">
      {/* Header with gradient icon */}
      <div className="flex items-start gap-4">
        <div className={`w-16 h-16 bg-gradient-to-r ${meditation.gradient} rounded-2xl flex items-center justify-center relative`}>
          <Play className="h-8 w-8 text-white" />
          {meditation.premium && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Lock className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {meditation.title}
          </h3>
          <p className="text-gray-500 text-sm">por {meditation.instructor}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {meditation.description}
      </p>

      {/* Metadata */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{meditation.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{meditation.listeners.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{meditation.rating}</span>
          </div>
        </div>
        <Badge 
          variant={meditation.difficulty === 'Iniciante' ? 'secondary' : 
                 meditation.difficulty === 'Intermediário' ? 'default' : 'destructive'}
          className="rounded-full"
        >
          {meditation.difficulty}
        </Badge>
      </div>

      {/* Action Button */}
      <Button 
        className={`w-full rounded-2xl font-semibold ${
          meditation.premium 
            ? 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500' 
            : `bg-gradient-to-r ${meditation.gradient} hover:opacity-90`
        } text-white border-none`}
        disabled={meditation.premium}
      >
        <Play className="h-4 w-4 mr-2" />
        {meditation.premium ? 'Premium - Desbloqueie Agora' : 'Começar Meditação'}
      </Button>
    </div>
  </Card>
);

export default MeditationCard;
