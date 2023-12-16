import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ hits, onImage }) => {
  return (
    <>
      {hits.map(({ id, tags, webformatURL, largeImageURL }) => (
        <li className={styles.ImageGalleryItem} key={id}>
          <img
            src={webformatURL}
            alt={tags}
            className={styles.ImageGalleryItemImage}
            onClick={() => onImage(largeImageURL, tags)}
          />
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;