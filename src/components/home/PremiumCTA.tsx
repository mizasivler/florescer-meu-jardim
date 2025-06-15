
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PremiumCTA = () => {
  return (
    <div className="px-6">
      <Card className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-3xl p-8 shadow-sm">
        <div className="text-center">
          <div className="text-5xl mb-4">✨</div>
          <h3 className="text-2xl font-bold mb-3">Desbloqueie sua jornada completa</h3>
          <p className="text-yellow-100 mb-6 text-lg leading-relaxed">
            Acesse todos os rituais, meditações e conteúdos exclusivos
          </p>
          <Button className="bg-white text-orange-500 hover:bg-gray-50 font-bold text-lg py-4 px-8 rounded-2xl">
            Florescer 21 Premium - R$ 197
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PremiumCTA;
