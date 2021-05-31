import React from 'react';

interface LoaderProps {
  withText?: boolean;
  centeredOnScreen?: boolean;
}

export default function Loader({
  centeredOnScreen = false,
  withText = true,
}: LoaderProps) {
  if (centeredOnScreen) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="lds-ellipsis">
          <div />
          <div />
          <div />
          <div />
        </div>

        {withText && <p className="text-white text-sm">Loading...</p>}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>

      {withText && <p className="text-white text-sm">Loading...</p>}
    </div>
  );
}
