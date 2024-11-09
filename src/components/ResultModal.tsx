import toast from 'react-hot-toast';
import Modal from 'react-modal';
import { AnnotationModel, ResultModelTemplate } from '@/models/models';
import EventsContainer from './EventsContainer';
import { useEffect, useState } from 'react';
import ResultsContainer from './ResultsContainer';
import CommentContainer from './CommentContainer';

interface Props {
  isOpen: boolean;
  id: number;
  recordingVideoId: number;
  onClose: () => void;
  annotation: AnnotationModel;
}

export default function ResultModal({ isOpen, id, onClose, annotation, recordingVideoId }: Props) {
  const [resultOptions, setResultOptions] = useState<ResultModelTemplate[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});

  const apiPath = import.meta.env.VITE_API || 'http://localhost:5000';
  const urlPath = `${apiPath}/v1/recording/${id}/annotation`;
  const size = ["w-1/4", "w-2/5", "w-1/3"];

  useEffect(() => {
    loadOptions();
  }, []);

  useEffect(() => {
    loadResults();
  }, [resultOptions]);

  async function loadResults() {
    if(resultOptions.length == 0) return;
    for (const result of annotation.results || []) {
      const resultTypeIndex = resultOptions.findIndex((option) => option.id === result.resultTypeId);
      const resultTypeOptionSelected = resultOptions[resultTypeIndex].resultTypesOptions?.find((option) => option.id === result.resultTypeOptionId);
      setSelectedOptions({ ...selectedOptions, [resultTypeIndex]: resultTypeOptionSelected?.name || '' });
    }
  }

  async function loadOptions() {
    const urlPath = `${apiPath}/v1/result-type`;
    try {
      const response = await fetch(urlPath);
      const options: ResultModelTemplate[] = await response.json();
      await setResultOptions(options);
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
        method: 'POST',
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
        <div className={`${size[0]}`}>
          <EventsContainer data={annotation} mode="" onRemove={() => { }} />
        </div>
        <div className={`${size[1]}`}>
          <ResultsContainer annotation={annotation} mode="edit" />
        </div>
        <div className={`${size[2]}`}>
          <CommentContainer annotation={annotation} mode="edit" />
        </div>
      </div>
      <div className='flex space-x-4 justify-end m-4'>
        <button onClick={onClose} className="bg-gray-400 rounded-[30px] hover:bg-gray-600 px-6 py-2 text-xl">Fechar</button>
        <button onClick={handleSaveAnnotation} className="bg-green-500/90 rounded-[30px] hover:bg-green-800 px-6 py-2 text-xl">Salvar</button>
      </div>
    </Modal>
  );
}
