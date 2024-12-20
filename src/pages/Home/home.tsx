import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../global.css';
// import { useAuth } from '@/hooks/UseAuth';
import Card from '@/components/Card';
import AnnotationModal from '@/components/AnnotationModal';
import Header from '../../components/Header';
// import SearchBar from '@/components/SearchBar';
import { RecordingModel } from '@/models/RecordingModel';

export default function Home() {
  const _navigate = useNavigate();
  const [readAnnotationModal, setReadAnnotationModal] = useState<{ [key: number]: boolean }>({});
  // const [searchTerm, setSearchTerm] = useState("");
  const [rawFiles, setRawFiles] = useState<RecordingModel[]>([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 30;
  const openModal = (videoId: number) => {setReadAnnotationModal(prevState => ({ ...prevState, [videoId]: true }));};
  const closeModal = (videoId: number) => {setReadAnnotationModal(prevState => ({ ...prevState, [videoId]: false }));};
  
  const fetchVideos = async () => {
    try {
      const apiPath = import.meta.env.VITE_API || 'http://localhost:5000';
      const urlPath = apiPath + `/v1/recording?page=${page}&limit=${itemsPerPage}`;
      const response = await fetch(urlPath);
      
      if (!response.ok) throw new Error("Erro ao buscar vídeos");
      const data = await response.json();
      const files = data.filter((file: RecordingModel) => file.recordingsVideos.length > 0);
      setRawFiles([...rawFiles, ...files]);
    } catch (error) {
      console.log("Erro na requisição:", error);
      toast.error("Erro ao buscar vídeos na api");
    }
  };
  
  // const handleSearch = (term: string) => {
  //   setSearchTerm(term);
  // };
  
  // useEffect(() => {
  //   const paginatedFiles = rawFiles.slice(0, itemsPerPage);
  //   if (searchTerm.trim() === "") setrawFiles(paginatedFiles);
  //   else {
  //     const filtered = paginatedFiles.filter(file => file.patient.name.toLowerCase().includes(searchTerm.toLowerCase()));
  //     setrawFiles(filtered);
  //   }
  // }, [searchTerm]);

  useEffect(() => {
    fetchVideos();
  }, [page]);
  
  return (
    <div className='flex-col h-screen w-screen overflow-x-hidden'>
      <Header />
      {/* <div className='flex justify-center'>
        <SearchBar onClick={handleSearch} />
      </div> */}
      {rawFiles.length > 0 ? (
        <div>
          <div id="paging-grid" className={`grid gap-5 m-5 my-5 ${rawFiles.length < 3 ? '' : 'grid-cols-[repeat(auto-fit,_minmax(475px,_1fr))]'} `}>
            {rawFiles.map((file, i) => (
              <div key={i}>
                <Card 
                  fileInfo={file} 
                  onAnnotate={() => {_navigate(`annotate/${file.id}`, {state: {recordingId: file.projectId}}) }} 
                  onVisualize={() => { openModal(file.id) }} 
                />  
                {readAnnotationModal[file.id] && (
                  <div><AnnotationModal id={file.id} isOpen={true} onClose={() => closeModal(file.id) } /></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center my-8 space-x-6">
            <div id="selector-container" className="relative inline-block">
              <button onClick={()=>{setPage(page+1)}}>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
              </button>
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

