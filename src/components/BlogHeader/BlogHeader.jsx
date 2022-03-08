import React from 'react';
import { Image } from '@builder.io/react';

export const BlogHeader = props => {
  return (
    <div>
      <h2>{props.title}</h2>
      <Image image={props.image} />
    </div>
  );
};
