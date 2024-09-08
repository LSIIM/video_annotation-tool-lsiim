import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import FrameController from './FrameController';
// import Input from './Input';

interface Props {
  isOpen: boolean;
  option: boolean;
  url: string;
  onClose: () => void;
}

export default function CustomModal({ isOpen, option, url, onClose }: Props) {
  const [totalFrames, setTotalFrames] = useState(100);

  const [currentFrame, setCurrentFrame] = useState(1);
  const [initialFrame, setInitialFrame] = useState(1);
  const [endFrame, setEndFrame] = useState(1);

  function handleLeftOnClick(option: string){
    if(option=="initial"){
      let aux = initialFrame-5;
      if(aux<1) aux = 1;
      setInitialFrame(aux);
    }
    else if(option=="end"){
      let aux = endFrame-5;
      if(aux<1) aux = 1;
      if(aux<initialFrame) aux = initialFrame+1;
      setEndFrame(aux);
    }
  }

  function handleRightOnClick(option: string){
    if(option=="initial"){
      let aux = initialFrame+5;
      if(aux>totalFrames) aux = totalFrames;
      if(aux>endFrame) aux = endFrame;
      setInitialFrame(aux);
    }
    else if(option=="end"){
      let aux = endFrame+5;
      if(aux>totalFrames) aux = totalFrames;
      setEndFrame(aux);
    }
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="flex justify-center items-center bg-slate-500 rounded-lg focus:outline-none" overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div id="video-controller flex">
        <video id="my-video" controls src={url} className="w-96 h-96 object-cover rounded-l-lg" />
        <div className="flex flex-row">
          <div className="flex flex-col">
            <FrameController text="Frame Inicial" index={initialFrame} leftOnClick={()=>{handleLeftOnClick("initial")}} rightOnClick={()=>{handleRightOnClick("initial")}}/>
            <p>Frame Atual: {currentFrame}</p>
            <FrameController text="Frame Final" index={endFrame} leftOnClick={()=>{handleLeftOnClick("end")}} rightOnClick={()=>{handleRightOnClick("end")}}/>
          </div>
        </div>
      </div>
      <div className='flex'>
        <button onClick={onClose} className="bg-gray-200/50 rounded-[30px] h-10 hover:bg-gray-500 text-2xl">Fechar</button>
        <button onClick={()=>{}} className="bg-green-600/70 rounded-[30px] h-10 hover:bg-green-800 text-2xl">Salvar</button>
      </div>
    </Modal>
  );
}