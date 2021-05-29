import React from 'react';

interface LoaderProps {
  centeredOnScreen?: boolean;
}

export default function Loader({ centeredOnScreen = false }: LoaderProps) {
  if (centeredOnScreen) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="lds-ellipsis">
          <div />
          <div />
          <div />
          <div />
        </div>

        <p className="text-white text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />

      <p className="text-white text-sm">Loading...</p>
    </div>
  );
}
