
import { FrontendMood } from '@/types/diary';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateDiaryEntry = (data: {
  title: string;
  content: string;
  mood: string;
  gratitude_items?: string[];
}): ValidationResult => {
  const errors: string[] = [];

  // Validar título
  if (!data.title?.trim()) {
    errors.push('Título é obrigatório');
  } else if (data.title.length > 100) {
    errors.push('Título deve ter no máximo 100 caracteres');
  }

  // Validar conteúdo
  if (!data.content?.trim()) {
    errors.push('Conteúdo é obrigatório');
  } else if (data.content.length > 5000) {
    errors.push('Conteúdo deve ter no máximo 5000 caracteres');
  }

  // Validar mood
  const validMoods: FrontendMood[] = ['cansada', 'aflita', 'sensível', 'irritada', 'esperançosa'];
  if (!validMoods.includes(data.mood as FrontendMood)) {
    errors.push('Humor selecionado é inválido');
  }

  // Validar gratitude_items
  if (data.gratitude_items) {
    if (!Array.isArray(data.gratitude_items)) {
      errors.push('Itens de gratidão devem ser uma lista');
    } else {
      data.gratitude_items.forEach((item, index) => {
        if (typeof item !== 'string') {
          errors.push(`Item de gratidão ${index + 1} deve ser texto`);
        } else if (item.length > 200) {
          errors.push(`Item de gratidão ${index + 1} deve ter no máximo 200 caracteres`);
        }
      });
      
      if (data.gratitude_items.length > 10) {
        errors.push('Máximo de 10 itens de gratidão permitidos');
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const sanitizeText = (text: string): string => {
  return text.trim().replace(/\s+/g, ' ');
};

export const validateMoodValue = (mood: string): mood is FrontendMood => {
  const validMoods: FrontendMood[] = ['cansada', 'aflita', 'sensível', 'irritada', 'esperançosa'];
  return validMoods.includes(mood as FrontendMood);
};
