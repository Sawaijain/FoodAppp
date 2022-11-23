/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useEffect} from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#282534', white: '#fff'};

const slides = [
  {
    id: '1',
    image: require('../../assets/onboardImage.png'),
    title: 'Best Digital Solution',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '2',
    image: require('../../assets/onboardImage.png'),
    title: 'Achieve Your Goals',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '3',
    image: require('../../assets/onboardImage.png'),
    title: 'Increase Your Value',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const Slide = ({item}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image
        source={item?.image}
        style={{height: '75%', width, resizeMode: 'contain'}}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnBoardScreen = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.white,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{marginBottom: 20}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{height: 50}}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.replace('Home')}>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: COLORS.white,
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={skip}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: COLORS.white,
                  }}>
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{width: 15}} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  useEffect(() => {
    const TempFunction = async () => {
      const isFirst = await AsyncStorage.getItem('isFirst');
      if (isFirst === null) {
        AsyncStorage.setItem('isFirst', 'Not First');
      }
    };
    TempFunction();
  }, []);
  

  const goToHome = () => {
    navigation.replace("Home");
  }
  const value =  AsyncStorage.getItem('isFirst');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
     {
      value === null ?
      <>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 0.75}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
      </>
      : goToHome()
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default OnBoardScreen;













// import React from 'react';
// import {Text, StyleSheet, View, Image} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import COLORS from '../../consts/colors';
// import {PrimaryButton} from '../components/Button';

// const OnBoardScreen = ({navigation}) => {
//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
//       <View style={{height: 400}}>
//         <Image
//           style={{
//             width: '100%',
//             resizeMode: 'contain',
//             top: -150,
//           }}
//           source={require('../../assets/onboardImage.png')}
//         />
//       </View>
//       <View style={style.textContainer}>
//         <View>
//           <Text style={{fontSize: 32, fontWeight: 'bold', textAlign: 'center'}}>
//             Delicious Food
//           </Text>
//           <Text
//             style={{
//               marginTop: 20,
//               fontSize: 18,
//               textAlign: 'center',
//               color: COLORS.grey,
//             }}>
//             We help you to find best and delicious food
//           </Text>
//         </View>
//         <View style={style.indicatorContainer}>
//           <View style={style.currentIndicator} />
//           <View style={style.indicator} />
//           <View style={style.indicator} />
//         </View>
//         <PrimaryButton
//           onPress={() => navigation.navigate('Home')}
//           title="Get Started"
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const style = StyleSheet.create({
//   textContainer: {
//     flex: 1,
//     paddingHorizontal: 50,
//     justifyContent: 'space-between',
//     paddingBottom: 40,
//   },
//   indicatorContainer: {
//     height: 50,
//     flex: 1,
//     justifyContent: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   currentIndicator: {
//     height: 12,
//     width: 30,
//     borderRadius: 10,
//     backgroundColor: COLORS.primary,
//     marginHorizontal: 5,
//   },
//   indicator: {
//     height: 12,
//     width: 12,
//     borderRadius: 6,
//     backgroundColor: COLORS.grey,
//     marginHorizontal: 5,
//   },
// });

// export default OnBoardScreen;


