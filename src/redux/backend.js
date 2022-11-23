/*prettier/prettier */
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  FETCH_BANNERS,
  FETCH_HOTELS,
  USER_DETAILS,
  LOGIN_STATUS,
  MENU,
  LOADER_HOTEL_END,
  LOADER_HOTEL_START,
  ADD_FOOD_CART,
  CART_DATA,
  HOTEL_DETAIL
} from './action';
import { hotels, menu } from '../../dummy';
import { useSelector } from "react-redux";

export const LoadDatabase = () => {
  const currentUser = auth().currentUser;

  firestore().collection("MENUS").add({ menu: menu[8] })
    .then(data => {
      // const path = (`${data._documentPath._parts[0]}/${data._documentPath._parts[1]}`);
      hotels[8]["menus"] = (data._documentPath._parts[0] + '/' + data._documentPath._parts[1]);
      hotels[8]["userID"] = currentUser.uid;
      firestore().collection("HOTELS").add(hotels[8])
        .then(dat => {
          console.log(dat);
        }).catch(e => {
          console.log(e);
        });
    }).catch(err => {
      console.log(err);
    });
}

export const LoginStatus = async (dispatch) => {
  const currentUser = auth().currentUser;
  if (currentUser) {
    dispatch({
      type: USER_DETAILS,
      payload: currentUser
    });
    dispatch({
      type: LOGIN_STATUS,
      payload: true,
    })
  } else {
    dispatch({
      type: LOGIN_STATUS,
      payload: false,
    });
    dispatch({
      type: USER_DETAILS,
      payload: null
    });
  }
}

export const SignUp = ( data, navigation, dispatch ) => {
  console.log(data?.email);
  auth()
    .createUserWithEmailAndPassword(
      data?.email,
      data?.password,
    )
    .then((val) => {
      console.log('User account created & signed in!');
      console.log(val.user?._user?.uid);
      firestore().collection("USERS").doc(val.user?._user?.uid).set({
        email: data?.email,
        name: data?.name,
        lastSeen: firestore.FieldValue.serverTimestamp(),
      }).then(async () => {
        console.log("User added successfully!");
        dispatch({
          type: LOGIN_STATUS,
          payload: true,
        });
        navigation.navigate("Home");
      }).catch((error) => {
        console.log(error);
      });
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    });
};
export const SignIn = (data,navigation,dispatch) => {
  console.log(data?.email);
  auth()
    .signInWithEmailAndPassword(
      data?.email,
      data?.password,
    )
    .then((val) => {
      console.log('User signed in!');
      firestore().collection("USERS").doc(val.user?._user?.uid).update({
        lastSeen: firestore.FieldValue.serverTimestamp()
      }).then( () => {
        dispatch({
          type: LOGIN_STATUS,
          payload: true,
        });
        navigation.navigate("Home");
      }).catch(err => {
        console.log(err);
      })
      console.log(data);
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    });
};
export const GoogleSignIn = async () => {
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  console.log(idToken);
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  console.log(googleCredential);
  auth().signInWithCredential(googleCredential)(() => {
    console.log('User account created & signed in!');
    console.log(googleCredential);
  })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
}

export const FetchBanners = async (dispatch) => {
  try {
    firestore()
      .collection('BANNERS')
      .get()
      .then(querySnapshot => {
        // console.log('Total users: ', querySnapshot.size);    
        querySnapshot.forEach(documentSnapshot => {
          // console.log(documentSnapshot.data().banners);
          dispatch({
            type: FETCH_BANNERS,
            payload: documentSnapshot.data().banners,
          });
        });
      }).catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

export const FetchHotels = async (dispatch) => {
  var response = [];
  var index = 0;
  try {
    firestore()
      .collection('HOTELS')
      .get()
      .then(querySnapshot => {
        // console.log('Total users: ', querySnapshot.size);    
        querySnapshot.forEach(documentSnapshot => {
          // console.log(documentSnapshot.id);
          index++;
          documentSnapshot.data().id = documentSnapshot.id;
          response.push(documentSnapshot.data());
          if (index === querySnapshot.size) {
            dispatch({
              type: FETCH_HOTELS,
              payload: response,
            });
          }
        });
        index = 0;
      }).catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

export const FetchMenu = async (menuId, dispatch) => {

  try {
    function onResult(QuerySnapshot) {
      // console.log('Got Users collection result.');
      // console.log(QuerySnapshot.data());
      dispatch({
        type: LOADER_HOTEL_START,
      })
      dispatch({
        type: MENU,
        payload: QuerySnapshot.data().menu,
      });
      dispatch({
        type: LOADER_HOTEL_END,
      })
    }

    function onError(error) {
      console.error(error);
    }

    firestore().collection('MENUS').doc(menuId).onSnapshot(onResult, onError);
  } catch (error) {
    console.log(error);
  }
}

export const AddFoodToCart = (item, dispatch) => {
  try {
    // console.log(item)
    // const curreentUser = auth().currentUser;
    dispatch({
      type: ADD_FOOD_CART,
      payload: item,
    });

  } catch (error) {
    console.log(error?.message);
  }
}
export const AddHotelDetailCart = (data, dispatch) => {
  try {
    // console.log(data)
    // const curreentUser = auth().currentUser;
    dispatch({
      type: HOTEL_DETAIL,
      payload: data,
    });

  } catch (error) {
    console.log(error?.message);
  }
}

export const CartData = (dispatch) => {
  try {
    const currentUser = auth().currentUser;
    var response = [];
    var index = 0;
    firestore()
      .collection('USERS')
      .doc(currentUser.uid)
      .collection('MY_CART')
      .get()
      .then(querySnapshot => {
        // console.log('Total users: ', querySnapshot.size);    
        querySnapshot.forEach(documentSnapshot => {
          // console.log(documentSnapshot.id);
          index++;
          documentSnapshot.data().id = documentSnapshot.id;
          response.push(documentSnapshot.data());
          if (index === querySnapshot.size) {

          }
        });
        index = 0;
      }).catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}