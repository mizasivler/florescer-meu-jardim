
// Mapping between frontend Portuguese moods and database English moods
export const moodMapping = {
  'cansada': 'tired',
  'aflita': 'anxious', 
  'sensível': 'sensitive',
  'irritada': 'irritated',
  'esperançosa': 'hopeful'
} as const;

export const reverseMoodMapping = {
  'tired': 'sensível',
  'anxious': 'aflita',
  'sensitive': 'sensível', 
  'irritated': 'irritada',
  'hopeful': 'esperançosa'
} as const;

export type DatabaseMood = keyof typeof reverseMoodMapping;
export type FrontendMood = keyof typeof moodMapping;

export const convertToFrontendMood = (dbMood: DatabaseMood | null | undefined): FrontendMood => {
  if (!dbMood) return 'esperançosa';
  return reverseMoodMapping[dbMood] || 'esperançosa';
};

export const convertToDatabaseMood = (frontendMood: FrontendMood): DatabaseMood => {
  return moodMapping[frontendMood];
};
