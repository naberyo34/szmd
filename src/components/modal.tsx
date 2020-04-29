import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { closeModal } from '../modules/actions';
import { zIndex, width, color, transition } from '../services/style';

const Wrapper = styled(motion.div)<{ innerHeight: number }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${zIndex.menu};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: ${({ innerHeight }) => (innerHeight ? `${innerHeight}px` : '100vh')};
  padding: 16px;
  color: ${color.white};
  background: rgba(0, 0, 0, 0.6);
`;

const wrapperVariants = {
  initial: { opacity: 0 },
  fadeIn: { opacity: 1 },
  fadeOut: { opacity: 0 },
};

const Inner = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  overflow-y: scroll;
  @media (max-width: ${width.ipad}) {
    display: block;
  }
`;

const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  @media (max-width: ${width.ipad}) {
    width: 100%;
  }
  img {
    max-height: calc(100vh - 32px);
    @media (max-width: ${width.ipad}) {
      max-height: none;
    }
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
  color: ${color.white};
  cursor: pointer;
  transition: color ${transition.fast};
  @media (max-width: ${width.ipad}) {
    display: block;
    margin: 32px auto 0;
  }
  &:hover {
    color: ${color.primary};
  }
`;

const Modal = props => {
  const { isOpen, data, innerHeight } = props;
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Wrapper
          variants={wrapperVariants}
          initial="initial"
          animate="fadeIn"
          exit="fadeOut"
          transition={{ duration: 0.2 }}
          innerHeight={innerHeight}
        >
          <Inner>
            <Image>
              <img src={data.imageUrl} alt={data.title} />
            </Image>
            <Text>
              <div>
                <Title>{data.title}</Title>
                <Description>{data.description}</Description>
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
