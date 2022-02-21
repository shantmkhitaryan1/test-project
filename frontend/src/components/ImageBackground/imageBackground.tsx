import React from 'react';
import './imageBackground.scss';

interface Props {
  background: string
}

const ImageBackground: React.FC<Props> = ({ background }) => {
  return (
    <div className="background-container">
      <div className='image-container'>
        <img src={background} alt="" />
      </div>
      <div className="white-background"></div>
    </div>
  );
}

export default ImageBackground;
