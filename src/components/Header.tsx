import logo from '../assets/react.svg';
import { useNavigate } from 'react-router-dom';
// import styles from '../'


export default function Header(){
    const _navigate = useNavigate();

    return(
        <div>
            <section className='flex justify-between px-10 items-center'>
                <div className='flex hover:opacity-50 cursor-default' onClick={() => _navigate('/1')}>
                    <img src={logo} alt="logo"/>
                    <h1>Ferramenta de Anotação de Vídeos do LSIIM/UFSC</h1>
                </div>
                <div className='flex gap-2 hover:'>
                    <button onClick={() => _navigate('/about')}>About</button>
                    <button onClick={() => _navigate('/login')}>Login</button>
                </div>
            </section>
        </div>
    )
}