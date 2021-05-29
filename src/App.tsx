import React from 'react';
import Routes from './routes/Routes';
import UserContextProvider from './context/UserContext';

function App() {
  return (
    <UserContextProvider>
      <div className="bg-dark min-h-screen w-full">
        <Routes />
      </div>
    </UserContextProvider>
  );
}

export default App;
