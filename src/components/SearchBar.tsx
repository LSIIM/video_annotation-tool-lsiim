interface Props {
    onClick: () => void;
}

export default function SearchBar({ onClick }: Props) {

    return (
        <div className='rounded-lg mx-20 w-4/5 flex mt-3' >
            {/* <input type="text" className='w-full rounded-l-lg p-2' placeholder='Pesquisar por bebê' /> */}
            <input type="text" className='w-full rounded-l-lg p-2 flex flex-col justify-center bg-slate-600 focus:border-none' placeholder='Pesquisar por bebê' />
            <div className='flex flex-col justify-center'>                
                <img src="https://img.icons8.com/ios/452/search--v1.png" alt="search" onClick={onClick} className='w-10 h-10 bg-slate-400 rounded-r-lg p-1 hover:cursor-pointer hover:bg-slate-600' />
            </div>
        </div>
    )
}