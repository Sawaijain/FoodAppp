import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, Linking } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import COLORS from '../../consts/colors';
import foods from '../../consts/foods';
import { PrimaryButton } from '../components/Button';
import order from '../../assets/note.png';
import veg from '../../assets/veg.png';
import rating from '../../assets/color_star.png';
import { useDispatch, useSelector } from 'react-redux';
import { cartData, fetchMenu,ADD_FOOD_QUANTITY, REMOVE_ADD_FOOD } from '../../redux/action';
import { initiateTransaction } from 'rn-upi-pay';
import { NativeModules } from 'react-native';


const CartScreen = ({ navigation, route }) => {
  const item = route.params;
  let star = [1, 2, 3, 4, 5]
  let CardItem = [1, 2, 3]
  const dispatch = useDispatch();
  const [hotelData, setHotelData] = useState();
  const [cart, setCart] = useState();
  const { data, hotelDetail } = useSelector(state => state.fetchCartData);
  const { hotels } = useSelector(state => state.fetchHotelReducer);
  const { menu, loading } = useSelector(state => state.fetchHotelReducer);

  // console.log(hotelDetail);



  const Button = () => {
    return (
      <View style={{ width: 120, height: 40, backgroundColor: '#FAEDED', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 7, borderRadius: 10, borderWidth: 2, borderColor: '#FF0000' }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ width: 25, height: 25, backgroundColor: '#F54749', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon name='plus' size={14} style={{ color: COLORS.white }} />

        </TouchableOpacity>
        <View >
          <Text >1</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{ width: 25, height: 25, backgroundColor: '#F54749', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon name='minus' size={14} style={{ color: COLORS.white }} />

        </TouchableOpacity>

      </View>
    )
  }

  // console.log(data)

  const handlePayment = () => {

    initiateTransaction({
      upi: '7223901492@upi',  // Required
      transactionId: 'asdf-jklm-qwer-zxcv',  // Required
      currency: 'INR',   // Currency Code (Required)
      merchantCategoryCode: '4421',  // Four digit Code. (Required)
      payeeName: 'Shubham Patidar', // Required 
      amount: '1',  // Amount must be in String and must be greater than 1.00 (Required)
      note: 'This is for the food.', // Additional Notes or description (Optional)
    })
      .then((res) => {
        console.log(res, 'RESPONSE');
      })
      .catch((e) => {
        console.log(e.message, 'ERROR');
      });
  }

  const handleAddQuantity =(index) => {
      dispatch({
        type: ADD_FOOD_QUANTITY,
        payload: index,
      });
  }
  const handleSubQuantity =(index)=>{
      dispatch({
        type: REMOVE_ADD_FOOD,
        payload: index,
      });
  }

  const AddMoreItem =() => {
    navigation.navigate('DetailsScreen', hotelDetail);
  }

  const CartCard = ({ value,index }) => {
    // console.log(value);
    return (
      <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.grey }} >


        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ paddingTop: 20, paddingLeft: 10 }}>
            <Image source={veg} style={{ height: 35, width: 30 }} resizeMode='contain' />
          </View>
          <Text style={{ paddingTop: 13, paddingLeft: 8, fontWeight: 'bold', fontSize: 21 }}>
            {value?.name}
          </Text>


        </View>
        <View style={{ flexDirection: 'row', margin: -4, paddingLeft: 10, alignItems: 'center', justifyContent: 'space-between', paddingRight: 20 }}>


          <View style={{ width: '40%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 35 }}>

            {star?.map((index) => (
              <Image source={rating} style={{ height: 15, width: 15 }} key={index} />
            ))}
            <Text style={{ paddingLeft: 10, fontSize: 15 }}>{value?.ratingNo}</Text>
          </View>
          {/* <Image source={rating} style={{height:30,width:30 }}/> */}

          <View style={{ width: 120, height: 40, backgroundColor: '#FAEDED', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 7, borderRadius: 10, borderWidth: 2, borderColor: '#FF0000' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ width: 25, height: 25, backgroundColor: '#F54749', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
              onPress={()=>handleSubQuantity(index)}
            >
              <Icon name='minus' size={14} style={{ color: COLORS.white }} />

            </TouchableOpacity>
            <View >
              <Text >{value.quantity}</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{ width: 25, height: 25, backgroundColor: '#F54749', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
              onPress={()=>handleAddQuantity(index)}
            >
              <Icon name='plus' size={14} style={{ color: COLORS.white }} />

            </TouchableOpacity>

          </View>
        </View>

        <View style={{ flexDirection: 'row', paddingBottom: 10, alignItems: 'center', justifyContent: 'space-between', paddingRight: 48, paddingTop: 3 }}>

          <View style={{ width: '22%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 45, alignItems: 'center', marginTop: -15 }}>

            <Text style={{ color: '#F54749', fontSize: 17, paddingRight: 5 }}>Edit</Text>
            <Icon name='angle-down' size={12} style={{ color: '#F54749' }} />
          </View>
          <View style={{ justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: '200' }}>{`₹ ${value?.price*value.quantity} /-`}</Text>
          </View>



        </View>
        <TouchableOpacity

          activeOpacity={0.7}
          style={{ width: '80%', paddingBottom: 10, marginTop: -5, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ color: COLORS.grey }}>Do You Want Add Any Cooking Instruction ?</Text>
        </TouchableOpacity>
      </View>
    )
  }
  const TotalAmount = ( value ) => {
    var total =0;
    for(var i=0;i<value.length;i++){
      total += value[i].price*value[i].quantity;
    }
    return total;
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      {
        data.length === 0 ? <View>
          <Text>Empty Cart</Text>
        </View>
          :
          <>
            <View style={style.header} >
              <Icon name="heart" size={28} onPress={navigation.goBack} style={{ paddingRight: 10 }} />
              <Icon name="share-alt" size={28} onPress={navigation.goBack} />
            </View>
            <View style={style.resname} >
              <Icon name="arrow-left" size={28} onPress={navigation.goBack} style={{ paddingRight: 5 }} />
              <Text style={{ fontSize: 20 }}>{hotelDetail?.name}</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ height: '85%' }}>
              <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.grey }}>
                <Text style={{ paddingTop: 5, paddingLeft: 40, fontSize: 15 }}>{hotelDetail?.speciality}</Text>
                <Text style={{ color: COLORS.grey, paddingLeft: 40, paddingTop: 5 }}>
                  {hotelDetail?.address}
                </Text>
                <View style={{ flexDirection: 'row', paddingLeft: 60, paddingTop: 10, paddingBottom: 20 }} >
                  <View style={{ backgroundColor: COLORS.green, flexDirection: 'row', marginRight: 5 }} >

                    <Text style={{ paddingRight: 4, paddingLeft: 4, color: COLORS.white }} >{hotelDetail?.rating}</Text>
                    <Icon name="star" size={14} style={{ paddingTop: 3, paddingRight: 4, color: COLORS.white }} />
                  </View>
                  <View style={{ paddingRight: 40 }}>
                    <Text style={{ fontSize: 8 }}> {hotelDetail?.ratingNo}</Text>
                    <Text style={{ fontSize: 8 }}>Reviews</Text>
                  </View>
                  <View style={{ backgroundColor: COLORS.grey, flexDirection: 'row', marginRight: 5 }}>

                    <Icon name="clock" size={14} style={{ paddingTop: 3, paddingLeft: 5, color: COLORS.white }} />
                    <Text style={{ paddingLeft: 3, paddingRight: 5, color: COLORS.white }} >{hotelDetail?.timeToPrepare}</Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                  <Image source={order} style={{ height: 30, width: 30 }} />
                </View>
                <Text style={{ paddingTop: 10, paddingLeft: 10, fontSize: 22, fontWeight: 'bold' }}>
                  Your Order
                </Text>
              </View>

              <View>
                {data?.map((value, index) => (
                  <View key={index}>
                    <CartCard value={value} index = {index}/>
                  </View>
                ))}
              </View>
              <View style={{ width: '100%', height: 30, backgroundColor: '#FAEDED', marginBottom: 20, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={AddMoreItem}
                >
                  <Text style={{ fontWeight: 'bold' }}>
                    + Add More Items To Your Order
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ borderBottomWidth: 3, borderBottomColor: COLORS.grey, marginBottom: 120 }}>


                {/* <View flexDirection='row' style={{ width: '70%', height: 35, alignItems: 'center', paddingBottom: 20, justifyContent: 'space-between', marginBottom: 10 }}>
                  <View style={{ paddingLeft: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>How Big Is Your Group</Text>
                  </View>
                  <Button />
                </View> */}
              </View> 

            </ScrollView>
            <View style={{
              borderTopWidth: 3,
              backgroundColor: '#F0F0F0',
              width: '100%',
              height: 120,
              position: 'absolute',
              bottom: 0,
              justifyContent: 'center',

            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                <Text > Item Total</Text>
                <Text>{`₹ ${TotalAmount(data)}`}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                <Text > Taxes and Charges </Text>
                <Text>{`₹ ${20}`}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                <Text style={{fontWeight:'800',}} > Grand Total </Text>
                <Text>{}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 25 }}> Pay Using </Text>
                  <TouchableOpacity>
                    <Icon name='sort-down' size={18} style={{ color: '#000000' }} />
                  </TouchableOpacity>

                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ width: 140, height: 45, backgroundColor: '#FCD866', borderWidth: 2, borderRadius: 5, borderColor: '#FFFF00', alignItems: 'center', justifyContent: 'center' }}
                  onPress={handlePayment}
                >
                  <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Make PayMent</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
      }
    </SafeAreaView>
  )
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

export default CartScreen;
