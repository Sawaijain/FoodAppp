/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome5'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import google from '../../assets/google.png';
import foodTable from '../../assets/foodTable.png';
import { SvgUri } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
// import Asset2 from '../../assets/Asset2.svg'
import { LoginStatus, SignIn } from '../../redux/action';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications

const SignInScreen = ({ navigation }) => {
  const { loginStatus } = useSelector(state => state.loginStatusReducer)
  const dispatch = useDispatch()

  console.log(loginStatus)


  const [eye, setEye] = useState('eye-slash');
  const [form, setForm] = useState({
    email: "",
    password: "",

  })
  const HandelClick = () => {
    console.log(form.email, form.password);
    const data = {
      email: form.email,
      password: form.password
    }
    dispatch(SignIn(data,navigation));
  }

  // setForm({...form ,email:"text"})

  return (
    <ScrollView style={{ backgroundColor: COLORS.white, flex: 1 }}
      keyboardShouldPersistTaps='handled'
    >

      <View

      >

        <View
          style={{ height: 200, backgroundColor: COLORS.white }}>
          <Image resizeMode='contain' source={foodTable} style={{ height: '100%', width: '100%' }} />
        </View>
        <View
          style={{ backgroundColor: COLORS.white, borderRadius: 10 }}>
          <View style={{ height: 50, justifyContent: 'center', paddingLeft: 20 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Log-In</Text>
          </View>
          <View style={{ paddingLeft: '10%', paddingRight: '10%' }}>
            <Text style={{ fontWeight: '700', marginTop: 10, fontSize: 16 }}>Email</Text>
            <View style={{ borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}>


              <TextInput
                style={{ width: '90%' }}
                underlineColorAndroid="transparent"
                placeholder=" Your Email Id"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={(email) => setForm({ ...form, email: email })}

              />

            </View>
            <Text style={{ fontWeight: '700', marginTop: 10, fontSize: 16 }}>Password</Text>
            <View style={{ borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={{ width: '90%' }}
                underlineColorAndroid="transparent"
                placeholder=" Paasword"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={(password) => setForm({ ...form, password: password })}
                secureTextEntry={eye === 'eye' ? false : true}
              />
              <Icon name={eye} size={10} onPress={() => eye === 'eye' ? setEye('eye-slash') : setEye('eye')} ></Icon>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
            >
              <Text style={{ color: COLORS.grey, paddingLeft: '60%', paddingTop: 10 }}>Forget Password ?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={.8}
              style={{ paddingVertical: 10, alignItems: 'center', marginVertical: 10 }}
              onPress={() => HandelClick()}
            >
              <View style={{  height: 45, width: 250, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: '#006400' }}>
                <Text style={{ color: COLORS.white, fontSize: 20 }}>LogIn</Text>
              </View>
            </TouchableOpacity>

            <View style={{ alignItems: 'center' }}>


              <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                <View style={{ width: 100, borderBottomWidth: 1, borderBottomColor: COLORS.grey, marginBottom: 7 }}></View>
                <View ><Text style={{ color: COLORS.grey }}> Or login with </Text></View>
                <View style={{ width: 100, borderBottomWidth: 1, borderBottomColor: COLORS.grey, marginBottom: 7 }}></View>
              </View>
            </View>
            <View
              style={{ height: 50, width: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
              <TouchableOpacity
                activeOpacity={0.8}>

                <Image source={google}
                  resizeMode='contain'
                  style={{ height: 40, width: 40 }} />
              </TouchableOpacity>

            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                <Text >Don't have an account?   </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('SignUp')}>
                  <Text style={{ color: COLORS.grey }}>Sign Up </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}


export default SignInScreen;