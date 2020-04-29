import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getWorks } from '../modules/actions';
// import { openModal } from '../modules/actions';
// コンポーネント
import HeadComponent from '../components/head';
import BaseComponent from '../components/base';
import { width } from '../services/style';

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: ${width.ipad}) {
    flex-direction: column;
  }
`;

// おいおいカードは1コンポーネントとして切り出したいところ……
// const Card = styled.div`
//   width: calc(50% - 16px);
//   height: 200px;
//   margin-top: 32px;
//   overflow: hidden;
//   cursor: pointer;
//   box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
//   transition: box-shadow ${transition.fast};
//   @media (max-width: ${width.ipad}) {
//     width: 100%;
//   }
//   @media (min-width: ${width.pc}) {
//     &:hover {
//       box-shadow: 0 0 24px rgba(0, 0, 0, 0.2);
//     }
//   }
// `;

// const ThumbnailImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   object-position: 50% 0;
//   transition: transform ${transition.fast};
//   @media (min-width: ${width.pc}) {
//     ${Card}:hover & {
//       transform: scale(1.2, 1.2);
//     }
//   }
// `;

const Works = () => {
  const dispatch = useDispatch();
  const works = useSelector((state) => state.works);

  useEffect(() => {
    dispatch(getWorks.start());
  }, []);

  return (
    <>
      <HeadComponent title="WORKS" />
      <BaseComponent heading="WORKS">
        <CardWrapper />
        {works && <p>worksとれてるで</p>}
      </BaseComponent>
    </>
  );
};

export default Works;
