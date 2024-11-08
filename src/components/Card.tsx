import { RecordingModel } from "@/models/RecordingModel";

interface Props {
    fileInfo: RecordingModel;
    onVisualize: () => void;
    onAnnotate: () => void;
}

export default function Card({ fileInfo, onAnnotate, onVisualize }: Props) {
    const mainVideo = fileInfo.recordingsVideos.find(video => video.projectVideoType.isMain);
    const thumbnail = mainVideo?.thumb
    console.log(thumbnail);

    return (
        <section className='h-40 flex justify-between max-w-full rounded-xl bg-zinc-800'>
            <div className='w-40 overflow-hidden'>  
                <img src={thumbnail} className="w-full h-full object-cover rounded-l-lg"/>
            </div>
            <div className="flex flex-col justify-center gap-1 mx-2 max-w-36">
                <p><b>Video:</b><i> {fileInfo.id}</i></p>
                <p><b>Bebê:</b><i> {fileInfo.patient.name}</i></p>
                <p><b>Evento:</b><i> {fileInfo.patient.atipicidades !== "sem alteração"? "atipicidade detectada" :"sem alteração" }</i></p>
                <p><b>Data de Captura:</b><i> {new Date(fileInfo.createdAt).toLocaleDateString()}</i></p>
            </div>
            <div className='flex flex-col justify-evenly mr-3'>
                <button onClick={onVisualize} className='bg-indigo-500 hover:bg-indigo-700'>Ver Eventos</button>
                <button onClick={onAnnotate} className='bg-indigo-500 hover:bg-indigo-700'>Anotar</button>
            </div>
        </section>
    );
}


//6558f5 -> cor padrão, não era pra estar salvo aqui, mas vai ficar por ora