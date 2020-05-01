import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import { pageTransition } from '../modules/actions';

const PageTransition: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    Router.events.on('routeChangeComplete', () => {
      dispatch(pageTransition());
    });
  }, []);

  return <></>;
};

export default PageTransition;
