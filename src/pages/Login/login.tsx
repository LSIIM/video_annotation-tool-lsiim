import { FormEvent, useEffect, useState } from 'react';
import Input from '../../components/Input'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/UseAuth';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Login() {
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const _navigate = useNavigate();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await login(password);
      if (result === undefined) {
        toast.success("Login efetuado com sucesso!");
        setTimeout(() => { }, 2000);
      } else {
        toast.error(result);
      }
    } catch (error) {
      toast.error("Erro ao efetuar login!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) _navigate('/');
  },[]);

  return (
    <>
      {isAuthenticated && <Navigate to='/' />}
      <div className="bg-fundo bg-cover bg-no-repeat h-screen w-screen">
        <div className="flex items-center justify-center h-screen backdrop-brightness-50 backdrop-blur-sm">
          <div className="flex max-w-[544px] bg-white p-10 rounded-md">
            <div className="flex flex-col items-center w-full gap-2">
              <img src='../assets/lsiim.png' className="h-12" />
              <h1 className="text-xl font-semibold">Acesse a ferramenta</h1>
              <form onSubmit={handleLogin} className="flex flex-col w-72">
                <Input placeholder='Senha de Acesso do LSIIM' changeable={true} onChange={event => setPassword(event.target.value)} required type='password'>Senha:</Input>
                {loading ?
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Carregando...
                  </Button>
                  :
                  <Button type='submit' disabled={false} className="bg-zinc-900 text-white hover:bg-zinc-900/75 transition mt-3">
                    Acessar
                  </Button>
                }
              </form>
              <p className="text-xs font-light">Ainda não tem conta ? <a href="/signup" className="font-semibold underline">Inscrever-se</a></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
