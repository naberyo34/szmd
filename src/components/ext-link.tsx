import React from 'react';

const ExtLink = props => (
  <a {...props} rel="noopener" target={props.target || '_blank'} />
);

export default ExtLink;
