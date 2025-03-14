import React from 'react';

function ScrollingFrame({ children, height = '100%', width = '100%' }) {
  return (
    <div style={{ 
      overflow: 'auto', 
      height: height, 
      width: width,
      border: '1px solid #ccc' // Optional: for visual clarity
    }}
        className='rounded'
    >
      {children}
    </div>
  );
}

export default ScrollingFrame;
