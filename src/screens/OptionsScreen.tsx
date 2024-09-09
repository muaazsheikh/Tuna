import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { images } from '../constant';
import { COLORS, CONTEXT } from '../constant/theme'; 

type OptionsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Options'>;

type Props = {
  navigation: OptionsScreenNavigationProp;
};

const OptionsScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ImageBackground source={images.background_img} style={styles.container}>
      <Text style={styles.title}>{CONTEXT.readyToGetStarted}</Text>
      <Text style={styles.subtitle}>{CONTEXT.chooseOption}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('BuyTickets')} style={styles.button}>
        <Text style={styles.buttonText}>{CONTEXT.buyTickets}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    alignSelf: 'baseline',
    marginHorizontal: '10%',
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.white,
    marginTop: 10,
    alignSelf: 'baseline',
    marginHorizontal: '10%',
  },
  button: {
    marginTop: '12%',
    padding: 10,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 15,
    width: '80%',
    height: '12%',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: COLORS.darkBlue,
    fontWeight: '500',
    marginHorizontal: 20,
  },
});

export default OptionsScreen;
