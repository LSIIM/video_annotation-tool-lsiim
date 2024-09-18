import toast from 'react-hot-toast';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AnnotationContainer from './AnnotationContainer';

interface Annotation {
  frames: number[];
  description: string;
}

interface Props {
  isOpen: boolean;
  id: number;
  onClose: () => void;
}

export default function CustomModal({ isOpen, id, onClose }: Props) {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const _navigate = useNavigate();

  // Carregar o arquivo JSON com base no id
  useEffect(() => {
    const loadAnnotations = async () => {
      try {
        const response = await fetch(`/videos/${id}/annotation.json`);
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

  console.log(annotations);
  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onClose} 
      className="flex justify-center items-center bg-slate-500 rounded-lg focus:outline-none" 
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div id="video-controller" className="flex">
        <AnnotationContainer annotations={annotations}/>
      </div>

      <div className='flex space-x-4 mt-4 mr-2'>
        <button onClick={onClose} className="bg-gray-400 rounded-[30px] hover:bg-gray-600 px-6 py-2 text-xl">Fechar</button>
        <button onClick={() => _navigate(`/annotate/${id}`)} className="bg-green-500/90 rounded-[30px] hover:bg-green-800 px-6 py-2 text-xl">Anotar</button>
      </div>
    </Modal>
  );
}
