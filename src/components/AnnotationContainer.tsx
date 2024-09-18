interface Annotation {
    frames: number[];
    description: string;
  }

interface Props {
    annotations: Annotation[];
  }

export default function AnnotationContainer({annotations}: Props) {
    return (
        <div className="flex flex-col m-2">
            <h2 className="text-xl font-bold mb-4">Anotações</h2>
            <div className="overflow-y-auto max-h-60">
                {annotations.length > 0 ? (
                    annotations.map((annotation, index) => (
                        <div key={index} className="mb-4 p-2 bg-gray-700 rounded-lg shadow-md">
                            <p className="font-semibold">{annotation.description}</p>
                            {annotation.frames.length === 1 ? (
                                <p>Evento pontual em {annotation.frames[0]}</p>
                            ) : (
                                <p>Frame inicial: {annotation.frames[0]} | Frame final: {annotation.frames[1]}</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Não há anotações registradas.</p>
                )}
            </div>
        </div>
    );
}