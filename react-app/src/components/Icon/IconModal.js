import React from 'react';
import { useModal } from '../../context/Modal';

function IconModal({
  imageUrl, //image to render
  modalComponent, // component to render inside the modal
  faIcon, //can pass className for fa-icon
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  isServer = false, //give css class for hover effect if True
  clickEvent = null, //pass a custom clickevent for Icon
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (typeof onButtonClick === 'function') onButtonClick();
    if (typeof onModalClose === 'function') setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };

  return (
    <div className={`open-modal-button icon-img ${isServer ? 'server-icon' : ''}`} onClick={onClick}>
      {
        faIcon ?
          <i className={`icon-img ${faIcon} ${isServer ? 'server-icon' : ''}`} ></i>
          :
          <img src={imageUrl} alt='icon' className={`icon-img ${isServer ? 'server-icon' : ''}`} />
      }
    </div>
  );
}

export default IconModal;
