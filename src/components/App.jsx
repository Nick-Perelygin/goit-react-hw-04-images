import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader'
import Button from './Button/Button'
import Modal from './Modal/Modal';
import Api from './API'

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

export default function App() {
  const[value, setValue] = useState('');
  const[images, setImages] = useState([]);
  const[error, setError] = useState(null);
  const[status, setStatus] = useState(Status.IDLE);
  const[page, setPage] = useState(1);
  const[totalPages, setTotalPages] = useState(0);
  const[isShowModal, setIsShowModal] = useState(false);
  const[modalData, setModalData] = useState({ img: '', tags: '' });

  useEffect(() =>{
    if(!value){
      return;
    }
    setStatus(Status.PENDING);
    Api(value, page)
      .then(images => {
        if (images.hits.length === 0) {
          alert(`Oops... there are no images matching your search ${value}`);
          setStatus(Status.IDLE);
          return;
        }
        setTotalPages(Math.ceil(images.totalHits / 12));
        setStatus(Status.RESOLVED);
        setImages(state => [...state, ...images.hits]);
      })
    .catch(error => {
      setError(error);
      setStatus(Status.REJECTED)
    });
  }, [page, value])

  const onSubmitClick = data => {
    setValue(data);
    setImages([]);
    setError(null);
    setStatus(Status.IDLE);
    setPage(1);
    setTotalPages(0)
    setIsShowModal(false)
    setModalData({ img: '', tags: '' })
  }

  const openModalData = modalData => {
    setModalData(modalData);
    setIsShowModal(true);
  };

  const handleModalClose = () => {
    setIsShowModal(false);
  };

  const handleLoadMore = () => {
    setPage(state => state + 1);
  };
  
  if (status === 'pending') {
    return <Loader/>;
  }
    
  if (status === 'rejected') {
    return alert(`${error.message}`);
  }
    
  return (
    <div className="App"
      style={{
        height: '100vh',
        display: 'block',
        fontSize: 40,
        color: '#010101',
      }}>
      <Searchbar onSubmit={onSubmitClick}/>
      {images.length !== 0 && 
        <ImageGallery images={images} openModalData={openModalData}/>
      }
      {images.length !== 0 && page < totalPages && 
        <Button onClick={handleLoadMore}>Load More</Button>
      }
      {isShowModal && 
        <Modal modalData={modalData} onModalClose={handleModalClose}/>
      }
    </div>
  )
};