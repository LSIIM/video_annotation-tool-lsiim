import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/Button';

interface Props {
  children: React.ReactNode;
  type: string;
  required?: boolean;
  changeable?: boolean;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ children, type, required, changeable, placeholder, onChange }: Props) {
  const [inputType, setInputType] = useState<string>(type);

  const togglePasswordVisibility = () => {
    setInputType(prevType => prevType === 'password' ? 'text' : 'password');
  };

  return (
    <div className="flex flex-col w-full text-sm font-normal text-zinc-400 mb-1">
      <label>{children}</label>
      <div className="relative flex items-center w-full">
        <input type={inputType} placeholder={placeholder || ""} required={required} onChange={onChange} className="w-full border-none ring-1 ring-zinc-400 h-8 text-zinc-500 font-semibold rounded-md focus:placeholder-transparent px-3" />
        {changeable && (
          <Button type="button" onClick={togglePasswordVisibility} className="absolute right-0 top-1/2 transform -translate-y-1/2 text-zinc-500 h-8 p-1 hover:text-zinc-600" >
            {inputType === 'password' ? <EyeOff /> : <Eye />}
          </Button>
        )}
      </div>
    </div>
  );
}
