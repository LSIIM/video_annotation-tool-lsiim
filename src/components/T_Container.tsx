import { AnnotationModel, ResultModel } from "@/models/models";
import { Trash2 } from "lucide-react";

interface Props<T> {
    data: T[];
    option: string;
    onRemove: (index: number) => void;
    type: string;
}

export default function T_Container<T extends AnnotationModel | ResultModel>({ data, option, onRemove, type }: Props<T>) {
    const isAnnotation = data && data.length > 0 ? isAnnotationModel(data[0]) : isAnnotationModel(undefined);
    const title = isAnnotation ? "Anotações" : "Conclusões";	
    const text = isAnnotation ? "anotações" : "conclusões";

//TODO Puxar opções do banco
    const annotationsOptions = [
        { nome: "Encontrou estímulo periférico"},
        { nome: "Fixação" },
        { nome: "Rastreamento" },
    ];
    const resultOptions = [
        { nome: "Atípico" },
        { nome: "Normal"},
    ];

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
            if (type === "annotation") return true;
            return false;
        }
        console.log(annotation);
        return (annotation as AnnotationModel).frames !== undefined;
    }

    return (
        <div className="flex flex-col mt-2 mr-2">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="overflow-y-auto max-h-96">
                {data.map((note, index) => (
                    <div key={index} className="mb-4 p-2 bg-gray-700 rounded-lg shadow-md flex justify-between mr-2">
                        <div>
                            {isAnnotationModel(note) ? (
                                <>
                                    <p className="font-semibold">{annotationsOptions[note.fk_id_event_type].nome}</p>
                                    {note.frames.length === 1 ? (
                                        <p>Evento pontual em {note.frames[0]}</p>
                                    ) : (
                                        <p>Frame inicial: {note.frames[0]} | Frame final: {note.frames[1]}</p>
                                    )}
                                </>
                            ) : (
                                <p className="font-semibold">Tipo de Con: {resultOptions[note.fk_id_result_type].nome}</p>
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
