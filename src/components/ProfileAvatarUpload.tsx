
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, Camera } from "lucide-react";

interface ProfileAvatarUploadProps {
  userId: string;
  currentAvatarUrl?: string;
  onUploaded: (publicUrl: string) => void;
}

export default function ProfileAvatarUpload({ userId, currentAvatarUrl, onUploaded }: ProfileAvatarUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  // Preview image before upload
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(file.type) || file.size > 2 * 1024 * 1024) {
        alert("A imagem deve ser JPG/PNG/WebP e no máximo 2MB");
        return;
      }
      setPreviewUrl(URL.createObjectURL(file));
      handleUpload(file);
    }
  };

  // Handle the upload and save public URL
  async function handleUpload(file: File) {
    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage.from("avatars").upload(filePath, file, {
      upsert: true,
      cacheControl: "3600"
    });

    if (error) {
      alert("Falha ao fazer upload do avatar.");
      setUploading(false);
      return;
    }

    // Get the public URL
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    onUploaded(data.publicUrl);
    setUploading(false);
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
    </div>
  );
}
