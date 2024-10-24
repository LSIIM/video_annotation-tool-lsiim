import { AnnotationModel, AtypicalityModel } from "@/models/models";
import { Trash2 } from "lucide-react";

interface Props<T> {
    data: T[];
    option: string;
    onRemove: (index: number) => void;
    type?: string;
}

export default function T_Container<T extends AnnotationModel | AtypicalityModel>({ data, option, onRemove, type }: Props<T>) {
    const isAnnotation = data.length > 0 ? isAnnotationModel(data[0]) : type === "annotation";
    const title = isAnnotation ? "Anotações" : "Atipicidade";
    const text = isAnnotation ? "anotações" : "atipicidades";

    if (!data || data.length === 0) {
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
        if (annotation === undefined) {
            return false;
        }
        return (annotation as AnnotationModel).frames !== undefined;
    }

    return (
        <div className="flex flex-col mt-2 mr-2">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="overflow-y-auto max-h-96">
                {data.map((annotation, index) => (
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
