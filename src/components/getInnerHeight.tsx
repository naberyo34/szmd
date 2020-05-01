import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getInnerHeight } from '../modules/actions';

const GetInnerHeight: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // viewportの高さを取得してStoreに格納する
    const setInnerHeight = (): void => {
      const { innerHeight } = window;
      dispatch(getInnerHeight(innerHeight));
    };

    setInnerHeight();
    // リサイズイベントが発火したらStoreを更新する
    window.addEventListener('resize', setInnerHeight);
  }, []);

  return <></>;
};

export default GetInnerHeight;
