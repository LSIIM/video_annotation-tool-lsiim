import { ArrowDown, ArrowUp, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface Props {
    text: string;
    index: number[];
    showButton: boolean;
    leftOnClick?: () => void;
    rightOnClick?: () => void;
}

export default function FrameController({ text, index, showButton, leftOnClick, rightOnClick }: Props) {
    const [value, maxValue] = index;
    const classNameAtual = showButton ? "h-10 text-sm" : "h-10 text-sm invisible";
    const classNameLeft = showButton && value > 1 ? "h-10 text-sm" : "h-10 text-sm invisible";
    const classNameRight = showButton && value < maxValue ? "h-10 text-sm" : "h-10 text-sm invisible";
    return (
        <div className="flex flex-row bg-customGray rounded-[20px] px-2 m-2 max-w-max">
            {text === "Frame Atual" ? (
                <button onClick={leftOnClick} className={classNameAtual}><ArrowUp /></button>
            ) : (
                <button onClick={leftOnClick} className={classNameLeft}><ChevronsLeft /></button>
            )}
            <div className="flex flex-row items-center">
                <p className='text-sm'>{text + ": " + value}</p>
            </div>
            {text === "Frame Atual" ? (
                <button onClick={rightOnClick} className={classNameAtual}><ArrowDown /></button>
            ) : (
                <button onClick={rightOnClick} className={classNameRight}><ChevronsRight /></button>
            )}
        </div>
    );
}

//6558f5 -> cor padrão, não era pra estar salvo aqui, mas vai ficar por ora