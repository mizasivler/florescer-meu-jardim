
// Mapping between frontend Portuguese moods and database English moods
export const moodMapping = {
  'cansada': 'tired',
  'aflita': 'anxious', 
  'sensivel': 'sensitive',
  'irritada': 'irritated',
  'esperancosa': 'hopeful'
} as const;

export const reverseMoodMapping = {
  'tired': 'cansada',
  'anxious': 'aflita',
  'sensitive': 'sensivel', 
  'irritated': 'irritada',
  'hopeful': 'esperancosa'
} as const;

export type DatabaseMood = keyof typeof reverseMoodMapping;
export type FrontendMood = keyof typeof moodMapping;

export const convertToFrontendMood = (dbMood: DatabaseMood | null | undefined): FrontendMood => {
  if (!dbMood) return 'esperancosa';
  return reverseMoodMapping[dbMood] || 'esperancosa';
};

export const convertToDatabaseMood = (frontendMood: FrontendMood): DatabaseMood => {
  return moodMapping[frontendMood];
};
