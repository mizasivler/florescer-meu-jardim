
import { DiaryEntry, DiaryStats } from '@/types/diary';

export const calculateDiaryStats = (entries: DiaryEntry[]): DiaryStats => {
  const totalEntries = entries.length;
  const thisWeekEntries = entries.filter(entry => {
    const entryDate = new Date(entry.created_at);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return entryDate >= oneWeekAgo;
  }).length;

  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostCommonMood = Object.entries(moodCounts).reduce((a, b) => 
    moodCounts[a[0]] > moodCounts[b[0]] ? a : b
  )?.[0] || 'esperançosa'; // Corrigido: era 'esperancosa'

  return {
    totalEntries,
    thisWeekEntries,
    mostCommonMood,
    moodCounts
  };
};
