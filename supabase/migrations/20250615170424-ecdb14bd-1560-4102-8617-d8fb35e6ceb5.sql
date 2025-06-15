
-- Adicionar políticas DELETE faltantes em daily_moods
CREATE POLICY "Users can delete their own daily moods" 
  ON public.daily_moods FOR DELETE 
  USING (auth.uid() = user_id);

-- Adicionar políticas UPDATE/DELETE em meditation_sessions
CREATE POLICY "Users can update their own meditation sessions" 
  ON public.meditation_sessions FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own meditation sessions" 
  ON public.meditation_sessions FOR DELETE 
  USING (auth.uid() = user_id);

-- Adicionar políticas UPDATE/DELETE em ritual_completions
CREATE POLICY "Users can update their own ritual completions" 
  ON public.ritual_completions FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ritual completions" 
  ON public.ritual_completions FOR DELETE 
  USING (auth.uid() = user_id);

-- Adicionar política DELETE em user_progress
CREATE POLICY "Users can delete their own progress" 
  ON public.user_progress FOR DELETE 
  USING (auth.uid() = user_id);

-- Adicionar coluna gratitude_items à tabela diary_entries se ainda não existir
ALTER TABLE public.diary_entries 
ADD COLUMN IF NOT EXISTS gratitude_items JSONB DEFAULT '[]'::jsonb;

-- Função para validar formato de gratitude_items
CREATE OR REPLACE FUNCTION public.validate_gratitude_items()
RETURNS TRIGGER AS $$
BEGIN
  -- Verificar se gratitude_items é um array válido
  IF NEW.gratitude_items IS NOT NULL THEN
    IF jsonb_typeof(NEW.gratitude_items) != 'array' THEN
      RAISE EXCEPTION 'gratitude_items deve ser um array JSON';
    END IF;
    
    -- Verificar se todos os elementos são strings
    IF EXISTS (
      SELECT 1 
      FROM jsonb_array_elements(NEW.gratitude_items) AS elem
      WHERE jsonb_typeof(elem) != 'string'
    ) THEN
      RAISE EXCEPTION 'Todos os itens de gratitude_items devem ser strings';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para validar gratitude_items
DROP TRIGGER IF EXISTS validate_gratitude_items_trigger ON public.diary_entries;
CREATE TRIGGER validate_gratitude_items_trigger
  BEFORE INSERT OR UPDATE ON public.diary_entries
  FOR EACH ROW EXECUTE FUNCTION public.validate_gratitude_items();
