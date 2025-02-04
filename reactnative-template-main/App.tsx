import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Toast from 'react-native-toast-message';

import { GlobalStateContainer, useGlobalState } from './_m/use_set_state';
import { Home_Screen, LoaderStarts_screen, Authentication_Screen, ManageProfile_Screen } from './_m/pages';

// Type definitions for props if needed
type TabNavigatorParamsList = {
  Peoples: undefined;
  Profile: undefined;
};

const TabBottom = createBottomTabNavigator<TabNavigatorParamsList>();

const MainPage: React.FC = () => {
  const {
    CurrentUser,
    Loader,
  } = useGlobalState();

  useEffect(() => {
    //if user has the session id
    (function () {
      Loader.Show(true);
      setTimeout(async function () {
        CurrentUser.SessionId.set(false);
        Loader.Show(false);
      }, 1000);
    })();
  }, [ ]);

  return (
    <>
      {(CurrentUser.SessionId.get && CurrentUser.SessionId.get.length > 3) ? (
        <NavigationContainer>
          <TabBottom.Navigator initialRouteName="Peoples">
            <TabBottom.Screen name="Peoples" component={Home_Screen} />
            <TabBottom.Screen name="Profile" component={ManageProfile_Screen} />
          </TabBottom.Navigator>
        </NavigationContainer>
      ) : (
        <Authentication_Screen />
      )}
    </>
  );
};

// Main App component
const App: React.FC = () => {
  return (
    <GlobalStateContainer>
      <MainPage />
      <Toast />
      <LoaderStarts_screen />
    </GlobalStateContainer>
  );
};

export default App;
