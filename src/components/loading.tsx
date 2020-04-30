import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../modules/reducers';

const Loading: React.FC = () => {
  const isLoading = useSelector((state: State) => state.isLoading);
  return <>{isLoading && <p>loading ... </p>}</>;
};

export default Loading;
