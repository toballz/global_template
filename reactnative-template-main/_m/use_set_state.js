import React, { createContext, useContext, useState } from "react";

// Create a context
const UserContext = createContext();

// Create a provider component
export const GlobalStateContainer = ({ children }) => {
  const [_isLoggedIn_returnUserId, _setisLoggedIn_returnUserId] = useState(
    false
  );
  const [_isLoading, _setisLoading] = useState(null);

  return (
    <UserContext.Provider
      value={{
        _isLoggedIn_returnUserId,
        _setisLoggedIn_returnUserId,
        _isLoading,
        _setisLoading,
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
