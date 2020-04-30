import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWorks, openModal } from '../modules/actions';
import DynamicHead from '../components/dynamicHead';
import ScrollFixed from '../components/scrollFixed';
import Menu from '../components/menu';
import Modal from '../components/modal';
import Header from '../components/header';
import Content from '../components/content';
import Loading from '../components/loading';
import CardWrapper from '../components/cardWrapper';
import Card from '../components/card';
import Footer from '../components/footer';
import { State } from '../modules/reducers';

interface Work {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  image: {
    url: string;
  };
  description: string;
}

const Works: React.FC = () => {
  const dispatch = useDispatch();
  const works = useSelector((state: State) => state.works);
  const handleOpenModal = (payload): void => {
    dispatch(openModal(payload));
  };

  useEffect(() => {
    // 非同期通信でworks一覧を取得しに行く
    dispatch(getWorks.start());
  }, []);

  return (
    <>
      <DynamicHead title="WORKS" />
      <ScrollFixed />
      <Menu />
      <Modal />
      <Header />
      <Content title="WORKS">
        <Loading />
        <CardWrapper>
          {works.map((work: Work) => (
            <Card
              key={work.id}
              onClick={(): void => {
                handleOpenModal({
                  title: work.title,
                  image: work.image.url,
                  description: work.description,
                });
              }}
              image={work.image.url}
            />
          ))}
        </CardWrapper>
      </Content>
      <Footer />
    </>
  );
};

export default Works;
