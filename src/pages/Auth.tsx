
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Erro no login",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Login realizado com sucesso!",
            description: "Bem-vinda de volta ao Florescer 21"
          });
          navigate('/');
        }
      } else {
        if (!name.trim()) {
          toast({
            title: "Nome obrigatório",
            description: "Por favor, digite seu nome",
            variant: "destructive"
          });
          return;
        }
        
        const { error } = await signUp(email, password, name);
        if (error) {
          toast({
            title: "Erro no cadastro",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Cadastro realizado!",
            description: "Verifique seu e-mail para confirmar a conta"
          });
        }
      }
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Tente novamente em alguns instantes",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-florescer flex items-center justify-center p-6">
      <Card className="card-florescer max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-florescer-copper rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-lora font-bold text-florescer-dark mb-2">
            {isLogin ? 'Bem-vinda de volta!' : 'Junte-se ao Florescer 21'}
          </h1>
          <p className="text-florescer-dark/70 text-lg">
            {isLogin 
              ? 'Continue sua jornada de transformação' 
              : 'Comece sua jornada de autoconhecimento'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <Label htmlFor="name" className="text-base font-medium">Nome</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-florescer-dark/50" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-12 text-lg"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="email" className="text-base font-medium">E-mail</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-florescer-dark/50" />
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 text-lg"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="text-base font-medium">Senha</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-florescer-dark/50" />
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-12 text-lg"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full h-12 text-lg"
          >
            {loading 
              ? 'Processando...' 
              : isLogin 
                ? 'Entrar' 
                : 'Criar Conta'
            }
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-florescer-dark/70">
            {isLogin ? 'Ainda não tem uma conta?' : 'Já tem uma conta?'}
          </p>
          <Button
            variant="ghost"
            onClick={() => setIsLogin(!isLogin)}
            className="text-florescer-copper hover:text-florescer-copper/80 font-semibold"
          >
            {isLogin ? 'Criar nova conta' : 'Fazer login'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
