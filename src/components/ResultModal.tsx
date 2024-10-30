import toast from 'react-hot-toast';
import Modal from 'react-modal';
import { AnnotationModel, ResultModel } from '@/models/models';
import EventsContainer from './EventsContainer';
import { useEffect, useState } from 'react';

interface Props {
  isOpen: boolean;
  id: number;
  videoTypeId: number;
  onClose: () => void;
  annotation: AnnotationModel;
}

export default function ResultModal({ isOpen, id, onClose, annotation }: Props) {
  const [results, setResults] = useState<ResultModel[]>(annotation.results || []);
  const [resultOptions, setResultOptions] = useState<ResultModel[]>([]);
  const [toggles, setToggles] = useState<boolean[]>([]);

  const apiPath = import.meta.env.VITE_API || 'http://localhost:5000';
  const urlPath = apiPath + `/v1/recording/${id}/annotation`;

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

  const handleSaveAnnotation = async () => {
    try {
      const response = await fetch(urlPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "data": [{
            "projectVideoTypeId": 1,
            "comment": "",
            "events": annotation.events,
            "results": annotation.results
          }]
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar anotação.');
      }
      toast.success('Anotação salva com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar anotação.');
      console.log(error);
    } finally {
      console.log("Essa é a anotação:", annotation);
    }
  }

  function toggleOption(index: number) {
    const updatedToggles = [...toggles];
    updatedToggles[index] = !updatedToggles[index];
    setToggles(updatedToggles);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="flex-col justify-center items-center bg-slate-500 rounded-lg focus:outline-none w-3/4 h-3/4"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div id="containers" className="flex ml-4 h-4/5 justify-between">
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
        <EventsContainer data={annotation.events} option="" onRemove={() => { }} />
      </div>

      <div className='flex space-x-4 justify-end m-4'>
        <button onClick={onClose} className="bg-gray-400 rounded-[30px] hover:bg-gray-600 px-6 py-2 text-xl">Fechar</button>
        <button onClick={handleSaveAnnotation} className="bg-green-500/90 rounded-[30px] hover:bg-green-800 px-6 py-2 text-xl">Salvar</button>
      </div>
    </Modal>
  );
}
