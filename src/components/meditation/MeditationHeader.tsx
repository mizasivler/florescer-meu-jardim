
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MeditationHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 pt-8 pb-6">
      <div className="flex items-center gap-4 mb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/')}
          className="text-gray-600 hover:bg-white/50 rounded-full p-3"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Meditações</h1>
          <p className="text-gray-600 text-lg">Encontre sua paz interior</p>
        </div>
      </div>
    </div>
  );
};

export default MeditationHeader;
