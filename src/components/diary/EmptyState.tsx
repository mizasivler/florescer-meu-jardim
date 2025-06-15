
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EmptyStateProps {
  onCreateEntry: () => void;
}

const EmptyState = ({ onCreateEntry }: EmptyStateProps) => {
  return (
    <Card className="card-florescer text-center py-8">
      <div className="text-6xl mb-4">📝</div>
      <h3 className="font-lora font-semibold text-lg mb-2 text-florescer-dark">
        Nenhuma entrada ainda
      </h3>
      <p className="text-florescer-dark/60 mb-4">
        Comece escrevendo sobre seus sentimentos e experiências
      </p>
      <Button onClick={onCreateEntry} className="btn-primary">
        Criar primeira entrada
      </Button>
    </Card>
  );
};

export default EmptyState;
