
export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  mood: 'cansada' | 'aflita' | 'sensivel' | 'irritada' | 'esperancosa';
  date: string;
  gratitude_items?: string[];
  created_at: string;
  updated_at: string;
}

export interface NewDiaryEntry {
  title: string;
  content: string;
  mood: 'cansada' | 'aflita' | 'sensivel' | 'irritada' | 'esperancosa';
  gratitude_items?: string[];
}

export interface DiaryStats {
  totalEntries: number;
  thisWeekEntries: number;
  mostCommonMood: string;
  moodCounts: Record<string, number>;
}
