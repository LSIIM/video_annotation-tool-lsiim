interface Props{
    title: string;
    annotations: string;
    videoUrl: string;
    onVisualize: () => void;
    onAnnotate: () => void;
}

export default function Card({ title, annotations, videoUrl, onAnnotate, onVisualize }: Props) {

    return (
        <section className='h-40 mx-20 my-10 flex justify-between max-w-full rounded-xl bg-zinc-800'>
            <div className='w-40 overflow-hidden'>
                <video src={videoUrl} className="w-full h-full object-cover rounded-l-lg" controls />    
            </div>
            <div className='flex flex-col justify-evenly'>
                <p className='font-bold text-xl'>{title}</p>
                <p className='italic'>{annotations}</p>
                <div/>
            </div>
            <div className='flex flex-col justify-evenly mr-10'>
                <button onClick={onVisualize} className='bg-indigo-500 hover:bg-indigo-700'>Visualizar</button>
                <button onClick={onAnnotate} className='bg-indigo-500 hover:bg-indigo-700'>Anotar</button>
            </div>
        </section>
    );
}

//6558f5 