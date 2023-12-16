import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';

import { BASE_URL, API_KEY, SEARCH_PARAMS } from './Pixabay/Pixabay';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import LoadMoreButton from './Button/Button';
import SpinnerLoader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [hits, setHits] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  const fetchImages = useCallback(() => {
    setLoading(true);

    axios
      .get(`${BASE_URL}?key=${API_KEY}&q=${name}&page=${page}&${SEARCH_PARAMS}`)
      .then(response => {
        if (!response.data.hits.length) {
          Notiflix.Notify.failure('No images found!');
        }

        const modifiedHits = response.data.hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
          id: String(id),
          tags,
          webformatURL,
          largeImageURL,
        }));

        setHits(prevHits => [...prevHits, ...modifiedHits]);
        setTotalHits(response.data.totalHits);
        setLoading(false);
      })
      .catch(error => {
        console.error(error.message);
        setLoading(false);
      });
  }, [name, page]);

  useEffect(() => {
    if (name.trim() === '') {
      return;
    }

    fetchImages();
  }, [name, page, fetchImages]);

  const toggleModal = (imageURL, tags) => {
    setShowModal(prevShowModal => !prevShowModal);
    setLargeImageURL(imageURL);
    setTags(tags);
  };

  const getValue = ({ name }) => {
    setHits([]);
    setName(name);
    setPage(1);
    setTotalHits(0);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <Searchbar onSubmitHandler={getValue} />

      {hits.length > 0 && (
        <ImageGallery>
          <ImageGalleryItem hits={hits} onImage={toggleModal} />
        </ImageGallery>
      )}

      {showModal && <Modal onClose={toggleModal} url={largeImageURL} alt={tags} />}

      {loading && <SpinnerLoader />}

      {totalHits > 0 && hits.length < totalHits && <LoadMoreButton onButtonClick={loadMore} />}
    </div>
  );
};

export default App;