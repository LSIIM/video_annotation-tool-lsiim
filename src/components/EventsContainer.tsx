import { EventModel } from "@/models/models";
import { Trash2 } from "lucide-react";

interface Props {
    data: EventModel[];
    option: string;
    onRemove: (index: number) => void;
}

export default function EventContainer ({ data, option, onRemove }: Props) {
    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col mt-2 mr-2 max-w-[90%]">
                <h2 className="text-xl font-bold mb-4">Eventos</h2>
                <div className="overflow-y-auto max-h-96">
                    <p>Não há eventos registrados.</p>
                </div>
            </div>
        );
    }
    console.log("DATA AQUI: ", data);
    function removeEvent(index: number) {
        onRemove(index);
    }
    
    return (
        <div className="flex flex-col mt-2 mr-2">
            <h2 className="text-xl font-bold mb-4">Eventos</h2>
            <div className="overflow-y-auto max-h-96">
                {data.map((note, index) => (
                    <div key={index} className="mb-4 p-2 bg-gray-700 rounded-lg shadow-md flex justify-between mr-2">
                        <div>
                            <p className="font-semibold">{note.name}</p>
                            {note.frames.length === 1 ? (
                                <p>Evento pontual em {note.frames[0]}</p>
                            ) : (
                                <p>Frame inicial: {note.frames[0]} | Frame final: {note.frames[1]}</p>
                            )}
                        </div>
                        {option === "edit" && (
                            <button onClick={() => removeEvent(index)}>
                                <Trash2 />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
