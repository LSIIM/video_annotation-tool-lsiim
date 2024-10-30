import { useState, useEffect } from "react";
import { AnnotationModel, ResultModel, ResultOptionsModel } from "@/models/models";
import { Trash2 } from "lucide-react";

interface Props {
    annotation: AnnotationModel;
    onRemove: (index: number) => void;
}

export default function ResultsContainer({ annotation, onRemove }: Props) {
    const [results, setResults] = useState<ResultModel[]>(annotation.results || []);
    const [resultOptions, setResultOptions] = useState<ResultModel[]>([]);
    const [selectedResult, setSelectedResult] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [additionalOptions, setAdditionalOptions] = useState<ResultOptionsModel[]>([]);

    useEffect(() => {
        loadOptions();
        loadResults();
    }, []);

    async function loadResults() {
        setResults(annotation.results || []);
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

    function removeResult(index: number) {
        onRemove(index);
    }

    function handleAddResult() {
        const selected = resultOptions.find((option) => option.name === selectedResult);
        if (!selected) return;

        const newResult: ResultModel = {
            name: selectedResult,
            description: "",
            resultTypesOptions: selected.resultTypesOptions || []
        };
        
        setResults([...results, newResult]);
        setSelectedResult("");
        setSelectedOption(null);
        setAdditionalOptions([]);
    }

    function handleResultChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedName = event.target.value;
        setSelectedResult(selectedName);

        const selected = resultOptions.find((option) => option.name === selectedName);
        setAdditionalOptions(selected?.resultTypesOptions || []);
        setSelectedOption(null);
    }

    function handleOptionChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedOption(event.target.value);
    }

    return (
        <div className="flex flex-col mt-2 mr-2">
            <h2 className="text-xl font-bold mb-4">Conclusões</h2>
            <div className="flex mb-4 gap-4">
                <select
                    value={selectedResult}
                    onChange={handleResultChange}
                    className="bg-gray-700 text-white rounded-lg px-4 py-2"
                >
                    <option value="">Selecione um Resultado</option>
                    {resultOptions.map((option) => (
                        <option key={option.name} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </select>

                {additionalOptions.length > 0 && (
                    <select
                        value={selectedOption || ""}
                        onChange={handleOptionChange}
                        className="bg-gray-700 text-white rounded-lg px-4 py-2"
                    >
                        <option value="">Selecione uma Opção Adicional</option>
                        {additionalOptions.map((option) => (
                            <option key={option.name} value={option.name}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                )}

                <button onClick={handleAddResult} className="p-2 ml-2 bg-blue-500 text-white rounded-lg">
                    Adicionar Conclusão
                </button>
            </div>

            <div>
                {results && results.length > 0 && (
                    results.map((result, index) => (
                        <div key={index} className="mb-4 p-2 bg-gray-700 rounded-lg shadow-md flex justify-between mr-2">
                            <div>
                                <p className="font-semibold">Resultado: {result.name}</p>
                                {result.resultTypesOptions && result.resultTypesOptions.length > 0 && (
                                    <p>Opção Adicional: {result.resultTypesOptions.map(opt => opt.name).join(", ")}</p>
                                )}
                            </div>
                            <button onClick={() => removeResult(index)}>
                                <Trash2 />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
