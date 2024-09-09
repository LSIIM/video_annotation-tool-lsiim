import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../../global.css';
import { useAuth } from '@/hooks/UseAuth';
import Card from '@/components/Card';
import CustomModal from '@/components/CustomModal';
import files from '@/lsiim/files.json';
import Header from '../../components/Header';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const _navigate = useNavigate();
  const [readAnnotationModal, setReadAnnotationModal] = useState<{ [key: number]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15); // Valor inicial de 15 itens por página

  const openModal = (videoId: number) => {
    setReadAnnotationModal(prevState => ({ ...prevState, [videoId]: true }));
  };
  const closeModal = (videoId: number) => {
    setReadAnnotationModal(prevState => ({ ...prevState, [videoId]: false }));
  };

  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to='/login' />;

  // Calcular os índices de início e fim com base na página atual e itens por página
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFiles = files.slice(startIndex, endIndex);

  // Funções para mudar de página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(files.length / itemsPerPage);

  return (
    <div className='flex-col h-screen w-screen overflow-x-hidden'>
      <Header />
      <div className='flex justify-center'>
        <SearchBar onClick={() => console.log('search')} />
      </div>
      {/* Grid paginado */}
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(475px,_1fr))] gap-4 m-10">
        {paginatedFiles.map((file, i) => (
          <div key={i}>
            <Card fileInfo={file} onAnnotate={() => _navigate(`annotate/${file.fileId}`)} onVisualize={() => { openModal(file.fileId) }} />
            {readAnnotationModal[file.fileId] && (
              <div><CustomModal url={file.videoUrl} isOpen={true} onClose={() => closeModal(file.fileId)} /></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center my-8 space-x-6">
        {/* Botões de paginação */}
        <div className="flex flex-wrap space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)} className={`px-4 py-2 rounded-lg transition-colors duration-200 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white'}`}>
              {index + 1}
            </button>
          ))}
        </div>

        {/* Seletor para itens por página */}
        <div className="relative inline-block">
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="appearance-none bg-gray-800 text-white py-2 px-4 pr-8 rounded-lg border border-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={15}>15 por página</option>
            <option value={30}>30 por página</option>
            <option value={60}>60 por página</option>
            <option value={120}>120 por página</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </span>
        </div>
      </div>

    </div>
  );
}
