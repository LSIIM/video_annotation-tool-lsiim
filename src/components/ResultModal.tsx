import toast from 'react-hot-toast';
import Modal from 'react-modal';
import { AnnotationModel } from '@/models/models';
import ResultsContainer from './ResultsContainer';
import EventsContainer from './EventsContainer';

interface Props {
  isOpen: boolean;
  id: number;
  videoTypeId: number;
  onClose: () => void;
  annotation: AnnotationModel;
}

export default function ResultModal({ isOpen, id, onClose, annotation }: Props) {
  const apiPath = import.meta.env.VITE_API || 'http://localhost:5000';
  const urlPath = apiPath + `/v1/recording/${id}/annotation`;

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
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="flex-col justify-center items-center bg-slate-500 rounded-lg focus:outline-none w-3/4 h-3/4"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div id="containers" className="flex ml-4 h-4/5 justify-between">
        <ResultsContainer annotation={annotation} onRemove={() => {}} />
        <EventsContainer data={annotation.events} option="" onRemove={() => {}}/>
      </div>

      <div className='flex space-x-4 justify-end m-4'>
        <button onClick={onClose} className="bg-gray-400 rounded-[30px] hover:bg-gray-600 px-6 py-2 text-xl">Fechar</button>
        <button onClick={handleSaveAnnotation} className="bg-green-500/90 rounded-[30px] hover:bg-green-800 px-6 py-2 text-xl">Salvar</button>
      </div>
    </Modal>
  );
}
