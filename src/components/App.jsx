
import { useState, useEffect } from "react";
import { fetchPictures } from "services/gallaryAPI";
import { GlobalStyle } from "./GlobalStyle";

import { Layout } from "./Layout/Layout";

import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { Searchbar } from "./Searchbar/Searchbar";
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';


export const App = () => {
  const{pictures, setPictures} = useState([]);
  const{status, setStatus} = useState('idle');
  const{showModal, setShowModal} = useState(false);
  const{page, setPage} = useState(1);
  const{query, setQuery} = useState('');
  const{largeImageUrl, setLargeImageUrl} = useState('');
  const{loadMore, setLoadMore} = useState(null);


   const searchResult = value => {
    setQuery(value);
    setPage(1);
    setPictures([])
    setLoadMore(null)
  };

const toggleModal = () => {
    setShowModal(false);
  };


const getLargeImg = imgUrl => {
  setLargeImageUrl(imgUrl);
  toggleModal();
};

const handleLoadMore = () => {
    setPage (prevPage => prevPage + 1);

};

useEffect(() => {
  if (!query) {
    return;
  };

    setStatus('loading');
    setLoadMore(null);

    fetchPictures(query, page)
    .then(e => {
      setPictures(prevState => [...prevState, ...e.hits]);
      setStatus('idle');
      setLoadMore(12 - e.hits.length);
     })

      .catch(error => console.log(error));
}, [page,query, setLoadMore, setPictures, setStatus]);


  return (
    <Layout>
<GlobalStyle/>
<Searchbar onSubmit={searchResult}/>
{showModal && (
  <Modal url={largeImageUrl} onClose={toggleModal} />
)}
    <ImageGallery pictures={pictures} onClick={getLargeImg}/>  
    {status === 'loading' && <Loader />}
        {loadMore === 0 && <Button onClick={handleLoadMore} />}
    </Layout>
  );
};
