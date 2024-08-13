import { useNavigate } from 'react-router-dom';
import logo from '../assets/react.svg';
import { useAuth } from '@/hooks/UseAuth';

export default function Header(){
    const _navigate = useNavigate();
    const login = () => _navigate('/login');
    const { logout, isAuthenticated } = useAuth();

    return(
        <div>
            <section className='flex justify-between px-10 items-center bg-zinc-900'>
                <div className='mx-10'/>
                <div className='ml-4 flex hover:opacity-50 cursor-default' onClick={() => _navigate('/1')}>
                    <img src={logo} alt="logo"/>
                    <h1>Ferramenta de Anotação de Vídeos do LSIIM/UFSC</h1>
                </div>
                <div className='flex gap-2 hover:'>
                    <button className='bg-zinc-800 p-2 text-white m-1' onClick={() => _navigate('/about')}>About</button>
                    {isAuthenticated ? 
                        <button className='bg-red-600 p-2 text-white m-1' onClick={logout}>Logout</button> 
                    : 
                        <button className='bg-green-600 p-2 text-white m-1' onClick={login}>Login</button>
                    }
                </div>
            </section>
        </div>
    )
}