/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
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

import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import categories from '../../consts/categories';
import foods from '../../consts/foods';
import AboutApp from '../../consts/AboutApp'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanners, fetchHotels, LoginStatus, LOGIN_STATUS } from '../../redux/action';
import auth from '@react-native-firebase/auth';
import * as api from '../../redux/backend';
const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const HomeScreen = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LoginStatus());
    // api.LoadDatabase();
    dispatch(fetchBanners());
    dispatch(fetchHotels());
    if (loginStatus) {
    }
  }, [dispatch, loginStatus]);

  const { banners } = useSelector(state => state.fetchBannerReducer);
  const { hotels } = useSelector(state => state.fetchHotelReducer);
  const { loginStatus, userDetails } = useSelector(state => state.loginStatusReducer);

  // console.log(loginStatus);


  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        dispatch(LoginStatus());
      });
  }

  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex == index
                    ? COLORS.primary
                    : COLORS.secondary,
                ...style.categoryBtn,
              }}>
              <View style={style.categoryBtnImgCon}>
                <Image
                  source={category.image}
                  style={{ height: 35, width: 35, resizeMode: 'cover' }}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.white
                      : COLORS.primary,
                }}>
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const Card1 = (() => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      // contentContainerStyle={style.AboutAppContainer}
      >
        {banners?.map((item, index) => (
          <View
            key={index} style={{ height: 150, width: 300, backgroundColor: COLORS.primary, marginLeft: 10 }}>
            {/* <Text>
       {AboutApp.name}
     </Text> */}
            <Image
              source={{ uri: item }}
              style={{ height: 150, width: 300 }}
              resizeMode='cover'
            />
          </View>
        ))}
      </ScrollView>
    )
  })




  const Card = ({ food }) => {
    console.log(food);
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('DetailsScreen', food)}>
        <View style={style.card}>
          <View style={{ alignItems: 'center', }}>
            <Image source={{ uri: food.image }} style={{ height: 110, width: cardWidth }}
              resizeMode='cover' />
          </View>
          <View style={{ marginHorizontal: 2 }}>
            <Text style={{ fontSize: 16, fontWeight: '500',textAlign:'center' }}>{food.name}</Text>
            {/* <Text style={{ fontSize: 14, color: COLORS.grey, marginTop: 2 }}>
              {food.veg}
            </Text> */}
          </View>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <Icon name="star" size={14} color="#FCD866" />
            <Text style={{ fontSize: 14, fontWeight: '500' }}>{food.rating}  </Text>
            <Text style={{ fontSize: 14, fontWeight: '500' }}>{food.timeToPrepare}-{food.timeToPrepare+5}  min</Text>
            </View>
        </View>
      </TouchableHighlight>
    );
  };
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}
    >
      <ScrollView
        keyboardShouldPersistTaps='handled'
        stickyHeaderIndices={[0]}
      >

        <View style={{ backgroundColor: "#fff" }}>
          <View style={style.header} >
            <View>

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Setting')}
                >


                  <Image
                    source={require('../../assets/person.png')}
                    style={{ height: 50, width: 50, borderRadius: 25 }}
                  />
                </TouchableOpacity>
              </View>
              <Text style={{ marginTop: 5, fontSize: 15, color: COLORS.grey }}>
                Hi {userDetails?.name}
              </Text>

            </View>

            {
              loginStatus ?
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={handleLogout}
                >
                  <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <Icon name="logout" size={28} color={COLORS.primary} />
                    <Text style={{ marginRight: 60 }} >
                      LOGOUT
                    </Text>

                  </View>
                </TouchableOpacity> :
                <View>


                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('SignIn')}
                  >
                    <Text style={{ marginTop: 20, marginRight: 60 }} >



                      <Icon name="location-pin" size={28} color={COLORS.primary} />

                      SVNIT SURAT

                    </Text>
                  </TouchableOpacity>

                </View>
            }




          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingBottom: 20,
            }}>
            <View style={style.inputContainer}>
              <Icon name="search" size={28} />
              <TextInput
                style={{ flex: 1, fontSize: 18 }}
                placeholder="Search for Restaurent"
              />
            </View>
            <View style={style.sortBtn}>
              <Icon name="qr-code-scanner" size={28} color={COLORS.white} />
            </View>
          </View>
        </View>
        <ScrollView>


          {/* <View>
            <ListCategories />
          </View> */}
          <View>
            <Card1 />
          </View>

          {/* <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={foods}
            renderItem={({ item }) => <Card food={item} />}
          /> */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {
              hotels?.map((item, index) => (
                <Card food={item} key={index} />
              ))
            }
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 40,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },

  categoryBtnImgCon: {
    height: 32,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 180,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
    overflow: 'hidden'
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
