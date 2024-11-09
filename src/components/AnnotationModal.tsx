import toast from 'react-hot-toast';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnnotationModel } from '@/models/models';
import EventContainer from './EventsContainer';
import ResultsContainer from './ResultsContainer';

interface Props {
  isOpen: boolean;
  id: number;
  onClose: () => void;
}

export default function AnnotationModal({ isOpen, id, onClose }: Props) {
  const [annotations, setAnnotations] = useState<AnnotationModel>({events: [], results: [], recordingVideoId: 0});
  const _navigate = useNavigate();
  const apiPath = import.meta.env.VITE_API || 'http://localhost:5000';
  const urlPath = apiPath + `/v1/recording/${id}/annotation`;

  useEffect(() => {
    const loadAnnotations = async () => {
      try {
        const response = await fetch(urlPath);
        const data = await response.json();
        console.log("DATA", data);
        if (data.annotationVideos[0].events) setAnnotations(data.annotationVideos[0]);
      } catch (error) {
        console.log('Erro ao carregar as anotações:', error);
        toast.error('Erro ao carregar as anotações.');
      }
    };

    if (isOpen) {
      loadAnnotations();
    }
  }, [id, isOpen]);

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      className="flex-col justify-center items-center bg-slate-500 rounded-lg focus:outline-none"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div id="video-controller" className="flex ml-4 my-2">
        <ResultsContainer annotation={annotations} option="see"/>
        <EventContainer data={annotations} onRemove={() => { }} option="see"/>
      </div>

      <div className='flex space-x-4 justify-center mb-3 mx-2'>
        <button onClick={onClose} className="bg-gray-400 rounded-[30px] hover:bg-gray-600 px-6 py-2 text-xl">Fechar</button>
        <button onClick={() => _navigate(`/annotate/${id}`)} className="bg-green-500/90 rounded-[30px] hover:bg-green-800 px-6 py-2 text-xl">Anotar</button>
      </div>
    </Modal>
  );
}
