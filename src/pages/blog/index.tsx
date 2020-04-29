import React from 'react';
import styled from 'styled-components';
// import Link from 'next/link';
// コンポーネント
import HeadComponent from '../../components/headComponent';
import BaseComponent from '../../components/base';
import { width } from '../../services/style';

// const CardWrapper = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   @media (max-width: ${width.ipad}) {
//     flex-direction: column;
//   }
// `;

// const Card = styled.div`
//   width: calc(50% - 16px);
//   padding: 20px;
//   margin-top: 32px;
//   cursor: pointer;
//   background: #fff;
//   box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
//   transition: box-shadow 0.4s;
//   @media (max-width: ${width.ipad}) {
//     width: 100%;
//   }
//   @media (min-width: ${width.pc}) {
//     &:hover {
//       box-shadow: 0 0 24px rgba(0, 0, 0, 0.2);
//     }
//   }
// `;

// const Thumbnail = styled.div`
//   width: 100%;
//   height: 120px;
//   margin-top: 16px;
//   overflow: hidden;
// `;

// const ThumbnailImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   transition: transform 0.4s;
//   @media (min-width: ${width.pc}) {
//     ${Card}:hover & {
//       transform: scale(1.2, 1.2);
//     }
//   }
// `;

// const Date = styled.span`
//   font-family: 'Raleway', sans-serif;
//   font-size: 1.6rem;
//   font-style: italic;
//   color: ${color.primary};
// `;

// const Title = styled.h3`
//   margin-top: 0.5em;
//   overflow: hidden;
//   font-size: 1.6rem;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// `;

const Index = () => {
  return (
    <>
      <HeadComponent title="BLOG" />
      <BaseComponent heading="BLOG">
        <p>under construction</p>
      </BaseComponent>
    </>
  );
};

export default Index;
