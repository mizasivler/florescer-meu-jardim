
// Mapping between frontend Portuguese moods and database English moods
export const moodMapping = {
  'cansada': 'tired',
  'aflita': 'anxious', 
  'sensível': 'sensitive',
  'irritada': 'irritated',
  'esperançosa': 'hopeful'
} as const;

export const reverseMoodMapping = {
  'tired': 'cansada',
  'anxious': 'aflita',
  'sensitive': 'sensível', 
  'irritated': 'irritada',
  'hopeful': 'esperançosa'
} as const;

export type DatabaseMood = keyof typeof reverseMoodMapping;
export type FrontendMood = keyof typeof moodMapping;

export const convertToFrontendMood = (dbMood: DatabaseMood | null | undefined): FrontendMood => {
  console.log('🔄 convertToFrontendMood - entrada:', dbMood);
  if (!dbMood) {
    console.log('⚠️ dbMood é null/undefined, retornando esperançosa');
    return 'esperançosa';
  }
  const result = reverseMoodMapping[dbMood] || 'esperançosa';
  console.log('✅ convertToFrontendMood - resultado:', result);
  return result;
};

export const convertToDatabaseMood = (frontendMood: FrontendMood): DatabaseMood => {
  console.log('🔄 convertToDatabaseMood - entrada:', frontendMood);
  const result = moodMapping[frontendMood];
  console.log('✅ convertToDatabaseMood - resultado:', result);
  
  if (!result) {
    console.error('❌ ERRO: Mood não encontrado no mapeamento:', frontendMood);
    console.error('📋 Moods disponíveis:', Object.keys(moodMapping));
  }
  
  return result;
};
