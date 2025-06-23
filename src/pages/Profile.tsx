
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "@/hooks/useUserData";
import { useToast } from "@/hooks/use-toast";
import ProfileAvatarUpload from "@/components/ProfileAvatarUpload";

const Profile = () => {
  const navigate = useNavigate();
  const { profile, updateProfile, saveAvatarUrl, refetch } = useUserData();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || ''
  });

  // Update form when profile loads
  useState(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || ''
      });
    }
  }, [profile]);

  const handleSave = async () => {
    if (!profile) return;

    setIsSaving(true);
    try {
      const { error } = await updateProfile({
        name: formData.name.trim(),
        email: formData.email.trim()
      });

      if (error) {
        toast({
          title: "Erro ao salvar",
          description: error,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Perfil atualizado!",
          description: "Suas informações foram salvas com sucesso."
        });
        setIsEditing(false);
      }
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUploaded = async (publicUrl: string) => {
    await saveAvatarUrl(publicUrl);
    await refetch();
    toast({
      title: "Avatar atualizado!",
      description: "Sua foto de perfil foi atualizada."
    });
  };

  if (!profile) {
    return (
      <div className="min-h-screen gradient-florescer p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-florescer-copper" />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-florescer p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="text-florescer-copper"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-lora font-bold text-florescer-dark">Perfil Pessoal</h1>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Avatar Section */}
        <Card className="card-florescer">
          <div className="text-center">
            <h2 className="text-lg font-lora font-semibold mb-4 text-florescer-dark">
              Foto de Perfil
            </h2>
            <ProfileAvatarUpload
              userId={profile.id}
              currentAvatarUrl={profile.avatar_url || undefined}
              onUploaded={handleAvatarUploaded}
            />
          </div>
        </Card>

        {/* Profile Information */}
        <Card className="card-florescer">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-lora font-semibold text-florescer-dark">
              Informações Pessoais
            </h2>
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="border-florescer-copper text-florescer-copper hover:bg-florescer-copper hover:text-white"
              >
                Editar
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-florescer-dark font-medium">
                Nome
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
                className="mt-1"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-florescer-dark font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                disabled={!isEditing}
                className="mt-1"
                placeholder="seu@email.com"
              />
            </div>

            {isEditing && (
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 bg-florescer-copper hover:bg-florescer-copper/90"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: profile.name || '',
                      email: profile.email || ''
                    });
                  }}
                  disabled={isSaving}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Account Information */}
        <Card className="card-florescer">
          <h2 className="text-lg font-lora font-semibold mb-4 text-florescer-dark">
            Informações da Conta
          </h2>
          <div className="space-y-3 text-sm text-florescer-dark/70">
            <div className="flex justify-between">
              <span>Data de cadastro:</span>
              <span>{new Date(profile.created_at || '').toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex justify-between">
              <span>Última atualização:</span>
              <span>{new Date(profile.updated_at || '').toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex justify-between">
              <span>Status do onboarding:</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                profile.onboarding_completed 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {profile.onboarding_completed ? 'Concluído' : 'Pendente'}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
