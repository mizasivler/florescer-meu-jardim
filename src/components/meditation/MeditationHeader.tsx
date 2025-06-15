
import { Card } from "@/components/ui/card";

interface MeditationStats {
  totalSessions: number;
  totalMinutes: number;
  averageRating: number;
}

interface MeditationHeaderProps {
  stats: MeditationStats;
}

const MeditationHeader = ({ stats }: MeditationHeaderProps) => {
  return (
    <div className="px-6 pt-6 pb-4">
      <div className="mb-6">
        <h1 className="text-2xl font-lora font-bold text-florescer-dark mb-2">
          Meditações Guiadas
        </h1>
        <p className="text-florescer-dark/70">
          Momentos de paz e autoconexão para sua jornada
        </p>
      </div>

      {/* Stats Card */}
      <Card className="card-florescer mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-florescer-copper">{stats.totalSessions}</div>
            <div className="text-sm text-florescer-dark/60">Sessões</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-florescer-olive">{stats.totalMinutes}</div>
            <div className="text-sm text-florescer-dark/60">Minutos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-florescer-rose">
              {stats.averageRating > 0 ? stats.averageRating.toFixed(1) : '0.0'}
            </div>
            <div className="text-sm text-florescer-dark/60">Avaliação</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MeditationHeader;
