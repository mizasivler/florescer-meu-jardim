
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FeaturedCard = () => {
  return (
    <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-3xl p-8 shadow-lg mb-8">
      <div className="text-center">
        <div className="text-5xl mb-4">🧘‍♀️</div>
        <h3 className="text-2xl font-bold mb-3">Sessão Guiada do Dia</h3>
        <p className="text-purple-100 mb-6 text-lg leading-relaxed">
          Uma prática especial selecionada para você hoje
        </p>
        <Button className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm rounded-2xl font-semibold px-8">
          Começar Agora
        </Button>
      </div>
    </Card>
  );
};

export default FeaturedCard;
