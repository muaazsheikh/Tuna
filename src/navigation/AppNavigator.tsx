import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import OptionsScreen from '../screens/OptionsScreen';
import BuyTicketsScreen from '../screens/BuyTicketsScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PaymentFailedScreen from '../screens/PaymentFailedScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
import PrintTicketScreen from '../screens/PrintTicketScreen';
import { Linking } from 'react-native';

// Define deep link configuration
const linking = {
  prefixes: ['myapp://'], // Replace 'myapp' with your custom scheme
  config: {
    screens: {
      Splash: 'splash',
      Options: 'options',
      BuyTickets: 'tickets',
      Payment: 'payment',
      PaymentFailed: 'paymentFailed',
      PaymentSuccess: 'paymentSuccess',
      PrintTicket: 'printTicket',
    },
  },
};

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Options" component={OptionsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BuyTickets" component={BuyTicketsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PaymentFailed" component={PaymentFailedScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PrintTicket" component={PrintTicketScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
