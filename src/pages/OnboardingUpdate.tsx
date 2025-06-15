
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OnboardingUpdate = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen gradient-florescer p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="text-florescer-copper"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-lora font-bold text-florescer-dark">Tipo de Menopausa</h1>
      </div>
      <div className="bg-white rounded-xl p-6 shadow text-florescer-dark">
        <p>Atualize seu questionário de menopausa. (A implementar)</p>
      </div>
    </div>
  );
};

export default OnboardingUpdate;
