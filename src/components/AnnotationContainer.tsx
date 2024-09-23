import { Trash2 } from "lucide-react";

interface Annotation {
    frames: number[];
    description: string;
  }

interface Props {
    annotations: Annotation[];
    option: string;
    onRemove: (index: number) => void;
  }
//TODO FUNÇÃO DE DELETAR A ANOTAÇÃO 
export default function AnnotationContainer({ annotations, option, onRemove }: Props) {
    if(annotations == undefined){
        return(<p>Não há anotações registradas.</p>)
    }
    function removeAnnotation(index: number) {
        onRemove(index);
    };

    return (
        <div className="flex flex-col m-2">
            <h2 className="text-xl font-bold mb-4">Anotações</h2>
            <div className="overflow-y-auto max-h-96 md:max-h-48">
                {annotations.length > 0 ? (
                    annotations.map((annotation, index) => (
                        <div key={index} className="mb-4 p-2 bg-gray-700 rounded-lg shadow-md flex justify-between">
                            <div>
                                <p className="font-semibold">{annotation.description}</p>
                                {annotation.frames.length === 1 ? (
                                    <p>Evento pontual em {annotation.frames[0]}</p>
                                ) : (
                                    <p>Frame inicial: {annotation.frames[0]} | Frame final: {annotation.frames[1]}</p>
                                )}
                            </div>
                            {option=="edit" && (
                                <button onClick={() => removeAnnotation(index)}>
                                    <Trash2 />
                                </button>
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