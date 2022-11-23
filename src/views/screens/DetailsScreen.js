/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, Botton } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import COLORS from '../../consts/colors';
import { SecondaryButton } from '../components/Button';
import categories from '../../assets/pizza.jpg';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import foods from '../../consts/foods';
import { useDispatch, useSelector } from 'react-redux';
import { addFoodToCart, fetchMenu,addHotelDetailsCart, ADD_FOOD_CART_REMOVE, HOTEL_DETAIL_REMOVE } from '../../redux/action';

const DetailsScreen = ({ navigation, route }) => {
  const item = route.params;
  //  console.log(item.menus)

  const dispatch = useDispatch();
  const { menu, loading } = useSelector(state => state.fetchHotelReducer);
  const { hotelDetail } = useSelector(state => state.fetchCartData);
  // console.log(menu, loading);

  useEffect(() => {
    dispatch(fetchMenu(item.menus.split('/')[1]));
  }, [dispatch, item.menus]);


  const handleAddFood = (food) => {
    // console.log(food)
    food.quantity = 1;
    if(!(JSON.stringify(hotelDetail) === JSON.stringify(item))){
       dispatch({
        type: HOTEL_DETAIL_REMOVE,
       });
       dispatch({
        type: ADD_FOOD_CART_REMOVE,
       })
    }
      dispatch(addHotelDetailsCart(item));
      dispatch(addFoodToCart(food));
    
  }

  const Card = ({ food,index }) => {
    return (

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 15 }}>


        <View style={{ width: '60%', flexWrap: 'nowrap' }}>
          <Text style={{ paddingTop: 20, paddingLeft: 15, fontSize: 18 }}>{food.name}</Text>
          <Text style={{ color: COLORS.grey, paddingTop: 10, paddingLeft: 15 }}>₹{food.price}</Text>
          <Text style={{ color: COLORS.grey, paddingTop: 10, paddingLeft: 15, paddingBottom: 20, flex: 1, flexWrap: 'wrap' }}>{food.rating}</Text>

        </View>
        <View style={{ paddingTop: 20 }}>
          <ImageBackground
            source={{ uri: (food.image).trim() }}
            style={{ height: 100, width: 140, borderRadius: 5 }}
            resizeMode="cover"
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=>handleAddFood(food)}
            >
              <View style={{ height: 20, width: 50, backgroundColor: COLORS.white, marginLeft: 45, marginTop: 80 }}>


                <Text
                  style={{
                    paddingLeft: 10,
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: COLORS.green,

                  }}>
                  ADD
                </Text>

              </View>
            </TouchableOpacity>

          </ImageBackground>
        </View>
      </View>



    )
  }

  return (loading ? <></> :
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <Icon name="heart" size={28} onPress={navigation.goBack} style={{ paddingRight: 10 }} />
        <Icon name="share-alt" size={28} onPress={navigation.goBack} />
      </View>
      <View style={style.resname}>
        <Icon name="arrow-left" size={28} onPress={navigation.goBack} style={{ paddingRight: 5 }} />
        <Text style={{ fontSize: 20 }}>{item.name}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ height: '85%' }}>
        <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.grey }}>
          <Text style={{ paddingTop: 5, paddingLeft: 50, fontSize: 15 }}>{item?.speciality}</Text>
          <Text style={{ color: COLORS.grey, paddingLeft: 50, paddingTop: 5 }}>
            {item.location}
          </Text>
          <View style={{ flexDirection: 'row', paddingLeft: 60, paddingTop: 10, paddingBottom: 20 }} >
            <View style={{ backgroundColor: COLORS.green, flexDirection: 'row', marginRight: 5 }} >

              <Text style={{ paddingRight: 4, paddingLeft: 4 }} >{item.rating}</Text>
              <Icon name="star" size={14} style={{ paddingTop: 3, paddingRight: 4 }} />
            </View>
            <View style={{ paddingRight: 40 }}>
              <Text style={{ fontSize: 8 }}> {item.ratingNo}</Text>
              <Text style={{ fontSize: 8 }}>Reviews</Text>
            </View>
            <View style={{ backgroundColor: COLORS.grey, flexDirection: 'row', marginRight: 5 }}>

              <Icon name="clock" size={14} style={{ paddingTop: 3, paddingLeft: 5 }} />
              <Text style={{ paddingLeft: 3, paddingRight: 5 }} >{item.timeToPrepare}</Text>
            </View>
          </View>
        </View>
        {menu?.map((data, index) => (
          <View style={{ paddingBottom: menu.length - 1 === index ? 50 : 0 }} key={index}>
            <Card food={data} index = {index} />
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
  },
  resname: {
    paddingVertical: 5,
    flexDirection: 'row',

    // alignItems: 'center',
    marginHorizontal: 10,
  }

});

export default DetailsScreen;
