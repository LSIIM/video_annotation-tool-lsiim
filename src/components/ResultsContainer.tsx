import { useState, useEffect } from "react";
import { AnnotationModel, ResultModel } from "@/models/models";
// import { Trash2 } from "lucide-react";

interface Props {
    annotation: AnnotationModel;
    // onRemove: (index: number) => void;
}

export default function ResultsContainer({ annotation }: Props) {
    const [results, setResults] = useState<ResultModel[]>(annotation.results || []);
    const [resultOptions, setResultOptions] = useState<ResultModel[]>([]);
    const [toggles, setToggles] = useState<boolean[]>([]);
    // const [selectedResult, setSelectedResult] = useState<string>("");
    // const [selectedOption, setSelectedOption] = useState<string | null>(null);
    // const [additionalOptions, setAdditionalOptions] = useState<ResultOptionsModel[]>([]);

    useEffect(() => {
        loadOptions();
        loadResults();
    }, []);

    async function loadResults() {
        setResults(annotation.results || []);
        console.log("Results loaded:", results);
    }

    async function loadOptions() {
        const apiPath = import.meta.env.VITE_API || 'http://localhost:5000';
        const urlPath = `${apiPath}/v1/result-type`;

        try {
            const response = await fetch(urlPath);
            const options: ResultModel[] = await response.json();
            setResultOptions(options);
        } catch (error) {
            console.error("Erro ao carregar as opções:", error);
            setResultOptions([]);
        }
    }

    // function removeResult(index: number) {
    //     onRemove(index);
    //     const updatedToggles = [...toggles];
    //     updatedToggles.splice(index, 1);
    //     setToggles(updatedToggles);
    // }

    // function handleAddResult() {
    //     const selected = resultOptions.find((option) => option.name === selectedResult);
    //     if (!selected) return;

    //     const newResult: ResultModel = {
    //         name: selectedResult,
    //         description: "",
    //         resultTypesOptions: selected.resultTypesOptions || []
    //     };

    //     setResults([...results, newResult]);
    //     setSelectedResult("");
    //     setSelectedOption(null);
    //     setAdditionalOptions([]);
    //     setToggles([...toggles, false]); // Adiciona um toggle desativado para o novo resultado
    // }

    // function handleResultChange(event: React.ChangeEvent<HTMLSelectElement>) {
    //     const selectedName = event.target.value;
    //     setSelectedResult(selectedName);

    //     const selected = resultOptions.find((option) => option.name === selectedName);
    //     setAdditionalOptions(selected?.resultTypesOptions || []);
    //     setSelectedOption(null);
    // }

    // function handleOptionChange(event: React.ChangeEvent<HTMLSelectElement>) {
    //     setSelectedOption(event.target.value);
    // }

    function toggleOption(index: number) {
        const updatedToggles = [...toggles];
        updatedToggles[index] = !updatedToggles[index];
        setToggles(updatedToggles);
    }

    return (
        <div className="flex flex-col mt-2 mr-2">
            <h2 className="text-xl font-bold mb-4">Conclusões</h2>
            <div className="overflow-y-auto">
                {resultOptions.map((result, index) => (
                    <div key={index} className="mb-4 p-2 bg-gray-700 rounded-lg shadow-md flex items-center justify-between mr-2 gap-8">
                        <div className="flex items-center">
                            <p className="font-semibold">Resultado: {result.name}</p>
                        </div>
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
                    </div>
                ))}
            </div>
        </div>
    );
}
