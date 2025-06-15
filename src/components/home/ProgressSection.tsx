
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressSectionProps {
  progress: any;
}

const ProgressSection = ({ progress }: ProgressSectionProps) => {
  const renderProgressFlowers = () => {
    const totalDays = progress?.total_days || 21;
    const currentDay = progress?.current_day || 1;
    
    return Array.from({ length: Math.min(7, totalDays) }, (_, index) => (
      <div
        key={index}
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
          index < currentDay 
            ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white' 
            : 'bg-gray-100 text-gray-400'
        }`}
      >
        {index + 1}
      </div>
    ));
  };

  return (
    <div className="px-6 mb-8">
      <Card className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Sua Jornada</h3>
          <p className="text-gray-600">
            Dia {progress?.current_day || 1} de {progress?.total_days || 21}
          </p>
        </div>
        
        <div className="flex justify-center gap-2 mb-6">
          {renderProgressFlowers()}
        </div>
        
        <Progress 
          value={((progress?.current_day || 1) / (progress?.total_days || 21)) * 100} 
          className="h-3 bg-gray-100 mb-3"
        />
        <p className="text-center text-sm text-gray-500">
          {Math.round(((progress?.current_day || 1) / (progress?.total_days || 21)) * 100)}% concluído
        </p>
      </Card>
    </div>
  );
};

export default ProgressSection;
