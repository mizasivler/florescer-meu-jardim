
import { useAuth } from './useAuth';
import { useDiaryData } from './useDiaryData';
import { calculateDiaryStats } from '@/utils/diaryStats';

export type { DiaryEntry, NewDiaryEntry } from '@/types/diary';

export const useDiary = () => {
  const { user } = useAuth();
  const diaryData = useDiaryData(user?.id);

  const getEntriesStats = () => {
    return calculateDiaryStats(diaryData.entries);
  };

  return {
    ...diaryData,
    getEntriesStats
  };
};
