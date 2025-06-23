
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileAvatarUploadProps {
  userId: string;
  currentAvatarUrl?: string;
  onUploaded: (publicUrl: string) => void;
}

export default function ProfileAvatarUpload({ userId, currentAvatarUrl, onUploaded }: ProfileAvatarUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  // Enhanced security: File validation with detailed checks
  const validateFile = async (file: File): Promise<{ isValid: boolean; error?: string }> => {
    // Check file type (whitelist approach)
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, error: "Apenas imagens PNG, JPG, JPEG ou WebP são permitidas" };
    }

    // Check file size (2MB max)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return { isValid: false, error: "A imagem deve ter no máximo 2MB" };
    }

    // Check minimum dimensions (prevent 1x1 pixel attacks)
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.width < 50 || img.height < 50) {
          resolve({ isValid: false, error: "A imagem deve ter pelo menos 50x50 pixels" });
        } else if (img.width > 2048 || img.height > 2048) {
          resolve({ isValid: false, error: "A imagem deve ter no máximo 2048x2048 pixels" });
        } else {
          resolve({ isValid: true });
        }
      };
      img.onerror = () => {
        resolve({ isValid: false, error: "Arquivo de imagem inválido ou corrompido" });
      };
      img.src = URL.createObjectURL(file);
    });
  };

  // Preview image before upload with enhanced validation
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = e.target.files?.[0];
    
    if (!file) return;

    // Complete validation (now properly awaited)
    const validation = await validateFile(file);
    if (!validation.isValid) {
      setErrorMessage(validation.error!);
      toast({ title: "Arquivo inválido", description: validation.error!, variant: "destructive" });
      return;
    }

    // Create preview
    setPreviewUrl(URL.createObjectURL(file));
    handleUpload(file);
  };

  // Enhanced upload with better error handling and security
  async function handleUpload(file: File) {
    setUploading(true);
    setErrorMessage(null);
    
    try {
      // Generate secure file path with user ID and timestamp
      const fileExt = file.name.split(".").pop()?.toLowerCase();
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 8);
      const filePath = `${userId}/${timestamp}_${randomString}.${fileExt}`;

      // Delete old avatar if exists (cleanup)
      if (currentAvatarUrl) {
        try {
          const oldFilePath = currentAvatarUrl.split('/').pop();
          if (oldFilePath) {
            await supabase.storage.from("avatars").remove([`${userId}/${oldFilePath}`]);
          }
        } catch (cleanupError) {
          console.warn("Could not cleanup old avatar:", cleanupError);
          // Continue with upload even if cleanup fails
        }
      }

      // Upload with enhanced security options
      const { error } = await supabase.storage.from("avatars").upload(filePath, file, {
        upsert: false, // Don't overwrite, use unique names instead
        cacheControl: "3600",
        contentType: file.type // Explicitly set content type
      });

      if (error) {
        console.error("Supabase upload error:", error);
        const msg = "Falha ao fazer upload do avatar. Verifique sua conexão ou tente novamente.";
        setErrorMessage(msg);
        toast({ title: "Erro no upload", description: msg, variant: "destructive" });
        setUploading(false);
        return;
      }

      // Get the public URL
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      if (!data?.publicUrl) {
        const msg = "URL pública não encontrada para o avatar.";
        setErrorMessage(msg);
        toast({ title: "Erro", description: msg, variant: "destructive" });
        setUploading(false);
        return;
      }

      onUploaded(data.publicUrl);
      toast({ title: "Avatar atualizado!", description: "Sua foto foi atualizada com sucesso." });
      setUploading(false);
    } catch (err: any) {
      console.error("Erro inesperado no upload de avatar:", err);
      const msg = "Erro inesperado ao fazer upload do avatar.";
      setErrorMessage(msg);
      toast({ title: "Erro inesperado", description: msg, variant: "destructive" });
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative w-20 h-20 rounded-full border-2 border-florescer-copper bg-gray-100 overflow-hidden cursor-pointer group"
        onClick={() => fileInput.current?.click()}
        title="Trocar foto de perfil"
      >
        <img
          src={previewUrl || currentAvatarUrl || "/placeholder.svg"}
          alt="Avatar"
          className="object-cover w-full h-full"
          onError={(e) => {
            // Fallback for broken images
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          {uploading ? <Loader2 className="animate-spin text-white w-7 h-7" /> : <Camera className="text-white w-7 h-7" />}
        </div>
      </div>
      <input
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        ref={fileInput}
        className="hidden"
        disabled={uploading}
        onChange={handleChange}
      />
      <span className="text-xs text-gray-500">PNG, JPG, ou WEBP até 2MB</span>
      {errorMessage && (
        <div className="text-xs text-red-600 text-center mt-1 max-w-[180px]">{errorMessage}</div>
      )}
    </div>
  );
}
