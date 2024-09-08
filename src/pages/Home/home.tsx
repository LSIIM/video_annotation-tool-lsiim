import { Navigate } from 'react-router-dom';
import { useState } from 'react';
// import toast from 'react-hot-toast';
import '../../global.css'
import { useAuth } from '@/hooks/UseAuth';
import Card from '@/components/Card';
import CustomModal from '@/components/CustomModal';
import files from '@/lsiim/files.json';
import Header from '../../components/Header'
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const [annotationModal, setAnnotationModal] = useState<{ [key: number]: boolean }>({});
  const [readAnnotationModal, setReadAnnotationModal] = useState<{ [key: number]: boolean }>({});

  const openModal = (videoId: number, option: boolean) => {
    option
      ? setAnnotationModal(prevState => ({ ...prevState, [videoId]: true }))
      : setReadAnnotationModal(prevState => ({ ...prevState, [videoId]: true }));
  };
  const closeModal = (videoId: number, option: boolean) => {
    option
      ? setAnnotationModal(prevState => ({ ...prevState, [videoId]: false }))
      : setReadAnnotationModal(prevState => ({ ...prevState, [videoId]: false }));
  };

  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to='/login' />
  return (
    <div className='flex-col h-screen w-screen overflow-x-hidden'>
      <Header />
      <div className='flex justify-center'>
        <SearchBar onClick={() => console.log('search')} />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(475px,_1fr))] gap-4 m-10">
        {files.map((file, i) => (
          <div key={i}>
            <Card fileInfo={file} onAnnotate={() => { openModal(file.fileId, true) }} onVisualize={() => { openModal(file.fileId, false) }} />
            {readAnnotationModal[file.fileId] && (
              <div><CustomModal url={file.videoUrl} option={false} isOpen={true} onClose={() => closeModal(file.fileId, false)} /></div>
            )}
            {annotationModal[file.fileId] && (
              <div><CustomModal url={file.videoUrl} option={true} isOpen={true} onClose={() => closeModal(file.fileId, true)} /></div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
// { albums?.map((album, i) => (
//   <div key={i}>
//     <div style={{'--bg-fundo': `url(${album.images[0].url})`} as React.CSSProperties} className="bg-[image:var(--bg-fundo)] bg-cover bg-no-repeat w-[220px] h-[220px] rounded-md hover:scale-[1.15] transition">
//       <div onClick={() => openModal(album.name)} className="flex flex-col h-full justify-between items-center backdrop-brightness-50 shadow-white">
//         <div />
//         <h1 className="text-2xl font-semibold text-center text-white line-clamp-2 max-w-full px-3">{album.name}</h1>
//         <div className="flex justify-between items-center w-full mb-2">
//           <div></div>
//           <h1 className="text-2xl font-semibold text-center text-white mr-4">R$ {album.value}</h1>
//         </div>
//       </div>
//     </div>
//     {albumModals[album.name] && (
//       <div><CustomModal isOpen={true} album={album} onClose={() => closeModal(album.name)} /></div>
//     )}
//   </div>
// ))}