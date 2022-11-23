/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import COLORS from './src/consts/colors';
import DetailsScreen from './src/views/screens/DetailsScreen';
import BottomNavigator from './src/views/navigation/BottomNavigator';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import SignIn from './src/views/screens/SignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUp from './src/views/screens/SignUp';
import Setting from './src/views/screens/Setting';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import RestaurantPartner from './src/views/screens/RestaurantPartner';
import RestaurantNavigator from './src/views/navigation/RestaurantNavigator';
import UploadMenu from './src/views/screens/UploadMenu';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
          <Stack.Screen name="Home" component={BottomNavigator} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="RestaurantNavigator" component={RestaurantNavigator} />
          <Stack.Screen name="UploadMenu" component={UploadMenu} />
          {/* <Stack.Screen name="Payment" component={Payment} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
