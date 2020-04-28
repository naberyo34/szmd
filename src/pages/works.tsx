import React from 'react';
import styled from 'styled-components';
// import { useDispatch } from 'react-redux';
// import { openModal } from '../modules/actions';
// コンポーネント
import HeadComponent from '../components/head';
import BaseComponent from '../components/base';
import { width } from '../lib/style';

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
  // const dispatch = useDispatch();
  // const handleOpenModal = (payload) => {
  //   dispatch(openModal(payload));
  // };

  return (
    <>
      <HeadComponent title="WORKS" />
      <BaseComponent heading="WORKS">
        {/* {posts.length === 0 && <p>Oops! 投稿が見つかりません……</p>} */}
        <CardWrapper />
      </BaseComponent>
    </>
  );
};

export default Works;
