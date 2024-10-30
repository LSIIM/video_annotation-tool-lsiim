import EventsContainer from "@/components/EventsContainer";
import FrameController from "@/components/FrameController";
import Header from "@/components/Header";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast';
import { AnnotationModel, EventModel, OptionsModel } from "@/models/models";
import { useSearchParams } from "react-router-dom";
import ResultModal from "@/components/ResultModal";

export default function Annotate() {
    const [annotation, setAnnotation] = useState<AnnotationModel>({ events: [], results: [] });
    const [loading, setLoading] = useState(true);
    const [totalFrames, setTotalFrames] = useState(100);
    const [currentFrame, setCurrentFrame] = useState(1);
    const [initialFrame, setInitialFrame] = useState(1);
    const [endFrame, setEndFrame] = useState(1);
    const [selectedFlag, setSelectedFlag] = useState<string>("continuous");
    const [videoPath, setVideoPath] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState("Selecione uma opção");
    const [readAtipycalityModal, setReadAtypecityModal] = useState<boolean>(false);
    const [options, setOptions] = useState<OptionsModel[]>([]);

    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const videoTypeId = searchParams.get("video_type_id");
    const apiPath = import.meta.env.VITE_API || 'http://localhost:5000';
    const annotationUrlPath = apiPath + `/v1/recording/${id}/annotation`;
    const _navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoRefInicial = useRef<HTMLVideoElement>(null);
    const videoRefFinal = useRef<HTMLVideoElement>(null);
    const fps = 30;

    function handleOptionChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedNome = e.target.value;
        setSelectedOption(selectedNome);

        const selectedObject = options.find(option => option.name === selectedNome);
        if (selectedObject && selectedObject) setSelectedFlag(selectedObject.isTemporal ? 'continuous' : 'pontual');
        else setSelectedFlag('continuous');
    }

    const fetchVideo = async () => {
        try {
            const apiPath = import.meta.env.VITE_API || 'http://localhost:5000';
            const response = await fetch(`${apiPath}/v1/recording/${id}`);
            if (!response.ok) throw new Error("Erro ao buscar dados do vídeo");

            const data = await response.json();
            const video = data.videos.find((v: { url: string }) => v.url.includes(`${videoTypeId}.mp4`));
            if (video) {
                setVideoPath(video.url);
            } else {
                throw new Error("Vídeo não encontrado.");
            }
        } catch (error) {
            toast.error("Erro ao carregar o vídeo.");
        }
    };

    const loadAnnotation = async () => {
        try {
            const response = await fetch(annotationUrlPath);
            if (!response.ok) throw new Error("Arquivo não encontrado.");
            const data: AnnotationModel = await response.json();
            setAnnotation(data);//data.annotations || []);
        } catch (error) {
            setAnnotation({ events: [], results: [] });
            toast.error("Nenhuma anotação encontrada.");
        }
    };

    const loadOptions = async () => {
        try {
            const response = await fetch(`${apiPath}/v1/event-type`);
            if (!response.ok) throw new Error("Erro ao buscar opções de anotação.");
            const data = await response.json();
            const opt: OptionsModel[] = [{ name: "Selecione uma opção", description: "placeholder", isTemporal: true }];
            for (const option in data) { opt.push(data[option]) }
            setOptions(opt);
        } catch (error) {
            setOptions([]);
            toast.error("Nenhuma opção encontrada.");
        }
    }

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
    }, [selectedFlag]);

    useEffect(() => {
        const video = videoRefInicial.current;
        if (video) {
            const timeInSeconds = initialFrame / 30;
            video.currentTime = timeInSeconds;
        }
    }, [initialFrame]);

    useEffect(() => {
        const video = videoRefFinal.current;
        if (video) {
            const timeInSeconds = endFrame / 30;
            video.currentTime = timeInSeconds;
        }
    }, [endFrame]);

    useEffect(() => {
        loadAnnotation();
        loadOptions();
        fetchVideo();
        setLoading(false);
    }, [id, videoTypeId]);

    function handleLeftOnClick(option: string) {
        if (option == "initial") {
            let aux = initialFrame - 1;
            if (aux < 1) aux = 1;
            setInitialFrame(aux);
        }
        else if (option == "end") {
            let aux = endFrame - 1;
            if (aux < 1) aux = 1;
            setEndFrame(aux);
        }
        else if (option == "setInitial") {
            setInitialFrame(currentFrame);
            // if (endFrame < currentFrame) setEndFrame(currentFrame);
        }
    }

    function handleRightOnClick(option: string) {
        if (option == "initial") {
            const aux = initialFrame + 1;
            // if (aux > endFrame) aux = endFrame;
            setInitialFrame(aux);
        }
        else if (option == "end") {
            let aux = endFrame + 1;
            if (aux > totalFrames) aux = totalFrames;
            setEndFrame(aux);
        }
        else if (option == "setEnd") {
            setEndFrame(currentFrame);
            // if (initialFrame > currentFrame) setInitialFrame(currentFrame);
        }
    }

    function handleAddEvent() {
        if (selectedOption === options[0].name) {
            toast.error("Selecione uma opção válida.");
            return;
        }
        if (initialFrame > endFrame) {
            toast.error("Selecione um intervalo válido.");
            return;
        }
        if (initialFrame === endFrame && selectedFlag === 'continuous') {
            toast.error("A opção selecionada não é condizente com o intervalo selecionado.");
            return;
        }
        let frames = []
        if (selectedFlag === 'pontual') frames = [currentFrame];
        else frames = [initialFrame, endFrame];
        const newEvent: EventModel = {
            fk_id_event_type: 1,
            frames: frames,
        };
        annotation.events ? annotation.events.push(newEvent) : annotation.events = [newEvent];
        setAnnotation({ events: annotation.events, results: annotation.results });
        toast.success("Anotação adicionada com sucesso!");
    }

    function handleRemoveEvent(index: number) {
        const updatedAnnotations = annotation.events.filter((_, i) => i !== index);
        setAnnotation({ ...annotation, events: updatedAnnotations });

        // // Simulação de salvar a anotação removida (substituir com lógica de API)
        // fetch(`/videos/${id}/save-annotation`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ annotations: updatedAnnotations }),
        // })
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Erro ao salvar anotações.');
        //         }
        //         toast.success('Anotação removida com sucesso!');
        //     })
        //     .catch(() => toast.error('Erro ao remover anotação.'));
    }

    return (
        <div className='flex-col h-screen w-screen overflow-auto bg-gray-900 text-white'>
            <Header />
            <div className="flex justify-center my-4 w-full h-[85%]">
                <div className="flex-col justify-center w-[70%]">
                    {selectedFlag === 'continuous' ? (
                        <>
                            <div id="videos-container" className="flex justify-evenly items-end">
                                <div className="w-[25%] flex-col flex justify-center">
                                    <video ref={videoRefInicial} src={videoPath ? videoPath : ""} className="w-full rounded-lg shadow-lg mb-4" />
                                    <FrameController showButton text="Frame Inicial" index={[initialFrame, totalFrames]} leftOnClick={() => { handleLeftOnClick("initial") }} rightOnClick={() => { handleRightOnClick("initial") }} />
                                </div>
                                <div className="w-[40%] flex-col flex items-center">
                                    <video ref={videoRef} id="my-video" controls src={videoPath ? videoPath : ""} className="h-auto rounded-lg shadow-lg mb-4" />
                                    <FrameController showButton text="Frame Atual" index={[currentFrame, totalFrames]} leftOnClick={() => { handleLeftOnClick("setInitial") }} rightOnClick={() => { handleRightOnClick("setEnd") }} />
                                </div>
                                <div className="w-[25%] flex-col flex justify-center">
                                    <video ref={videoRefFinal} src={videoPath ? videoPath : ""} className="w-full rounded-lg shadow-lg mb-4" />
                                    <FrameController showButton text="Frame Final" index={[endFrame, totalFrames]} leftOnClick={() => { handleLeftOnClick("end") }} rightOnClick={() => { handleRightOnClick("end") }} />
                                </div>
                            </div>
                            <div id="actions-container" className="flex space-x-8 justify-center ">
                                <div id="frame-button-container">
                                    <div className="flex justify-center">
                                        <div id="annotations-option-container" className="flex flex-col items-center mt-4">
                                            <label htmlFor="annotation-options" className="mb-2">Selecione uma opção:</label>
                                            <select id="annotation-options" className="bg-gray-700 text-white rounded-lg px-4 py-2" value={selectedOption} onChange={handleOptionChange}>
                                                {options.map((option, index) => (
                                                    <option key={index} value={option.name}>{option.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div id="button-container" className='flex justify-center space-x-4 mt-4'>
                                        <button onClick={() => _navigate('/')} className="bg-gray-700 hover:bg-gray-500 text-white rounded-lg px-6 py-2 text-md">
                                            Voltar
                                        </button>
                                        <button onClick={handleAddEvent} className="bg-blue-600 hover:bg-green-800 text-white rounded-lg px-6 py-2 text-md">
                                            Adicionar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div id="video-controller" className="flex flex-col items-center">
                            <video ref={videoRef} id="my-video" controls src={`/videos/${id}/record.mp4`} className="w-[40%] h-auto rounded-lg shadow-lg mb-4" />
                            <div id="actions-container" className="flex space-x-8">
                                <div id="frame-button-container">
                                    <div className="flex-col">
                                        <div id="controller-container" className="flex flex-col items-center">
                                            <FrameController text="Frame Atual" index={[currentFrame, totalFrames]} showButton={false} />
                                        </div>
                                        <div id="annotations-option-container" className="flex flex-col items-center mt-4">
                                            <label htmlFor="annotation-options" className="mb-2">Selecione uma opção:</label>
                                            <select id="annotation-options" className="bg-gray-700 text-white rounded-lg px-4 py-2" value={selectedOption} onChange={handleOptionChange}>
                                                {options.map((option, index) => (
                                                    <option key={index} value={option.name}>{option.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div id="button-container" className='flex justify-center space-x-4 mt-4'>
                                        <button onClick={() => _navigate('/')} className="bg-gray-700 hover:bg-gray-500 text-white rounded-lg px-6 py-2 text-md">
                                            Voltar
                                        </button>
                                        <button onClick={handleAddEvent} className="bg-blue-600 hover:bg-green-800 text-white rounded-lg px-6 py-2 text-md">
                                            Adicionar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-[25%]">
                    {loading ? (
                        <p>Carregando anotações...</p>
                    ) : (
                        <div className="flex flex-col justify-between h-full">
                            <div className="flex-grow">
                                <EventsContainer data={annotation.events} option="edit" onRemove={handleRemoveEvent}/>
                            </div>
                            <div className="flex justify-between items-end">
                                <div />
                                <button onClick={() => { setReadAtypecityModal(true) }} className="bg-green-600 hover:bg-green-800 text-white rounded-lg px-6 py-2 text-md mr-4">
                                    Anotar Conclusões
                                </button>
                                {readAtipycalityModal && (
                                    <div><ResultModal id={Number(id)} videoTypeId={Number(videoTypeId)} isOpen={true} annotation={annotation} onClose={() => setReadAtypecityModal(false)} /></div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}