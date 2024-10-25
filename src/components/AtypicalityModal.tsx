import toast from 'react-hot-toast';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import T_Container from './T_Container';
import { ResultModel } from '@/models/models';

interface Props {
  isOpen: boolean;
  id: number;
  videoTypeId: number;
  onSave: () => void;
  onClose: () => void;
}

export default function AtypicalityModal({ isOpen, id, onSave, onClose, videoTypeId }: Props) {
  const [atypicalities, setAtypicalites] = useState<ResultModel[]>([]);
  const apiPath = import.meta.env.VITE_API || 'http://localhost:5000';
  const urlPath = apiPath + `/v1/recording/${id}/annotation`;
  // console.log("URLPATH", urlPath);

  useEffect(() => {
    const loadAtypicalities = async () => {
      setAtypicalites([]);
      return;
      try {
        const response = await fetch(urlPath);
        const data = await response.json();
        setAtypicalites(data.annotations);
      } catch (error) {
        toast.error('Erro ao carregar as anotações.');
        setAtypicalites([]);
      }
    };

    if (isOpen) {
      loadAtypicalities();
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
        <T_Container data={atypicalities} onRemove={() => { }} option="see" type="atypicality" />
      </div>

      <div className='flex space-x-4 justify-center mb-4'>
        <button onClick={onClose} className="bg-gray-400 rounded-[30px] hover:bg-gray-600 px-6 py-2 text-xl">Fechar</button>
        <button onClick={onSave} className="bg-green-500/90 rounded-[30px] hover:bg-green-800 px-6 py-2 text-xl">Salvar</button>
      </div>
    </Modal>
  );
}
