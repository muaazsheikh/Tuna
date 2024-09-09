import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {images} from '../constant';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../constant/theme';

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

type Props = {
  navigation: SplashScreenNavigationProp;
};

const SplashScreen: React.FC<Props> = ({navigation}) => {
  return (
    <ImageBackground source={images.background_img} style={styles.container}>
      <FastImage
        source={images.tap}
        style={styles.tap}
        resizeMode={FastImage.resizeMode.contain}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Options')}>
        <Text style={styles.text}>Tap to Start</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#0B2545',
    paddingVertical: '40%',
  },
  title: {
    fontSize: 32,
    color: COLORS.white,
  },
  text: {
    fontSize: 22,
    color: COLORS.white,
    marginTop: 20,
  },
  tap: {width: 60, height: 80},
});

export default SplashScreen;
