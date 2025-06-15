
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  onBack?: () => void;
  extra?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  onBack,
  extra,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-4 mb-6 ${className}`}>
      {onBack && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-florescer-copper"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      )}
      <div className="flex-1">
        <h1 className="text-2xl font-lora font-bold text-florescer-dark">{title}</h1>
        {description && (
          <p className="text-florescer-dark/70">{description}</p>
        )}
      </div>
      {extra}
    </div>
  );
};

export default PageHeader;
