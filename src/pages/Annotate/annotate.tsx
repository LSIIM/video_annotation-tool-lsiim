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
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalFrames, setTotalFrames] = useState(100);
    const [currentFrame, setCurrentFrame] = useState(1);
    const [initialFrame, setInitialFrame] = useState(1);
    const [endFrame, setEndFrame] = useState(1);
    const _navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const fps = 30;
    const options = ["Selecione uma opção", "Fixação", "Limitação", "Disparidade"];
    const [selectedOption, setSelectedOption] = useState(options[0]); // Estado para a opção selecionada

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            const handleLoadedMetadata = () => {
                const durationInSeconds = video.duration;
                const totalFrames = Math.floor(durationInSeconds * fps);
                setTotalFrames(totalFrames);
            };
            const updateFrame = () => {
                const currentTime = video.currentTime;
                const frame = Math.floor(currentTime * fps);
                setCurrentFrame(frame);
            };
            video.addEventListener('loadedmetadata', handleLoadedMetadata);
            video.addEventListener('timeupdate', updateFrame);
            return () => {
                video.removeEventListener('loadedmetadata', handleLoadedMetadata);
                video.removeEventListener('timeupdate', updateFrame);
            };
        }
    }, []);

    useEffect(() => {
        const loadAnnotations = async () => {
            try {
                const response = await fetch(`/videos/${id}/annotation.json`);
                if (!response.ok) throw new Error("Arquivo não encontrado.");
                const data = await response.json();
                setAnnotations(data.annotations || []);
            } catch (error) {
                setAnnotations([]);
                toast.error("Nenhuma anotação encontrada.");
            } finally {
                setLoading(false);
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
        else if (option == "setInitial") if (endFrame > currentFrame) setInitialFrame(currentFrame);
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
        else if (option == "setEnd") if (initialFrame < currentFrame) setEndFrame(currentFrame);
    }

    function handleAddAnnotation() {
        if (selectedOption === options[0]) {
            toast.error("Selecione uma opção válida.");
            return;
        }
        const newAnnotation: Annotation = {
            frames: [initialFrame, endFrame],
            description: selectedOption
        };

        setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
        toast.success("Anotação salva com sucesso!");

        // // Simulação de save (substituir pela lógica de API)
        // const updatedAnnotations = [...annotations, newAnnotation];
        // setAnnotations(updatedAnnotations);
    }

    function handleRemoveAnnotation(index: number) {
        const updatedAnnotations = annotations.filter((_, i) => i !== index);
        setAnnotations(updatedAnnotations);

        // Simulação de salvar a anotação removida (substituir com lógica de API)
        fetch(`/videos/${id}/save-annotation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ annotations: updatedAnnotations }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao salvar anotações.');
                }
                toast.success('Anotação removida com sucesso!');
            })
            .catch(() => toast.error('Erro ao remover anotação.'));
    }

    return (
        <div className='flex-col h-screen w-screen overflow-auto bg-gray-900 text-white'>
            <Header />
            <div className="flex justify-center my-8 w-full">
                <div id="video-controller" className="flex flex-col items-center w-[50%] h-auto">
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
                                <button onClick={handleAddAnnotation} className="bg-blue-600 hover:bg-green-800 text-white rounded-lg px-6 py-2 text-xl">
                                    Adicionar
                                </button>
                                <button onClick={() => { }} className="bg-green-600 hover:bg-green-800 text-white rounded-lg px-6 py-2 text-xl">
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
                <div className="w-[20%]">
                    {loading ? (
                        <p>Carregando anotações...</p>
                    ) : (
                        <AnnotationContainer annotations={annotations} option="edit" onRemove={handleRemoveAnnotation} />
                    )}
                </div>
            </div>
        </div>
    );
}
