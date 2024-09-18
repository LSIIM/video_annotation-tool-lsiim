import { ArrowDown, ArrowUp, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface Props {
    text: string;
    index: number;
    leftOnClick: () => void;
    rightOnClick: () => void;
}

export default function FrameController({ text, index, leftOnClick, rightOnClick}: Props) {
    return (
        <div className="flex flex-row bg-customGray rounded-[20px] px-2 m-2">
            {text=="Frame Atual"?
                <button onClick={leftOnClick} className="h-10 text-sm"><ArrowUp /></button>
            :
                <button onClick={leftOnClick} className="h-10 text-sm"><ChevronsLeft /></button>
            }
            <div className="flex flex-row items-center">
                <p>{text + ": " + index}</p>
            </div>
            {text=="Frame Atual"?
                <button onClick={rightOnClick} className="h-10 text-sm"><ArrowDown /></button>    
            :
                <button onClick={rightOnClick} className="h-10 text-sm"><ChevronsRight /></button>    
            }
        </div>
    );
}

//6558f5 -> cor padrão, não era pra estar salvo aqui, mas vai ficar por ora