import toast from 'react-hot-toast';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnnotationModel } from '@/models/models';
import EventContainer from './EventsContainer';
import ResultsContainer from './ResultsContainer';
import CommentContainer from './CommentContainer';

interface Props {
  isOpen: boolean;
  id: number;
  onClose: () => void;
}

export default function AnnotationModal({ isOpen, id, onClose }: Props) {
  const [annotation, setAnnotation] = useState<AnnotationModel>({events: [], results: [], recordingVideoId: 0});
  const _navigate = useNavigate();
  const apiPath = import.meta.env.VITE_API || 'http://localhost:5000';
  const urlPath = apiPath + `/v1/recording/${id}/annotation`;

  useEffect(() => {
    const loadAnnotations = async () => {
      try {
        const response = await fetch(urlPath);
        const data = await response.json();
        if (data.annotationVideos[0]?.events || data.annotationVideos[0]?.results) setAnnotation(data.annotationVideos[0]);
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
      <div id="video-controller" className="flex ml-2 my-2 h-[85%] justify-between gap-2">
        <div>
          <EventContainer data={annotation} onRemove={() => { }} mode="see"/>
          </div>
        <div>
          <ResultsContainer annotation={annotation} mode="see" />
        </div>
        <div>
          {annotation?.comment !== undefined && (<CommentContainer annotation={annotation} mode="see"/>)}
        </div>
      </div>
      <div className='flex gap-2 justify-end mb-3 mx-2'>
        <button onClick={onClose} className="bg-gray-400 rounded-[30px] hover:bg-gray-600 px-6 py-2 text-xl">Fechar</button>
        <button onClick={() => _navigate(`/annotate/${id}`)} className="bg-green-500/90 rounded-[30px] hover:bg-green-800 px-6 py-2 text-xl">Anotar</button>
      </div>
    </Modal>
  );
}
