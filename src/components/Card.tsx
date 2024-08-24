import { useEffect, useState } from 'react';
import { VideoInfoModel } from "@/models/VideoInfoModel";

interface Props {
    fileInfo: VideoInfoModel;
    onVisualize: () => void;
    onAnnotate: () => void;
}

export default function Card({ fileInfo, onAnnotate, onVisualize }: Props) {
    const [annotation, setAnnotation] = useState<string>("");

    useEffect(() => {
        async function fetchAnnotationJson() {
            if (fileInfo.annotationJson) {
                try {
                    const response = await import(`${fileInfo.annotationJson}`); //esse import não está funcionando, preciso arrumar isso
                    setAnnotation(JSON.stringify(response));
                } catch (error) {
                    console.error('Error loading the JSON file:', error);
                    setAnnotation("Erro ao carregar anotação");
                }
            }
        }
        fetchAnnotationJson();
    }, [fileInfo.annotationJson]);

    return (
        <section className='h-40 flex justify-between max-w-full rounded-xl bg-zinc-800'>
            <div className='w-40 overflow-hidden'>
                <video controls src={fileInfo.videoUrl} className="w-full h-full object-cover rounded-l-lg" />
            </div>
            <div className="flex flex-col justify-center gap-1 mx-2 max-w-36">
                <p><b>Arquivo:</b><i>{fileInfo.fileName}</i></p>
                <p><b>Bebê:</b><i> {fileInfo.babyName}</i></p>
                <p><b>Responsável:</b><i> {fileInfo.captureResponsible}</i></p>
                <p><b>Data de Captura:</b><i> {new Date(fileInfo.captureDate).toLocaleDateString()}</i></p>
            </div>
            <div className="flex flex-col pt-3">
                <p className="overflow-hidden">{annotation}</p>
            </div>
            <div className='flex flex-col justify-evenly mr-3'>
                <button onClick={onVisualize} className='bg-indigo-500 hover:bg-indigo-700'>Visualizar</button>
                <button onClick={onAnnotate} className='bg-indigo-500 hover:bg-indigo-700'>Anotar</button>
            </div>
        </section>
    );
}

//6558f5 -> cor padrão, não era pra estar salvo aqui, mas vai ficar por ora