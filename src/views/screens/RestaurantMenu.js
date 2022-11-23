/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconAnt from 'react-native-vector-icons/Entypo';
import COLORS from '../../consts/colors';
import {ScrollView} from 'react-native-gesture-handler';

const RestaurantMenu = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const Header = () => {
    return (
      <>
        <View style={styles.resname}>
          <Icon
            name="arrow-left"
            size={28}
            onPress={navigation.goBack}
            style={{paddingRight: 5}}
          />
          <Text style={{fontSize: 20}}>Dil se Restaurant</Text>
        </View>
        <View showsVerticalScrollIndicator={false}>
          <View >
            <View
              style={{
                flexDirection: 'row',
                paddingLeft: 40,
                paddingTop: 0,
                paddingBottom: 20,
              }}>
              <View
                style={{
                  backgroundColor: COLORS.green,
                  flexDirection: 'row',
                  marginRight: 5,
                }}>
                <Text style={{paddingRight: 4, paddingLeft: 4}}>4.0</Text>
                <Icon
                  name="star"
                  size={14}
                  style={{paddingTop: 3, paddingRight: 4}}
                />
              </View>
              <View style={{paddingRight: 40}}>
                <Text style={{fontSize: 8}}> 201</Text>
                <Text style={{fontSize: 8}}>Reviews</Text>
              </View>
              <View
                style={{
                  backgroundColor: COLORS.grey,
                  flexDirection: 'row',
                  marginRight: 5,
                }}>
                <Icon
                  name="clock"
                  size={14}
                  style={{paddingTop: 3, paddingLeft: 5, color: '#fff'}}
                />
                <Text style={{paddingLeft: 3, paddingRight: 5, color: '#fff'}}>
                  15 min
                </Text>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  const Card = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: 15,
          //   borderBottomColor:'#9B9B9B',
          //   borderWidth:1,
        }}>
        <View style={{width: '60%', flexWrap: 'nowrap'}}>
          <Text style={{paddingTop: 20, paddingLeft: 15, fontSize: 18}}>
            Panner Masala
          </Text>
          <Text style={{color: COLORS.grey, paddingTop: 5, paddingLeft: 15}}>
            ₹ 150
          </Text>
          <Text
            style={{
              color: COLORS.grey,
              paddingTop: 5,
              paddingLeft: 15,
              paddingBottom: 20,
              flex: 1,
              flexWrap: 'wrap',
            }}>
            3.5
          </Text>
          <View style={styles.editContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <IconAnt name="edit" size={18} />
              <Text style={{marginLeft: 5}}>Edit</Text>
            </View>
            <View style={styles.toggleSwitch}>
              <Switch
                trackColor={{false: '#767577', true: '#FF5B5B'}}
                thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text style={[styles.heading, {color: '#FF5B5B'}]}>
                {isEnabled ? 'In Stock' : 'Out of Stock'}
              </Text>
            </View>
          </View>
        </View>
        <View style={{paddingTop: 20}}>
          <ImageBackground
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8dixdVE25PH7AVusUvK79Maj-2eMVxxkUVg&usqp=CAU',
            }}
            style={{height: 100, width: 140, borderRadius: 5}}
            resizeMode="cover"></ImageBackground>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      {/* <View
        style={{
          marginTop: 5,
          //   flexDirection: 'row',
          paddingHorizontal: 10,
          //   paddingBottom: 10,
        }}>
        <View style={styles.inputContainer}>
          <Icon name="search" size={20} />
          <TextInput
            style={{flex: 1, fontSize: 18}}
            placeholder="Search by item name..."
          />
        </View>
      </View> */}
      {/* filter  */}
      <View style={styles.filterContainer}>
        <Text>Filter By :</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <Text style={styles.filterHeading}>In Stock (20) </Text>
          <TouchableOpacity
            onPress={()=>navigation.navigate('UploadMenu')}
          >
          <Text style={styles.filterHeading}>Menu Editor</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* menu */}
      <View style={styles.menuContainer}>
        <Text style={styles.filterHeading}>Main Course</Text>
        <View style={styles.toggleSwitch}>
          <Switch
            trackColor={{false: '#767577', true: '#FF5B5B'}}
            thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={[styles.heading, {color: '#FF5B5B'}]}>
            {isEnabled ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>
      </View>
      <ScrollView>
        <Card />
        <Card />
        <Card />
        <View style={{marginBottom: 40}}>
          <Card />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
  },
  resname: {
    paddingVertical: 2,
    flexDirection: 'row',
    // alignItems: 'center',
    marginHorizontal: 10,
  },
  inputContainer: {
    // flex: 1,
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
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
  filterContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    // borderBottomColor: '#999999',
    // borderBottomWidth: 1,
    paddingBottom: 5,
  },
  filterHeading: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    borderRadius: 7,
    borderColor: '#5E5E5E',
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  menuContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomColor: '#9B9B9B',
    // borderBottomWidth: 1,
    paddingBottom: 5,
  },
  toggleSwitch: {
    alignSelf: 'flex-start',
    justifyContent: 'space-around',
    flexDirection: 'row',
    // marginTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: '500',
  },
  editContainer: {
    marginHorizontal: 10,
    marginTop: -25,
    flexDirection: 'row',
  },
});

export default RestaurantMenu;
