
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import { ModalContainer, Overlay } from './Modal.styled';
import { useEffect } from "react";

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({onClose, url}) => {

    useEffect(() => {
        window.addEventListener('keydown', handelKeyDown);
        return () => {window.removeEventListener('keydown', handelKeyDown);}
    });
   

    const handelKeyDown = e => {
        if (e.code === 'Escape'){
            onClose();
        }
    };

    const handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
           onClose();
        }
    };


        return createPortal (
<Overlay onClick={handleBackdropClick}>
                <ModalContainer>
                    <img src={url} alt=""/>
                </ModalContainer>
            </Overlay>,
            modalRoot
        )
    
};


Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
};
