import React from 'react';

const Loading = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>

      <style>
        {`
          .spinner-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh; /* Adjust this value according to your layout */
          }

          .spinner {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: conic-gradient(#0000 10%, #474bff);
            -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 9px), #000 0);
            animation: spinner-zp9dbg 1s infinite linear;
          }

          @keyframes spinner-zp9dbg {
            to {
              transform: rotate(1turn);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
