import PropTypes from 'prop-types';
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";

export default function ImageGallery({images, openModalData}) {
  return (
    <ul className = "ImageGallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          largeImageURL={image.largeImageURL} 
          webformatURL={image.webformatURL} 
          tags={image.tags}
          onImageClick={openModalData}
        />
      ))}
    </ul> 
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array,
  openModalData: PropTypes.func,
};