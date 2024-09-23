import { useState } from "react";

interface Props {
    onClick: (searchTerm: string) => void;
}

export default function SearchBar({ onClick }: Props) {
    const [inputValue, setInputValue] = useState("");

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClick(inputValue);
        }
    };

    return (
        <div className='rounded-lg mx-20 w-4/5 flex mt-3'>
            <input
                type="text"
                className='w-full rounded-l-lg p-2 flex flex-col justify-center bg-slate-600 focus:border-none'
                placeholder='Pesquisar por bebê'
                value={inputValue}
                onChange={(e) => {setInputValue(e.target.value); }}
                onKeyDown={handleKeyPress}
            />
            <div className='flex flex-col justify-center'>
                <img
                    src="https://img.icons8.com/ios/452/search--v1.png"
                    alt="search"
                    onClick={() => onClick(inputValue)}
                    className='w-10 h-10 bg-slate-400 rounded-r-lg p-1 hover:cursor-pointer hover:bg-slate-600'
                />
            </div>
        </div>
    );
}
