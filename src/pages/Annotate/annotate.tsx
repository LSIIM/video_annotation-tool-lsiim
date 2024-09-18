import AnnotationContainer from "@/components/AnnotationContainer";
import FrameController from "@/components/FrameController";
import Header from "@/components/Header";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast';

interface Annotation {
    frames: number[];
    description: string;
}

export default function Annotate() {
    const { id } = useParams();
    const [totalFrames, setTotalFrames] = useState(100);
    const [currentFrame, setCurrentFrame] = useState(1);
    const [initialFrame, setInitialFrame] = useState(1);
    const [endFrame, setEndFrame] = useState(1);
    const _navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const fps = 30;
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const options = ["fixação", "limitação", "disparidade"];
    const [selectedOption, setSelectedOption] = useState(options[0]); // Estado para a opção selecionada

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
            } catch (error) {
                toast.error("Erro ao carregar anotações.");
            }
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

    function handleSaveAnnotation() {
        const newAnnotation: Annotation = {
            frames: [initialFrame, endFrame],
            description: selectedOption
        };

        setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
        toast.success("Anotação salva com sucesso!");

        // Simulação de save (substitua pela lógica de API, se houver)
        const updatedAnnotations = [...annotations, newAnnotation];
    }
    //TODO Arrumar a função de "salvar" arquivo (tá "salvando" 1 anotação só)
    return (
        <div className='flex-col h-screen w-screen bg-gray-900 text-white'>
            <Header />
            <div className="flex justify-center my-8">
                <div id="video-controller" className="flex flex-col items-center w-[65%]">
                    <video ref={videoRef} id="my-video" controls src={`/videos/${id}/record.mp4`} className="w-[75%] h-auto rounded-lg shadow-lg mb-4" />
                    <div id="actions-container" className="flex space-x-8">
                        <div id="frame-button-container">
                            <div id="controller-container" className="flex flex-col items-center">
                                <FrameController text="Frame Inicial" index={initialFrame} leftOnClick={() => { handleLeftOnClick("initial") }} rightOnClick={() => { handleRightOnClick("initial") }} />
                                <FrameController text="Frame Atual" index={currentFrame} leftOnClick={() => { handleLeftOnClick("setInitial") }} rightOnClick={() => { handleRightOnClick("setEnd") }} />
                                <FrameController text="Frame Final" index={endFrame} leftOnClick={() => { handleLeftOnClick("end") }} rightOnClick={() => { handleRightOnClick("end") }} />
                            </div>
                            <div id="button-container" className='flex justify-center space-x-4 mt-4'>
                                <button onClick={() => _navigate('/')} className="bg-gray-700 hover:bg-gray-500 text-white rounded-lg px-6 py-2 text-xl">
                                    Voltar
                                </button>
                                <button onClick={handleSaveAnnotation} className="bg-green-600 hover:bg-green-800 text-white rounded-lg px-6 py-2 text-xl">
                                    Salvar
                                </button>
                            </div>
                        </div>
                        <div id="annotations-option-container" className="flex flex-col items-center mt-4">
                            <label htmlFor="annotation-options" className="mb-2">Selecione uma opção:</label>
                            <select 
                                id="annotation-options" 
                                className="bg-gray-700 text-white rounded-lg px-4 py-2"
                                value={selectedOption}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            >
                                {options.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <AnnotationContainer annotations={annotations} />
            </div>
        </div>
    );
}
