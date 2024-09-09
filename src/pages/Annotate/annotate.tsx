import FrameController from "@/components/FrameController";
import Header from "@/components/Header"
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Annotate() {
    const { id } = useParams();  // Acessa o valor do parâmetro "id"
    const [totalFrames, setTotalFrames] = useState(100);
    const [currentFrame, setCurrentFrame] = useState(1);
    const [initialFrame, setInitialFrame] = useState(1);
    const [endFrame, setEndFrame] = useState(1);
    const _navigate = useNavigate();
    const src = "../../videos/14/record.mp4";

    function handleLeftOnClick(option: string) {
        if (option == "initial") {
            let aux = initialFrame - 5;
            if (aux < 1) aux = 1;
            setInitialFrame(aux);
        }
        else if (option == "end") {
            let aux = endFrame - 5;
            if (aux < 1) aux = 1;
            if (aux < initialFrame) aux = initialFrame + 1;
            setEndFrame(aux);
        }
    }

    function handleRightOnClick(option: string) {
        if (option == "initial") {
            let aux = initialFrame + 5;
            if (aux > totalFrames) aux = totalFrames;
            if (aux > endFrame) aux = endFrame;
            setInitialFrame(aux);
        }
        else if (option == "end") {
            let aux = endFrame + 5;
            if (aux > totalFrames) aux = totalFrames;
            setEndFrame(aux);
        }
    }
    
    return (
        <div className='flex-col h-screen w-screen'>
            <Header />
            <div id="video-controller" className="flex">
                <video id="my-video" controls src={src} className="max-w-2xl max-h-2xl object-cover rounded-l-lg" />
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <FrameController text="Frame Inicial" index={initialFrame} leftOnClick={() => { handleLeftOnClick("initial") }} rightOnClick={() => { handleRightOnClick("initial") }} />
                        <p>Frame Atual: {currentFrame}</p>
                        <FrameController text="Frame Final" index={endFrame} leftOnClick={() => { handleLeftOnClick("end") }} rightOnClick={() => { handleRightOnClick("end") }} />
                    </div>
                </div>
            </div>
            <div className='flex'>
                <button onClick={() => _navigate('/')} className="bg-gray-200/50 rounded-[30px] h-10 hover:bg-gray-500 text-2xl">Voltar</button>
                <button onClick={() => { }} className="bg-green-600/70 rounded-[30px] h-10 hover:bg-green-800 text-2xl">Salvar</button>
            </div>
        </div>
    );
}