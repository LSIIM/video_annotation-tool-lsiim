import toast from 'react-hot-toast';
import Modal from 'react-modal';
import { AnnotationModel, ResultModel } from '@/models/models';
import EventsContainer from './EventsContainer';
import { useEffect, useState } from 'react';

interface Props {
  isOpen: boolean;
  id: number;
  recordingVideoId: number;
  onClose: () => void;
  hadAnnotation: boolean;
  annotation: AnnotationModel;
}

export default function ResultModal({ isOpen, id, onClose, annotation, recordingVideoId, hadAnnotation }: Props) {
  const [results, setResults] = useState<ResultModel[]>(annotation.results || []);
  const [resultOptions, setResultOptions] = useState<ResultModel[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});

  const apiPath = import.meta.env.VITE_API || 'http://localhost:5000';
  const urlPath = `${apiPath}/v1/recording/${id}/annotation`;

  useEffect(() => {
    loadOptions();
    loadResults();
  }, []);

  async function loadResults() {
    setResults(annotation.results || []);
    console.log("Results loaded:", results);
    console.log("Annotation:", annotation);
    console.log("HadAnnotation:", hadAnnotation);
  }

  async function loadOptions() {
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
    const filledResults = resultOptions.map((result, index) => {
      const selectedOptionName = selectedOptions[index];
        const selectedOption = result.resultTypesOptions?.find(opt => opt.name === selectedOptionName);
  
      if (selectedOption) {
        return {
          resultTypeId: result.id,             
          resultTypeOptionId: selectedOption.id 
        };
      }
  
      return null;
    }).filter(result => result !== null);
    const finalEvents = annotation.events.map(event => {
      return {
        eventTypeId: event.eventTypeId,
        frames: event.frames
      }
    });
    // console.log("Filled results:", filledResults);
    let jsonBody = {};
    try {
      jsonBody = {
        "data": [{
          "recordingVideoId": recordingVideoId,
          "comment": "",
          "events": finalEvents,
          "results": filledResults
        }]
      }
      const response = await fetch(urlPath, {
        method: hadAnnotation?'PUT':'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonBody),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar anotação.');
      }
      toast.success('Anotação salva com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar anotação.');
      console.log(error);
    } finally {
      console.log("Essa é a anotação:", jsonBody);
    }
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      className="flex-col justify-center items-center bg-slate-500 rounded-lg focus:outline-none w-3/4 h-4/5"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div id="containers" className="flex m-2 h-[85%] justify-between">
        <div className="flex flex-col mt-2 mx-2">
          <h2 className="text-xl font-bold mb-4">Conclusões</h2>
          <div className="overflow-y-auto">
            {resultOptions.map((result, index) => (
              <div key={index} className="mb-4 p-2 bg-gray-700 rounded-lg shadow-md flex items-center justify-between mr-2 gap-8">
                <div className="flex items-center">
                  <p className="font-semibold">Resultado: {result.name}</p>
                </div>
                <div className="flex items-center">
                  {result.resultTypesOptions && result.resultTypesOptions.length > 0 ? (
                    <select
                      className="bg-gray-700 text-white rounded-lg px-4 py-2"
                      onChange={(e) => {
                        setSelectedOptions({ ...selectedOptions, [index]: e.target.value });
                      }}
                      value={selectedOptions[index] || 'Selecione uma opção'}
                    >
                      <option value="Selecione uma opção">Selecione uma opção</option>
                      {result.resultTypesOptions.map((opt) => (
                        <option key={opt.name} value={opt.name}>
                          {opt.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="number"
                      placeholder="Insira o valor"
                      value={results[index]?.scalar || ''}
                      onChange={(e) => {
                        const updatedResults = [...results];
                        updatedResults[index] = {
                          ...updatedResults[index],
                          scalar: parseFloat(e.target.value),
                        };
                        setResults(updatedResults);
                      }}
                      className="bg-gray-700 text-white rounded-lg px-4 py-2 w-36"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='w-1/3'>
          <EventsContainer data={annotation.events} option="edit" onRemove={() => { }} />
        </div>
      </div>

      <div className='flex space-x-4 justify-end m-4'>
        <button onClick={onClose} className="bg-gray-400 rounded-[30px] hover:bg-gray-600 px-6 py-2 text-xl">Fechar</button>
        <button onClick={handleSaveAnnotation} className="bg-green-500/90 rounded-[30px] hover:bg-green-800 px-6 py-2 text-xl">Salvar</button>
      </div>
    </Modal>
  );
}
