import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({modalData, onModalClose}) {
  useEffect(() => {
    const handleKeyDown = e => {
    if (e.code === `Escape`) {
      onModalClose();
    }};
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', e => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }});
    };
  }, [onModalClose])

  const handleBackdropeClick = e => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  };

  const { largeImageURL, tags } = modalData

  return createPortal(
      <div className="Overlay" onClick={handleBackdropeClick}>
        <div className="Modal">
          <img src={largeImageURL} alt={tags} />
          <p>{tags}</p>
        </div>
      </div>,
      modalRoot
  );
}

Modal.propTypes = {
  modalData: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onModalClose: PropTypes.func,
};