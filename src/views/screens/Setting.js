/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/Ionicons';
import profilePic from '../../assets/person.png';
import restaurant from '../../assets/restaurant.png';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

// import Asset2 from '../../assets/Asset2.svg'

const Setting = ({navigation}) => {
  return (
    <SafeAreaView style={{height: '100%', backgroundColor: COLORS.white}}>
      <View
        style={{
          paddingTop: 10,
          flexDirection: 'row',
          paddingHorizontal: 20,
          alignItems: 'center',
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}>
        <View style={{width: '35%'}}>
          <Image
            source={profilePic}
            style={{height: 100, width: 100, borderRadius: 50}}></Image>
        </View>
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>Sawai Dhariwal</Text>
          <Text>sawaijian994@gmail.com</Text>
        </View>
      </View>
      <View style={{borderBottomWidth: 1}}>
        <View style={{paddingLeft: 15}}>
          <View style={{paddingBottom: 15}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, paddingTop: 10}}>
              Orders
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 25,
              }}>
              <Icon
                name="shopping-bag"
                size={30}
                style={{paddingRight: 10, color: COLORS.grey}}></Icon>
              <Text style={{fontSize: 25, color: COLORS.grey}}>
                Your Orders
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 25,
              }}>
              <Icon
                name="heart"
                size={30}
                style={{paddingRight: 10, color: COLORS.grey}}></Icon>
              <Text style={{fontSize: 25, color: COLORS.grey}}>
                Favourit Orders
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 25,
              }}>
              <Icon1
                name="restaurant"
                size={30}
                style={{paddingRight: 10, color: COLORS.grey}}></Icon1>

              <Text style={{fontSize: 25, color: COLORS.grey}}>
                Favourit Reastaurent{' '}
              </Text>
            </View>
            <Pressable 
              onPress={()=>navigation.navigate('RestaurantNavigator')}
            >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 25,
              }}>
              <Icon1
                name="restaurant"
                size={30}
                style={{paddingRight: 10, color: COLORS.grey}}></Icon1>

              <Text style={{fontSize: 25, color: COLORS.grey}}>
                Restaurant Owner{' '}
              </Text>
            </View>
            </Pressable>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 25,
              }}>
              <Icon
                name="heart"
                size={30}
                style={{paddingRight: 10, color: COLORS.grey}}></Icon>
              <Text style={{fontSize: 25, color: COLORS.grey}}>
                Canceled Orders
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View>
        <View style={{paddingTop: 10, paddingLeft: 15}}>
          <View style={{paddingBottom: 15}}>
            <Text style={{fontSize: 25, color: COLORS.grey}}>
              Send FeedBack
            </Text>
          </View>
          <View style={{paddingBottom: 15}}>
            <Text style={{fontSize: 25, color: COLORS.grey}}>
              Report a Safety Emergency
            </Text>
          </View>
          <View style={{paddingBottom: 15}}>
            <Text style={{fontSize: 25, color: COLORS.grey}}>
              Rate us on the play store
            </Text>
          </View>
          <View style={{paddingBottom: 15}}>
            <Text style={{fontSize: 25, color: COLORS.grey}}>Log out</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Setting;
