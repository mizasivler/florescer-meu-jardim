
import { Card } from "@/components/ui/card";

interface MoodOption {
  emoji: string;
  label: string;
}

interface MoodSelectorProps {
  selectedMood: string;
  onMoodSelect: (emoji: string, label: string) => void;
}

const MoodSelector = ({ selectedMood, onMoodSelect }: MoodSelectorProps) => {
  const moodOptions: MoodOption[] = [
    { emoji: '😴', label: 'Cansada' },
    { emoji: '😰', label: 'Aflita' },
    { emoji: '🥺', label: 'Sensível' },
    { emoji: '😤', label: 'Irritada' },
    { emoji: '🌟', label: 'Esperançosa' }
  ];

  return (
    <Card className="card-florescer">
      <div>
        <h3 className="font-lora font-semibold text-lg mb-4">Como você está se sentindo?</h3>
        <div className="flex justify-center gap-3">
          {moodOptions.map((mood) => (
            <button
              key={mood.label}
              onClick={() => onMoodSelect(mood.emoji, mood.label)}
              className={`flex flex-col items-center justify-center py-3 px-2 min-h-[80px] rounded-2xl transition-all duration-300 hover:scale-105 ${
                selectedMood === mood.emoji 
                  ? 'ring-2 ring-florescer-copper bg-florescer-copper/10' 
                  : 'bg-gray-50 hover:bg-florescer-copper/5'
              }`}
              title={mood.label}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-xs font-medium text-center text-florescer-dark/80">
                {mood.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MoodSelector;
