import { VideoInfoModel } from "@/models/videoInfoModel";

interface Props {
    fileInfo: VideoInfoModel;
    onVisualize: () => void;
    onAnnotate: () => void;
}

export default function Card({ fileInfo, onAnnotate, onVisualize }: Props) {
    return (
        <section className='h-40 flex justify-between max-w-full rounded-xl bg-zinc-800'>
            <div className='w-40 overflow-hidden'>
                <video controls src={fileInfo.videoUrl} className="w-full h-full object-cover rounded-l-lg" />
            </div>
            <div className="flex flex-col justify-center gap-1 mx-2 max-w-36">
                <p><b>Video:</b><i> {fileInfo.fileId}</i></p>
                <p><b>Bebê:</b><i> {fileInfo.babyName}</i></p>
                <p><b>Responsável:</b><i> {fileInfo.captureResponsible}</i></p>
                <p><b>Data de Captura:</b><i> {new Date(fileInfo.captureDate).toLocaleDateString()}</i></p>
            </div>
            <div className='flex flex-col justify-evenly mr-3'>
                <button onClick={onVisualize} className='bg-indigo-500 hover:bg-indigo-700'>Ver Anotações</button>
                <button onClick={onAnnotate} className='bg-indigo-500 hover:bg-indigo-700'>Anotar</button>
            </div>
        </section>
    );
}

//6558f5 -> cor padrão, não era pra estar salvo aqui, mas vai ficar por ora