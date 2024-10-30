import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/UseAuth';

export default function Header() {
    const _navigate = useNavigate();
    const login = () => _navigate('/login');
    const { logout, isAuthenticated } = useAuth();

    return (
        <div>
            <section className='flex justify-between px-10 items-center bg-zinc-900'>
                <div/>
                <div className='ml-20 flex hover:opacity-50 cursor-default w-3/4 justify-center gap-2' onClick={() => _navigate('/')}>
                    <p className='text-2xl'>Ferramenta de Anotação de Vídeos do LSIIM/UFSC</p>
                </div>
                <div className='flex gap-2'>
                    <button className='bg-zinc-800 p-1 px-2 my-2 text-white m-1' onClick={() => _navigate('/about')}>About</button>
                    {isAuthenticated ?
                        <button className='bg-red-600 p-1 px-2 my-2 text-white m-1' onClick={logout}>Logout</button>
                        :
                        <button className='bg-green-600 p-1 px-2 my-2 text-white m-1' onClick={login}>Login</button>
                    }
                </div>
            </section>
        </div>
    )
}