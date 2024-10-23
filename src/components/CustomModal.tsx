import toast from 'react-hot-toast';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AnnotationContainer from './AnnotationContainer';
import { AnnotationModel } from '@/models/models';

interface Props {
  isOpen: boolean;
  id: number;
  onClose: () => void;
  page?: string;
}

export default function CustomModal({ isOpen, id, onClose }: Props) {
  const [annotations, setAnnotations] = useState<AnnotationModel[]>([]);
  const _navigate = useNavigate();
  const urlPath = `http://172.29.207.16:5001/v1/recording/${id}/annotation`;

  useEffect(() => {
    const loadAnnotations = async () => {
      try {
        const response = await fetch(urlPath);
        const data = await response.json();
        setAnnotations(data.annotations);
      } catch (error) {
        toast.error('Erro ao carregar as anotações.');
      }
    };

    if (isOpen) {
      loadAnnotations();
    }
  }, [id, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="flex-col justify-center items-center bg-slate-500 rounded-lg focus:outline-none"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div id="video-controller" className="flex ml-4">
        <AnnotationContainer annotations={annotations} onRemove={() => { }} option="see" />
      </div>

      <div className='flex space-x-4 justify-center mb-4'>
        <button onClick={onClose} className="bg-gray-400 rounded-[30px] hover:bg-gray-600 px-6 py-2 text-xl">Fechar</button>
        <button onClick={() => _navigate(`/annotate/${id}`)} className="bg-green-500/90 rounded-[30px] hover:bg-green-800 px-6 py-2 text-xl">Anotar</button>
      </div>
    </Modal>
  );
}
