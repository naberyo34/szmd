import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../modules/actions';
import { color, zIndex, transition } from '../lib/style';

const Modal = () => {
  const isOpen = useSelector(state => state.modal);
  const data = useSelector(state => state.modalData);
  const dispatch = useDispatch();
  const handleCloseCard = () => {
    dispatch(closeModal());
  };

  return (
    <>
      {isOpen && (
        <>
          <button type="button" onClick={handleCloseCard}>
            CLOSE
          </button>
          <h2>{data.title}</h2>
          <img src={data.imageUrl} alt="test" />
        </>
      )}
    </>
  );
};

export default Modal;
