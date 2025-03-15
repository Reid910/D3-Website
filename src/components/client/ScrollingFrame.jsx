import React from 'react';

function ScrollingFrame({ children }) {
  return (
    <div
        className='rounded w-full h-full px-3 overflow-y-auto border-2 border-gray-800'
    >
      {children}
    </div>
  );
}

export default ScrollingFrame;
