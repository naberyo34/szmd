import React from 'react';
import { useSelector } from 'react-redux';

const Menu = () => {
  const isOpen = useSelector(state => state.menu);

  return <div>{isOpen && <p>メニューひらいてます</p>}</div>;
};

export default Menu;
