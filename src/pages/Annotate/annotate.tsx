import AnnotationContainer from "@/components/AnnotationContainer";
import FrameController from "@/components/FrameController";
import Header from "@/components/Header"
import { useAuth } from "@/hooks/UseAuth";
import { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

interface Annotation {
    frames: number[];
    description: string;
}

export default function Annotate() {
    const { id } = useParams();  // Acessa o valor do parâmetro "id"
    const [totalFrames, setTotalFrames] = useState(100);
    const [currentFrame, setCurrentFrame] = useState(1);
    const [initialFrame, setInitialFrame] = useState(1);
    const [endFrame, setEndFrame] = useState(1);
    const _navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const fps = 30;
    const [annotations, setAnnotations] = useState<Annotation[]>([]);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            const updateFrame = () => {
                const currentTime = video.currentTime;
                const frame = Math.floor(currentTime * fps);
                setCurrentFrame(frame);
            };
            video.addEventListener('timeupdate', updateFrame);
            return () => {
                video.removeEventListener('timeupdate', updateFrame);
            };
        }
    }, []);

    useEffect(() => {
        const loadAnnotations = async () => {
            try {
                const response = await fetch(`/videos/${id}/annotation.json`);
                const data = await response.json();
                setAnnotations(data.annotations);
            } catch (error) {()=>{}}
        };

        loadAnnotations();
    }, [id]);

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
        else if (option == "setInitial") {
            if (endFrame > currentFrame) setInitialFrame(currentFrame);
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
        else if (option == "setEnd") {
            if (initialFrame < currentFrame) setEndFrame(currentFrame);
        }
    }

    return (
        <div className='flex-col h-screen w-screen bg-gray-900 text-white'>
            <Header />
            <div className="flex justify-center my-8">
                <div id="video-controller" className="flex flex-col items-center">
                    <video ref={videoRef} id="my-video" controls src={`/videos/${id}/record.mp4`} className="w-[80%] h-auto rounded-lg shadow-lg mb-4" />
                    <div className="flex flex-col items-center">
                        <FrameController text="Frame Inicial" index={initialFrame} leftOnClick={() => { handleLeftOnClick("initial") }} rightOnClick={() => { handleRightOnClick("initial") }} />
                        <FrameController text="Frame Atual" index={currentFrame} leftOnClick={() => { handleLeftOnClick("setInitial") }} rightOnClick={() => { handleRightOnClick("setEnd") }} />
                        <FrameController text="Frame Final" index={endFrame} leftOnClick={() => { handleLeftOnClick("end") }} rightOnClick={() => { handleRightOnClick("end") }} />
                    </div>
                    <div className='flex justify-center space-x-4'>
                        <button onClick={() => _navigate('/')} className="bg-gray-700 hover:bg-gray-500 text-white rounded-lg px-6 py-2 text-xl">
                            Voltar
                        </button>
                        <button onClick={() => { }} className="bg-green-600 hover:bg-green-800 text-white rounded-lg px-6 py-2 text-xl">Salvar</button>
                    </div>
                </div>
                <AnnotationContainer annotations={annotations} />
            </div>
        </div>

    );
}