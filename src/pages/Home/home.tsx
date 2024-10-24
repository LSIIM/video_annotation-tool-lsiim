import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../global.css';
// import { useAuth } from '@/hooks/UseAuth';
import Card from '@/components/Card';
import AnnotationModal from '@/components/AnnotationModal';
import Header from '../../components/Header';
import SearchBar from '@/components/SearchBar';
// import filesTest from '../../data/files.json';
// import { VideoInfoModel } from '@/models/videoInfoModel';
import { RecordingModel } from '@/models/models';

export default function Home() {
  const _navigate = useNavigate();
  const [readAnnotationModal, setReadAnnotationModal] = useState<{ [key: number]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [files, setFiles] = useState<RecordingModel[]>([]);
  const [files, setFiles] = useState<RecordingModel[]>([]);
  const [loading, setLoading] = useState(true);
  // const API_PORT = import.meta.env.VITE_API_PORT || 5000;
  // const API_IP=  import.meta.env.VITE_API_IP || 'localhost';

  const fetchVideos = async () => {
    try {
      // const urlPath = `http://${API_IP}:${API_PORT}/v1/recording`;
      const apiPath = import.meta.env.VITE_API || 'http://localhost:5000';
      const urlPath = apiPath + `/v1/recording`;
      console.log("URLPATH", urlPath);
      const response = await fetch(urlPath);
      if (!response.ok) throw new Error("Erro ao buscar vídeos");
      console.log("RESPONSE", response);
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.log("Erro na requisição:", error);
      toast.error("Erro ao buscar vídeos na api");
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // toast.loading("Carregando vídeos locais de teste");
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // toast.success("Vídeos de teste carregados");
      // setFiles(filesTest);
    }
  };

  useEffect(() => {
    if (loading) {
      setLoading(false);
      fetchVideos();
      console.log("CHAMOU O FETCH");
    }
  }, [loading]);

  const openModal = (videoId: number) => {
    setReadAnnotationModal(prevState => ({ ...prevState, [videoId]: true }));
  };

  const closeModal = (videoId: number) => {
    setReadAnnotationModal(prevState => ({ ...prevState, [videoId]: false }));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFiles = files.slice(startIndex, endIndex);

  // const handleSearch = (term: string) => {
  //   setSearchTerm(term);
  //   setCurrentPage(1);
  //   if (term.trim() === "") {
  //     setFilteredFiles(files);
  //   } else {
  //     const filtered = files.filter(file => file.babyName.toLowerCase().includes(term.toLowerCase()));
  //     setFilteredFiles(filtered);
  //   }
  // };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(files.length / itemsPerPage);

  return (
    <div className='flex-col h-screen w-screen overflow-x-hidden'>
      <Header />
      <div className='flex justify-center'>
        <SearchBar onClick={() => { }} />
      </div>
      {files.length > 0 ? (
        <div>
          <div id="paging-grid" className="grid grid-cols-[repeat(auto-fit,_minmax(475px,_1fr))] gap-4 m-10">
            {paginatedFiles.map((file, i) => (
              <div key={i}>
                <Card fileInfo={file} onAnnotate={() => _navigate(`annotate/${file.id}`)} onVisualize={() => { openModal(file.id) }} />
                {readAnnotationModal[file.id] && (
                  <div><AnnotationModal id={file.id} isOpen={true} onClose={() => closeModal(file.id)} /></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center my-8 space-x-6">
            <div id="paging-controller-container" className="flex flex-wrap space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button key={index} onClick={() => handlePageChange(index + 1)} className={`px-4 py-2 rounded-lg transition-colors duration-200 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white'}`}>
                  {index + 1}
                </button>
              ))}
            </div>
            <div id="selector-container" className="relative inline-block">
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
      ) : (
        <div className="flex justify-center items-center h-[80vh]">
          <span className="text-2xl text-gray-400">Nenhum vídeo encontrado</span>
        </div>
      )}
    </div>
  );
}

