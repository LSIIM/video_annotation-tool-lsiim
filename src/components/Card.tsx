import { RecordingModel } from "@/models/models";

interface Props {
    fileInfo: RecordingModel;
    onVisualize: () => void;
    onAnnotate: () => void;
}

export default function Card({ fileInfo, onAnnotate, onVisualize }: Props) {
    const mainVideo = fileInfo.videos.find(video => video.isMain === true);
    const videoPath = mainVideo?.url
    console.log(videoPath);

    return (
        <section className='h-40 flex justify-between max-w-full rounded-xl bg-zinc-800'>
            <div className='w-40 overflow-hidden'>  
                <video controls className="w-full h-full object-cover rounded-l-lg">
                    <source src={videoPath} type="video/mp4" />
                </video>
            </div>
            <div className="flex flex-col justify-center gap-1 mx-2 max-w-36">
                <p><b>Video:</b><i> {fileInfo.id}</i></p>
                <p><b>Bebê:</b><i> {fileInfo.babyInfo.name}</i></p>
                <p><b>Atipicidade:</b><i> {fileInfo.babyInfo.atipicidade !== "sem alteração"? "detectada" :"sem alteração" }</i></p>
                <p><b>Data de Captura:</b><i> {new Date(fileInfo.createdAt).toLocaleDateString()}</i></p>
            </div>
            <div className='flex flex-col justify-evenly mr-3'>
                <button onClick={onVisualize} className='bg-indigo-500 hover:bg-indigo-700'>Ver Anotações</button>
                <button onClick={onAnnotate} className='bg-indigo-500 hover:bg-indigo-700'>Anotar</button>
            </div>
        </section>
    );
}


//6558f5 -> cor padrão, não era pra estar salvo aqui, mas vai ficar por ora