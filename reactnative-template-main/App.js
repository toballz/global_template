import React, { useEffect } from 'react';
import { isLoggedIn_returnUserId } from './_m/p';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalStateContainer, useGlobalState } from './_m/use_set_state';
import Toast from 'react-native-toast-message';

import {
  Home_Screen,
  LoaderStarts_screen,
  Authentication_Screen,
  ManageProfile_Screen,
} from './_m/pages';
const Stack = createStackNavigator();

function MainPage() {
  const {
    _isLoggedIn_returnUserId,
    _setisLoggedIn_returnUserId,
    _isLoading,
    _setisLoading,
  } = useGlobalState();

  useEffect(() => {
    (function () {
      setTimeout(async function () {
        const status = await isLoggedIn_returnUserId();
        _setisLoggedIn_returnUserId(status);
        _setisLoading(false);
      }, 1000);
    })();
  }, [_setisLoading, _setisLoggedIn_returnUserId]);

  //loading
  if (_isLoading === null) {
    return (
      <LoaderStarts_screen />
    );
  }

  //
  //
  return (
    <>
      {(_isLoggedIn_returnUserId &&
        typeof _isLoggedIn_returnUserId === 'string' &&
        _isLoggedIn_returnUserId.length > 3) ? (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home_Screen}
            //initialParams={{  }}
            />
            <Stack.Screen name="Profile" component={ManageProfile_Screen} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <Authentication_Screen />)}
      {_isLoading && <LoaderStarts_screen />}
    </>
  );

}

//
export default function App() {
  return (
    <GlobalStateContainer>
      <MainPage />
      <Toast />
    </GlobalStateContainer>
  );
}
