import { AnnotationModel, AtypicalityModel } from "@/models/models";
import { Trash2 } from "lucide-react";

interface Props<T> {
    annotations: T[];
    option: string;
    onRemove: (index: number) => void;
}

export default function AnnotationContainer<T extends AnnotationModel | AtypicalityModel>({ annotations, option, onRemove }: Props<T>) {
    const isAnnotation = isAnnotationModel(annotations[0]);
    const title = (isAnnotation) ? "Atipicidade" : "Anotações";
    const text = (isAnnotation) ? "atipicidades" : "anotações";

    if (!annotations || annotations.length === 0) {
        return (
            <div className="flex flex-col mt-2 mr-2">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <div className="overflow-y-auto max-h-96">
                    <p>Não há {text} registradas.</p>
                </div>
            </div>
        );
    }

    function removeAnnotation(index: number) {
        onRemove(index);
    }
    
    function isAnnotationModel(annotation: any): annotation is AnnotationModel {
        return (annotation as AnnotationModel).frames !== undefined;
    }


    return (
        <div className="flex flex-col mt-2 mr-2">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="overflow-y-auto max-h-96">
                {annotations.map((annotation, index) => (
                    <div key={index} className="mb-4 p-2 bg-gray-700 rounded-lg shadow-md flex justify-between mr-2">
                        <div>
                            {isAnnotationModel(annotation) ? (
                                <>
                                    <p className="font-semibold">{annotation.description}</p>
                                    {annotation.frames.length === 1 ? (
                                        <p>Evento pontual em {annotation.frames[0]}</p>
                                    ) : (
                                        <p>Frame inicial: {annotation.frames[0]} | Frame final: {annotation.frames[1]}</p>
                                    )}
                                </>
                            ) : (
                                <p className="font-semibold">Tipo de atipicidade: {annotation.atypicality_type}</p>
                            )}
                        </div>
                        {option === "edit" && (
                            <button onClick={() => removeAnnotation(index)}>
                                <Trash2 />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}