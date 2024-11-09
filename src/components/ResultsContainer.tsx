import { useState, useEffect } from "react";
import { AnnotationModel, ResultModelTemplate } from "@/models/models";

interface Props {
    annotation: AnnotationModel;
    option: string
}

export default function ResultsContainer({ annotation, option }: Props) {
    const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});
    const [toggles, setToggles] = useState<boolean[]>([]);
    const [resultOptions, setResultOptions] = useState<ResultModelTemplate[]>([]);

    useEffect(() => {
        loadOptions();
    }, [annotation]);

    useEffect(() => {
        loadResults();
        console.log(selectedOptions);
    }, [resultOptions]);

    async function loadResults() {
        if (resultOptions.length == 0) return;
        for (const result of annotation.results || []) {
            const resultTypeIndex = resultOptions.findIndex((option) => option.id === result.resultTypeId);
            const resultTypeOptionSelected = resultOptions[resultTypeIndex].resultTypesOptions?.find((option) => option.id === result.resultTypeOptionId);
            setSelectedOptions({ ...selectedOptions, [resultTypeIndex]: resultTypeOptionSelected?.name || '' });
        }
    }
    async function loadOptions() {
        const apiPath = import.meta.env.VITE_API || 'http://localhost:5000';
        const urlPath = `${apiPath}/v1/result-type`;
        try {
            const response = await fetch(urlPath);
            const options: ResultModelTemplate[] = await response.json();
            setResultOptions(options);
        } catch (error) {
            console.error("Erro ao carregar as opções:", error);
            setResultOptions([]);
        }
    }

    function toggleOption(index: number) {
        const updatedToggles = [...toggles];
        updatedToggles[index] = !updatedToggles[index];
        setToggles(updatedToggles);
    }

    return (
        <div className="flex flex-col mt-2 mr-2">
            {annotation.results && annotation.results.length > 0 ? (
                <>
                    <h2 className="text-xl font-bold mb-4">Conclusões</h2>
                    <div className="overflow-y-auto">
                        {resultOptions.map((result, index) => (
                            selectedOptions[index] && (
                            <div key={index} className="mb-4 p-2 bg-gray-700 rounded-lg shadow-md flex items-center justify-between mr-2 gap-8">
                                    <div className="flex-col items-center">
                                        <p className="font-semibold">{result.name}:</p>
                                        <p className="italic">{selectedOptions[index]}</p>
                                    </div>
                                {option === "edit" && (
                                    <div className="flex items-center">
                                        {result.resultTypesOptions && result.resultTypesOptions.length > 0 ? (
                                            <select className="bg-gray-700 text-white rounded-lg px-4 py-2">
                                                <option value="">Selecione uma opção</option>
                                                {result.resultTypesOptions.map((opt) => (
                                                    <option key={opt.name} value={opt.name}>
                                                        {opt.name}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <button onClick={() => toggleOption(index)} className={`px-4 py-2 rounded-lg ${toggles[index] ? 'bg-green-500' : 'bg-slate-800'} w-36`}>
                                                {toggles[index] ? 'Detectado' : 'Não detectado'}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )))}
                    </div>
                </>
            ):(
                <p className="text-lg font-semibold">Sem conclusões</p>
            )}
        </div>
    );
}
