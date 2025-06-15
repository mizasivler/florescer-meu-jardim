
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

  // Preview image before upload
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = e.target.files?.[0];
    if (file) {
      // Checagem estendida de tipo e tamanho
      if (!["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(file.type)) {
        const msg = "A imagem deve ser JPG/PNG/WebP";
        setErrorMessage(msg);
        toast({ title: "Tipo de imagem inválido", description: msg, variant: "destructive" });
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        const msg = "A imagem deve ter no máximo 2MB";
        setErrorMessage(msg);
        toast({ title: "Imagem muito grande", description: msg, variant: "destructive" });
        return;
      }
      setPreviewUrl(URL.createObjectURL(file));
      handleUpload(file);
    }
  };

  // Handle the upload and save public URL
  async function handleUpload(file: File) {
    setUploading(true);
    setErrorMessage(null);
    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${userId}/${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage.from("avatars").upload(filePath, file, {
        upsert: true,
        cacheControl: "3600"
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
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          {uploading ? <Loader2 className="animate-spin text-white w-7 h-7" /> : <Camera className="text-white w-7 h-7" />}
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
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
