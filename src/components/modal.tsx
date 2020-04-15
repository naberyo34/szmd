import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../modules/actions';
import { zIndex, width, color, transition } from '../lib/style';

const Modal = () => {
  const isOpen = useSelector(state => state.modal);
  const data = useSelector(state => state.modalData);
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const Wrapper = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${zIndex.menu};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    color: ${color.content};
    background: rgba(0, 0, 0, 0.6);
  `;

  const wrapperVariants = {
    initial: { opacity: 0 },
    fadeIn: { opacity: 1 },
    fadeOut: { opacity: 0 },
  };

  const Inner = styled.div`
    display: flex;
    width: 100vw;
    max-width: 1000px;
    padding: 16px;
    @media (max-width: ${width.ipad}) {
      flex-direction: column;
      height: calc(100vh - 32px);
      overflow-y: scroll;
    }
  `;

  const Image = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    @media (max-width: ${width.ipad}) {
      width: 100%;
      img {
        max-height: none;
      }
    }
    img {
      max-height: calc(100vh - 32px);
    }
  `;

  const Text = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    padding-left: 16px;
    @media (max-width: ${width.ipad}) {
      width: 100%;
      padding: 0;
      margin-top: 32px;
    }
  `;

  const Title = styled.h3`
    font-size: 2.4rem;
  `;

  const Description = styled.p`
    margin-top: 1em;
    font-size: 1.6rem;
  `;

  const Close = styled.button`
    height: 2.4rem;
    margin-top: 32px;
    font-family: 'Raleway', sans-serif;
    font-size: 1.2rem;
    font-style: italic;
    color: ${color.content};
    cursor: pointer;
    transition: color ${transition.fast};
    &:hover {
      color: ${color.bg};
    }
    @media (max-width: ${width.ipad}) {
      display: block;
      margin: 32px auto 0;
    }
  `;

  return (
    <AnimatePresence>
      {isOpen && (
        <Wrapper
          variants={wrapperVariants}
          initial="initial"
          animate="fadeIn"
          exit="fadeOut"
          transition={{ duration: 0.2 }}
        >
          <Inner>
            <Image>
              <img src={data.imageUrl} alt={data.title} />
            </Image>
            <Text>
              <div>
                <Title>{data.title}</Title>
                <Description>
                  ダミー説明文ダミー説明文ダミー説明文ダミー説明文ダミー説明文ダミー説明文ダミー説明文ダミー説明文ダミー説明文ダミー説明文ダミー説明文ダミー説明文
                </Description>
                <Close type="button" onClick={handleCloseModal}>
                  CLOSE
                </Close>
              </div>
            </Text>
          </Inner>
        </Wrapper>
      )}
    </AnimatePresence>
  );
};

export default Modal;
