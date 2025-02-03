import React, { useEffect } from "react";
import { isLoggedIn_returnUserId } from "./toi/p";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GlobalStateContainer, useGlobalState } from "./toi/use_set_state";
import Toast from "react-native-toast-message";
 
import {
  Home_Screen,
  LoaderStarts_screen,
  Authentication_Screen,
  ManageProfile_Screen,
} from "./toi/pages";
const Stack = createStackNavigator();

function Oooo() {
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
  }, []);

  //loading
  if (_isLoading === null) {
    return ( 
        <LoaderStarts_screen /> 
    );
  }

  //
  //
  if (
    _isLoggedIn_returnUserId &&
    typeof _isLoggedIn_returnUserId === "string" &&
    _isLoggedIn_returnUserId.length > 3
  ) {
    return (
      <>
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
        {_isLoading && <LoaderStarts_screen />}
      </>
    );
  } else {
    return (
      <>
        <Authentication_Screen />
        {_isLoading && <LoaderStarts_screen />}
      </>
    );
  }
}

export default function App() {
  return (
    <GlobalStateContainer>
      <Oooo />
      <Toast />
    </GlobalStateContainer>
  );
}
