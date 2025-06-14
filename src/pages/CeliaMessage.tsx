
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Heart, Sparkles } from 'lucide-react';

const CeliaMessage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'celia',
      content: 'Olá, querida! Sou a Célia, sua companheira nesta jornada. Como você está se sentindo hoje?',
      timestamp: '09:00'
    },
    {
      id: 2,
      type: 'user',
      content: 'Oi Célia! Estou me sentindo um pouco ansiosa hoje...',
      timestamp: '09:05'
    },
    {
      id: 3,
      type: 'celia',
      content: 'Entendo perfeitamente. A ansiedade é uma companheira frequente durante a menopausa. Que tal começarmos com uma respiração consciente? Inspire por 4, segure por 4, expire por 6. Você quer tentar comigo?',
      timestamp: '09:06'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    'Como lidar com a ansiedade?',
    'Exercícios de respiração',
    'Preciso de motivação',
    'Conselhos para hoje'
  ];

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: content,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate Célia's response
    setTimeout(() => {
      const responses = [
        'Sua coragem em buscar autoconhecimento é inspiradora! Lembre-se: cada dia é uma nova oportunidade de florescimento.',
        'Que bela reflexão! A menopausa é uma fase de transformação, e você está navegando com tanta sabedoria.',
        'Sinto orgulho de acompanhar sua jornada. Você é mais forte do que imagina, querida.',
        'Obrigada por compartilhar isso comigo. Vamos juntas encontrar estratégias que funcionem para você.',
        'Lembre-se: seus sentimentos são válidos e temporários. Você tem todas as ferramentas dentro de si.'
      ];

      const celiaMessage = {
        id: messages.length + 2,
        type: 'celia' as const,
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, celiaMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen gradient-florescer pb-20">
      {/* Header */}
      <div className="p-6 pb-4 bg-white/50 backdrop-blur-sm border-b border-florescer-copper/20">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="text-florescer-copper"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 bg-florescer-copper rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-lora font-bold text-florescer-dark">
                Célia
              </h1>
              <p className="text-sm text-florescer-dark/70">Sua mentora de bem-estar</p>
            </div>
          </div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              {message.type === 'celia' && (
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-florescer-copper rounded-full flex items-center justify-center">
                    <Heart className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-xs text-florescer-dark/60">Célia</span>
                </div>
              )}
              
              <Card className={`${
                message.type === 'user' 
                  ? 'bg-florescer-copper text-white' 
                  : 'bg-white border-florescer-copper/20'
              } p-3`}>
                <p className={`text-sm ${
                  message.type === 'user' ? 'text-white' : 'text-florescer-dark'
                }`}>
                  {message.content}
                </p>
                <div className={`text-xs mt-2 ${
                  message.type === 'user' 
                    ? 'text-white/70 text-right' 
                    : 'text-florescer-dark/60'
                }`}>
                  {message.timestamp}
                </div>
              </Card>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%]">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-florescer-copper rounded-full flex items-center justify-center">
                  <Heart className="h-3 w-3 text-white" />
                </div>
                <span className="text-xs text-florescer-dark/60">Célia está digitando...</span>
              </div>
              <Card className="bg-white border-florescer-copper/20 p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-florescer-copper rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-florescer-copper rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-florescer-copper rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Quick Replies */}
      <div className="px-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {quickReplies.map((reply, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => sendMessage(reply)}
              className="text-xs border-florescer-copper text-florescer-copper hover:bg-florescer-copper hover:text-white"
            >
              {reply}
            </Button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-florescer-copper/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(newMessage)}
            placeholder="Digite sua mensagem para Célia..."
            className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-florescer-copper focus:border-transparent"
          />
          <Button
            onClick={() => sendMessage(newMessage)}
            disabled={!newMessage.trim()}
            className="bg-florescer-copper hover:bg-florescer-copper/90 text-white px-4"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Inspiration Card */}
      <div className="px-4 pb-4">
        <Card className="bg-gradient-to-r from-florescer-copper/10 to-florescer-olive/10 border-florescer-copper/20">
          <div className="text-center">
            <Sparkles className="h-6 w-6 text-florescer-copper mx-auto mb-2" />
            <p className="text-sm text-florescer-dark/80 italic">
              "Cada conversa é um passo em direção ao seu florescimento interior."
            </p>
            <p className="text-xs text-florescer-dark/60 mt-1">- Célia</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CeliaMessage;
