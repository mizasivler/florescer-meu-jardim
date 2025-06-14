
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, User, Bell, Shield, Heart, LogOut, ChevronRight } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [userName] = useState('Luciana Silva');
  const [userEmail] = useState('luciana@email.com');

  const settingsOptions = [
    {
      category: 'Conta',
      items: [
        { icon: User, label: 'Perfil Pessoal', description: 'Editar informações pessoais', action: () => {} },
        { icon: Bell, label: 'Notificações', description: 'Gerenciar lembretes e alertas', action: () => {} },
        { icon: Shield, label: 'Privacidade', description: 'Configurações de dados pessoais', action: () => {} }
      ]
    },
    {
      category: 'Jornada',
      items: [
        { icon: Heart, label: 'Meu Progresso', description: 'Histórico e conquistas', action: () => navigate('/forest') },
        { icon: User, label: 'Tipo de Menopausa', description: 'Atualizar questionário inicial', action: () => {} }
      ]
    },
    {
      category: 'Suporte',
      items: [
        { icon: Heart, label: 'Falar com Célia', description: 'Conversar com sua mentora', action: () => navigate('/celia') },
        { icon: Shield, label: 'Suporte', description: 'Ajuda e contato', action: () => {} }
      ]
    }
  ];

  return (
    <div className="min-h-screen gradient-florescer pb-20">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="text-florescer-copper"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-lora font-bold text-florescer-dark">
              Configurações
            </h1>
            <p className="text-florescer-dark/70">Personalize sua experiência</p>
          </div>
        </div>

        {/* Profile Card */}
        <Card className="card-florescer mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-florescer-copper rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-lora font-semibold text-lg text-florescer-dark">
                {userName}
              </h3>
              <p className="text-florescer-dark/60 text-sm">{userEmail}</p>
              <p className="text-florescer-copper text-sm mt-1">Dia 5 da jornada • Premium</p>
            </div>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Settings Sections */}
      <div className="px-6 space-y-6">
        {settingsOptions.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className="font-lora font-semibold text-lg mb-3 text-florescer-dark">
              {section.category}
            </h2>
            
            <Card className="card-florescer p-0">
              <div className="divide-y divide-gray-100">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    onClick={item.action}
                    className="w-full p-4 flex items-center gap-4 hover:bg-florescer-cream/30 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="w-10 h-10 bg-florescer-olive/20 rounded-lg flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-florescer-olive" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-florescer-dark">{item.label}</h3>
                      <p className="text-sm text-florescer-dark/60">{item.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                ))}
              </div>
            </Card>
          </div>
        ))}

        {/* Notification Toggle */}
        <Card className="card-florescer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Bell className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-medium text-florescer-dark">Lembretes Diários</h3>
                <p className="text-sm text-florescer-dark/60">Receber notificações dos rituais</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors ${
                notifications ? 'bg-florescer-copper' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </Card>

        {/* App Info */}
        <Card className="card-florescer">
          <div className="text-center">
            <div className="text-4xl mb-3">🌸</div>
            <h3 className="font-lora font-semibold text-lg mb-2 text-florescer-dark">
              Florescer 21
            </h3>
            <p className="text-florescer-dark/60 text-sm mb-4">
              Versão 1.0.0 • Sua jornada de bem-estar na menopausa
            </p>
            <p className="text-xs text-florescer-dark/50">
              Desenvolvido com 💜 para mulheres que florescem
            </p>
          </div>
        </Card>

        {/* Logout Button */}
        <Card className="card-florescer border-red-100">
          <button className="w-full flex items-center justify-center gap-3 text-red-600 hover:text-red-700 transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Sair da Conta</span>
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
