/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import {View,Text} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import RestaurantPartner from '../screens/RestaurantPartner';
import RestaurantMenu from '../screens/RestaurantMenu';

const Tab = createBottomTabNavigator();

const RestauratNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        style: {
          height: 55,
          borderTopWidth: 0,
          elevation: 0,
        },
        showLabel: false,
        activeTintColor: COLORS.primary,
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name="ResHome"
        component={RestaurantPartner}
        options={{
          tabBarIcon: ({color}) => (
           
            <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
             <Icon name="home-filled" color={color} size={28} />
            <Text
              style={{
                color: color ? color : COLORS.black,
              }}>
              Home
            </Text>
          </View>
          ),
          tabBarLabel:()=>null ,
          headerTitle:'Order Status',
        }}

      />
      <Tab.Screen
        name="ResMenu"
        component={RestaurantMenu}
        options={{
          tabBarIcon: ({color}) => (
            <View>
            <Icon name="local-mall" color={color} size={28} />
            <Text
              style={{
                color: color ? color : COLORS.black,
              }}>
              Menu
            </Text>
            </View>
          ),
          tabBarLabel:()=>null ,
          headerTitle:'Menu',
        }}
      />
      {/* <Tab.Screen
        name="Search"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View
              style={{
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.white,
                borderColor: COLORS.primary,
                borderWidth: 2,
                borderRadius: 30,
                top: -25,
                elevation: 5,
              }}>
              <Icon name="search" color={COLORS.primary} size={28} />
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="ResAnalytics"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View>
            <Icon name="favorite" color={color} size={28} />
            <Text
              style={{
                color: color ? color : COLORS.black,
              }}>
              Analytics
            </Text>
            </View>

          ),
          tabBarLabel:()=>null ,
        }}
      />
      <Tab.Screen
        name="ResSetting"
        component={CartScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View>
            <Icon name="shopping-cart" color={color} size={28} />
            <Text
              style={{
                color: color ? color : COLORS.black,
              }}>
              Setting
            </Text>
            </View>
          ),
          tabBarLabel:()=>null ,
        }}
      />
    </Tab.Navigator>
  );
};

export default RestauratNavigator;
