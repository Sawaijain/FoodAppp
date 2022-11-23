/* eslint-disable prettier/prettier */
import {View, Text, Switch, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const RestaurantPartner = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [current, setcurrent] = useState('received');
  const Card = () => {
    return (
      <View style={styles.card}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 16, color: '#000'}}>Anshul Rathore </Text>
          <Text style={{fontSize: 16, color: '#000'}}>| 4402</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 12}}>6:02 PM </Text>
          <Text style={{fontSize: 12}}>| 15/03/2022</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 20,
            alignItems: 'center',
          }}>
          {/* <Image /> */}
          <Text style={styles.orderHeading}>Butter Dal Tadka x 1 (full)</Text>
          <Text style={styles.orderHeading}>₹120 .00</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 20,
            alignItems: 'center',
          }}>
          {/* <Image /> */}
          <Text style={styles.orderHeading}>Butter roti x 2</Text>
          <Text style={styles.orderHeading}>₹120 .00</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 20,
            alignItems: 'center',
            borderTopWidth: 1,
            borderTopColor: '#E2E2E2',
          }}>
          {/* <Image /> */}
          <Text
            style={[styles.orderHeading, {fontSize: 15, fontWeight: '500'}]}>
            Total
          </Text>
          <Text
            style={[styles.orderHeading, {fontSize: 15, fontWeight: '500'}]}>
            ₹120 .00
          </Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={[styles.heading, {color: '#fff'}]}>Received</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.toggleSwitch}>
        <Switch
          trackColor={{false: '#767577', true: '#FF5B5B'}}
          thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={[styles.heading, {color: '#FF5B5B'}]}>
          {isEnabled ? 'Online' : 'Offline'}
        </Text>
      </View>
      <View style={styles.headingContainer}>
        <Text style={[styles.heading, {fontSize: 18}]}>Accepting Orders</Text>
      </View>
      <View style={styles.categoryContainer}>
        <TouchableOpacity 
          onPress={()=>setcurrent('received')}
        >
        <Text style={[styles.categoryHeading,{backgroundColor:current === 'received' ? '#FF5B5B' : null}]}>Received (5) </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>setcurrent('served')}
        >
        <Text style={[styles.categoryHeading,{backgroundColor:current === 'served' ? '#FF5B5B' : null}]}>Served (2)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>setcurrent('cancelled')}
        >
        <Text style={[styles.categoryHeading,{backgroundColor:current === 'cancelled' ? '#FF5B5B' : null}]}>Cancelled (3)</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card />
        <Card />
        <Card />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  toggleSwitch: {
    alignSelf: 'flex-start',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: '500',
  },
  headingContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  categoryHeading: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    borderRadius: 7,
    borderColor: '#5E5E5E',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
  },
  orderHeading: {
    fontSize: 14,
    color: '#000',
    fontWeight: '400',
  },
  button: {
    backgroundColor: '#FF5B5B',
    borderRadius: 10,
    paddingVertical: 7,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 25,
  },
});

export default RestaurantPartner;
