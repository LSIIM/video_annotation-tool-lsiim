import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import FrameController from './FrameController';
// import Input from './Input';

interface Props {
  isOpen: boolean;
  url: string;
  onClose: () => void;
}

export default function CustomModal({ isOpen, url, onClose }: Props) {
  

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="flex justify-center items-center bg-slate-500 rounded-lg focus:outline-none" overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      
    </Modal>
  );
}