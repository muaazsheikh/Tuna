import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 
import { COLORS, CONTEXT } from '../constant/theme';
import { images } from '../constant';


const PaymentFailedScreen: React.FC = ({ navigation }) => {
  
  return (
    <LinearGradient
    colors={['#e0f4ff', '#b3daff']} 
      style={styles.gradientContainer}
    >
      <View style={styles.container}>

        <Image source={images.failed} style={styles.cardIcon} /> 
        <Text style={styles.paymentTitle}>{CONTEXT.paymentFailed}</Text>
        <Text style={styles.paymentInstructions}>{CONTEXT.try}</Text>


        {/* Cancel Button */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate('Options')}
        >
          <Text style={styles.cancelButtonText}>{CONTEXT.cancel}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  paymentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.darkBlue,
    marginBottom: 20,
    marginTop:'30%'
  },
  paymentInstructions: {
    fontSize: 16,
    color: COLORS.darkBlue,
    marginBottom: 20,
  },
  paymentDetails: {
    width: '90%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    color: COLORS.darkBlue,
  },
  value: {
    fontSize: 14,
    color: COLORS.darkBlue,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  cancelButton: {
    width: '30%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'30%'
  },
  cancelButtonText: {
    fontSize: 18,
    color: COLORS.darkBlue,
  },
});

export default PaymentFailedScreen;
