import React, { createContext, useContext, useState } from 'react';
// Create a context
const UserContext = createContext();

// Create a provider component
export const GlobalStateContainer = ({ children }) => {
  const [_getSessionId, _setSessionId] = useState(false);
  const [_getUserId, _setUserId] = useState(false);
  const [_isLoading, _setisLoading] = useState(false);

  const Loader = {
    Active: _isLoading,
    Show: (b) => { _setisLoading(b); },
  };
  const CurrentUser = {
    id: {
      get: _getUserId,
      set: _setUserId,
    },
    SessionId: {
      get: _getSessionId,
      set: _setSessionId,
    },
  };

  return (
    <UserContext.Provider
      value={{
        CurrentUser,
        Loader,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy access to the context
export const useGlobalState = () => {
  return useContext(UserContext);
};


