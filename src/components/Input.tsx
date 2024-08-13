import React from 'react'

interface Props {
  children: React.ReactNode;
  type: string;
  required?: boolean;
  hig?: boolean;
  style?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ children, type, required, hig, placeholder, onChange } : Props) {
  return (
    <>
      <label className={`${hig && "text-green-600"} flex flex-col w-full text-sm font-normal text-zinc-400 mb-1`}>
        {children}
        <input type={type} placeholder={placeholder?placeholder:""} required={required} onChange={onChange} className="w-full ring-1 ring-zinc-400 h-8 text-zinc-500 font-semibold rounded-sm focus:placeholder-transparent hover:ring-blue-400" />
      </label>
    </>
  )
}
