import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import { GlobalStateContainer, useGlobalState } from './_m/use_set_state';
import { isLoggedIn_returnUserId } from './_m/p';
import { Home_Screen, LoaderStarts_screen, Authentication_Screen, ManageProfile_Screen } from './_m/pages';
const Stack = createStackNavigator();

function MainPage() {
  const {
    _isLoggedIn_returnUserId,
    _setisLoggedIn_returnUserId,
    Loader,
  } = useGlobalState();

  useEffect(() => {
    (function () {
      Loader.Show();
      //Loader.Show();
      setTimeout(async function () {
        const status = await isLoggedIn_returnUserId();
        _setisLoggedIn_returnUserId(status);
        Loader.Hide();
        //Loader.Hide();
      }, 1000);
    })();
  }, [Loader, _setisLoggedIn_returnUserId]);


  //
  //
  return (
    <>
      {(true || _isLoggedIn_returnUserId &&
        typeof _isLoggedIn_returnUserId === 'string' &&
        _isLoggedIn_returnUserId.length > 3) ? (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home_Screen}
            //initialParams={{  }}
            />
            <Stack.Screen name="Profile" component={ManageProfile_Screen} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <Authentication_Screen />)}
    </>
  );

}

//
export default function App() {


  return (
    <GlobalStateContainer>
      <MainPage />
      <Toast />
      <LoaderStarts_screen />
    </GlobalStateContainer>
  );
}
