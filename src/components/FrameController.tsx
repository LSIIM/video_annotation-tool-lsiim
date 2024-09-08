interface Props {
    text: string;
    index: number;
    leftOnClick: () => void;
    rightOnClick: () => void;
}

export default function FrameController({ text, index, leftOnClick, rightOnClick}: Props) {
    const back = "<< |";
    const forward = "| >>";
    return (
        <div className="flex flex-row bg-customGray rounded-[20px] px-2 m-2">
            <button onClick={leftOnClick} className="h-10 text-sm">{back}</button>
            <div className="flex flex-row items-center">
                <p>{text}:</p>
                <p>{index}</p>
            </div>
            <button onClick={rightOnClick} className="h-10 text-sm">{forward}</button>    
        </div>
    );
}

//6558f5 -> cor padrão, não era pra estar salvo aqui, mas vai ficar por ora