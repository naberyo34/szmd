import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { toggleModal } from '../modules/actions';
import { zIndex, width, color, transition } from '../services/style';
import { State } from '../modules/reducers';

const wrapperVariants = {
  initial: { opacity: 0 },
  fadeIn: { opacity: 1 },
  fadeOut: { opacity: 0 },
};

interface WrapperProps {
  innerHeight?: number;
}

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: ${(props: WrapperProps): string =>
    props.innerHeight ? `${props.innerHeight}px` : '100vh'};
  padding: 16px;
  color: ${color.white};
  background: rgba(0, 0, 0, 0.6);
`;

const Inner = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  @media (max-width: ${width.ipad}) {
    display: block;
    padding-bottom: 64px;
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
  line-height: 1.5;
`;

const Description = styled.p`
  margin-top: 1em;
  font-size: 1.6rem;
`;

const Close = styled.button`
  margin-top: 2em;
  font-family: 'Raleway', sans-serif;
  font-size: 1.6rem;
  font-style: italic;
  color: ${color.white};
  cursor: pointer;
  transition: color ${transition.fast};
  &:hover {
    color: ${color.primary};
  }
`;

const Modal: React.FC = () => {
  const dispatch = useDispatch();
  const innerHeight = useSelector((state: State) => state.innerHeight);
  const isOpen = useSelector((state: State) => state.modal.isOpen);
  const data = useSelector((state: State) => state.modal.data);
  const handleToggleModal = (): void => {
    dispatch(toggleModal());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Wrapper
          innerHeight={innerHeight}
          variants={wrapperVariants}
          initial="initial"
          animate="fadeIn"
          exit="fadeOut"
          transition={{ type: 'tween', duration: 0.2 }}
        >
          <Inner>
            <Image>
              <img src={data.image} alt={data.title} />
            </Image>
            <Text>
              <div>
                <Title>{data.title}</Title>
                <Description
                  dangerouslySetInnerHTML={{
                    __html: data.description,
                  }}
                />
                <Close type="button" onClick={handleToggleModal}>
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
