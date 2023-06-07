import PropTypes from 'prop-types';

export default function ImageGalleryItem({largeImageURL, tags, webformatURL, onImageClick }) {
  return (
    <li className="ImageGalleryItem"
      onClick={ e => {
        e.preventDefault();
        onImageClick({ largeImageURL, tags });
      }}
    >
      <div>
        <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} loading="lazy"/>
      </div>
    </li>
    );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};